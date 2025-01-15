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

// Function to calculate scores based on OST rubric
function gradeEssay(essay) {
    const scores = {
        purposeFocusOrganization: 0, // Out of 4
        evidenceElaboration: 0,     // Out of 4
        conventions: 0              // Out of 2
    };

    // Analyze Purpose, Focus, and Organization (PFO)
    // Check if the essay has an introduction, body, and conclusion
    if (essay.includes("introduction") && essay.includes("conclusion") && essay.split(".").length > 5) {
        scores.purposeFocusOrganization = 4; // Well-organized with clear focus
    } else if (essay.includes("introduction") && essay.split(".").length > 3) {
        scores.purposeFocusOrganization = 3; // Clear organization but could improve
    } else if (essay.includes("focus") || essay.split(".").length > 1) {
        scores.purposeFocusOrganization = 2; // Weak organization or unclear theme
    } else {
        scores.purposeFocusOrganization = 1; // Very little structure or organization
    }

    // Analyze Evidence and Elaboration (EE)
    // Check for use of examples and elaboration
    if (essay.includes("example") && essay.includes("detailed")) {
        scores.evidenceElaboration = 4; // Strong evidence and detailed elaboration
    } else if (essay.includes("example") || essay.includes("explains")) {
        scores.evidenceElaboration = 3; // Some evidence with basic elaboration
    } else if (essay.includes("little evidence") || essay.includes("brief explanation")) {
        scores.evidenceElaboration = 2; // Limited evidence with weak elaboration
    } else {
        scores.evidenceElaboration = 1; // Minimal or no evidence provided
    }

    // Analyze Conventions (C)
    // Check for grammar and spelling (basic error count)
    const spellingErrors = (essay.match(/\b\w+\b/g) || []).length - essay.length; // Check for spelling errors
    const grammarErrors = (essay.match(/grammar/g) || []).length; // Count occurrences of grammar errors

    if (spellingErrors + grammarErrors <= 2) {
        scores.conventions = 2; // Few to no errors
    } else if (spellingErrors + grammarErrors <= 4) {
        scores.conventions = 1; // Some errors present
    }

    // Return calculated scores
    return scores;
}
