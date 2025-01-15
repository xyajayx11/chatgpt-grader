document.getElementById("gradeButton").addEventListener("click", function () {
    // Get the essay input from the textarea
    const essay = document.getElementById("essayInput").value.trim();

    // Calculate the scores using the gradeEssay function
    const scores = gradeEssay(essay);

    // Log the scores to check if they are calculated
    console.log("Calculated scores:", scores);

    // Update the results section in the HTML
    document.getElementById("pfoScore").textContent = scores.purposeFocusOrganization || "-";
    document.getElementById("eeScore").textContent = scores.evidenceElaboration || "-";
    document.getElementById("cScore").textContent = scores.conventions || "-";
});

// Function to calculate scores based on the rubric
function gradeEssay(essay) {
    const scores = {
        purposeFocusOrganization: 0, // Out of 4
        evidenceElaboration: 0,     // Out of 4
        conventions: 0              // Out of 2
    };

    // --- PFO: Purpose, Focus, and Organization ---
    const hasThesis = essay.includes("thesis") || essay.split(".").some(sentence => sentence.length > 50); // Basic check for a thesis statement or long sentences
    const isOrganized = essay.includes("introduction") && essay.includes("conclusion") && essay.includes("transition");
    const clearStructure = essay.split(".").length >= 5; // At least 5 sentences for logical structure

    if (hasThesis && isOrganized && clearStructure) {
        scores.purposeFocusOrganization = 4; // Excellent structure and focus
    } else if (hasThesis && isOrganized) {
        scores.purposeFocusOrganization = 3; // Good, but missing some elements
    } else if (hasThesis || clearStructure) {
        scores.purposeFocusOrganization = 2; // Adequate, but with flaws in structure
    } else {
        scores.purposeFocusOrganization = 1; // Minimal or unclear thesis, poor structure
    }

    // --- EE: Evidence and Elaboration ---
    const hasEvidence = essay.includes("example") || essay.includes("evidence") || essay.includes("quote");
    const hasElaboration = essay.includes("explains") || essay.includes("details");
    const usesTransitions = essay.includes("for example") || essay.includes("because");

    if (hasEvidence && hasElaboration && usesTransitions) {
        scores.evidenceElaboration = 4; // Strong, detailed evidence and clear elaboration
    } else if (hasEvidence && hasElaboration) {
        scores.evidenceElaboration = 3; // Adequate evidence and some elaboration
    } else if (hasEvidence || hasElaboration) {
        scores.evidenceElaboration = 2; // Minimal evidence, vague elaboration
    } else {
        scores.evidenceElaboration = 1; // No evidence or elaboration
    }

    // --- C: Conventions ---
    const spellingErrors = (essay.match(/\b\w+\b/g) || []).length - essay.length; // Check for spelling errors
    const grammarErrors = (essay.match(/\bthe\b/g) || []).length; // Count occurrences of grammar errors

    if (spellingErrors + grammarErrors <= 2) {
        scores.conventions = 2; // Few errors, doesn't hinder readability
    } else if (spellingErrors + grammarErrors <= 4) {
        scores.conventions = 1; // Some errors, minor impact on readability
    } else {
        scores.conventions = 0; // Frequent and severe errors that obscure meaning
    }

    return scores;
}
