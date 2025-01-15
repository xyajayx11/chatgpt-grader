document.getElementById("gradeButton").addEventListener("click", function () {
    const essay = document.getElementById("essayInput").value.trim();

    const scores = gradeEssay(essay);

    console.log("Calculated scores:", scores); // Log to check the values

    // Display the calculated scores
    document.getElementById("pfoScore").textContent = scores.purposeFocusOrganization || "-";
    document.getElementById("eeScore").textContent = scores.evidenceElaboration || "-";
    document.getElementById("cScore").textContent = scores.conventions || "-";
});

// Function to grade the essay
function gradeEssay(essay) {
    const scores = {
        purposeFocusOrganization: 0, // Out of 4
        evidenceElaboration: 0,     // Out of 4
        conventions: 0              // Out of 2
    };

    // --- PFO: Purpose, Focus, and Organization ---
    const thesisPattern = /(\bthesis\b|\bmain argument\b|\bcentral claim\b)/i; // Match common thesis words
    const bodyPattern = /\b(body|paragraph)\b/i; // Basic body structure check
    const introConclusion = /\b(introduction|conclusion)\b/i; // Simple intro/conclusion check
    const transitions = /\b(therefore|however|in conclusion|for example|first|next|finally)\b/i; // Transitional phrases

    const hasThesis = thesisPattern.test(essay);
    const hasIntro = introConclusion.test(essay);
    const hasBody = bodyPattern.test(essay);
    const hasTransitions = transitions.test(essay);
    const paragraphCount = essay.split("\n").length; // Estimate number of paragraphs

    // Grade PFO based on rubric
    if (hasThesis && hasIntro && hasBody && hasTransitions && paragraphCount >= 3) {
        scores.purposeFocusOrganization = 4;
    } else if (hasThesis && hasIntro && hasBody) {
        scores.purposeFocusOrganization = 3;
    } else if (hasThesis || hasIntro) {
        scores.purposeFocusOrganization = 2;
    } else {
        scores.purposeFocusOrganization = 1;
    }

    // --- EE: Evidence and Elaboration ---
    const evidencePattern = /\b(example|evidence|fact|quote|due to)\b/i; // Matches evidence-related words
    const elaborationPattern = /\b(explains|shows|demonstrates|because|therefore)\b/i; // Checks for elaboration phrases
    const relatedEvidence = essay.split(".").filter(sentence => evidencePattern.test(sentence) && elaborationPattern.test(sentence)).length;

    // Grade EE based on rubric
    if (relatedEvidence >= 3) {
        scores.evidenceElaboration = 4;
    } else if (relatedEvidence >= 2) {
        scores.evidenceElaboration = 3;
    } else if (relatedEvidence === 1) {
        scores.evidenceElaboration = 2;
    } else {
        scores.evidenceElaboration = 1;
    }

    // --- Conventions ---
    const grammarErrors = countGrammarErrors(essay);
    const spellingErrors = countSpellingErrors(essay);

    // Grade Conventions based on errors
    if (grammarErrors + spellingErrors <= 2) {
        scores.conventions = 2;
    } else if (grammarErrors + spellingErrors <= 4) {
        scores.conventions = 1;
    } else {
        scores.conventions = 0;
    }

    return scores;
}

// Helper function to count grammar errors (basic)
function countGrammarErrors(text) {
    const sentenceStructure = /\b([A-Za-z]+,)+\b/; // Checks for run-on sentences
    const repeatedWords = /(\b\w+\b)\s+\1/; // Checks for repeated words

    const errors = (text.match(sentenceStructure) || []).length + (text.match(repeatedWords) || []).length;
    return errors;
}

// Helper function to count spelling errors
function countSpellingErrors(text) {
    const commonMisspellings = ["their", "there", "they're", "your", "you're"];
    const wordList = text.split(" ");
    const errors = wordList.filter(word => commonMisspellings.includes(word.toLowerCase())).length;
    return errors;
}
