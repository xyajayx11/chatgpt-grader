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

    // PFO: Purpose, Focus, and Organization
    if (essay.includes("thesis") && essay.split(".").length > 5 && essay.includes("introduction") && essay.includes("conclusion") && essay.includes("transitions")) {
        scores.purposeFocusOrganization = 4; // Excellent organization, focused on task
    } else if (essay.includes("thesis") && essay.split(".").length > 3 && (essay.includes("introduction") || essay.includes("conclusion"))) {
        scores.purposeFocusOrganization = 3; // Good organization, some minor issues
    } else if (essay.includes("thesis") || essay.split(".").length > 2) {
        scores.purposeFocusOrganization = 2; // Some focus and structure, but lacking clarity
    } else {
        scores.purposeFocusOrganization = 1; // Minimal structure, unclear thesis
    }

    // EE: Evidence and Elaboration
    if (essay.includes("example") && essay.includes("evidence") && essay.includes("detailed") && essay.includes("quotations")) {
        scores.evidenceElaboration = 4; // Strong evidence with elaboration and examples
    } else if (essay.includes("example") && essay.includes("evidence") && essay.split(".").length > 5) {
        scores.evidenceElaboration = 3; // Adequate evidence, some elaboration
    } else if (essay.includes("evidence") || essay.includes("details")) {
        scores.evidenceElaboration = 2; // Minimal evidence and general elaboration
    } else {
        scores.evidenceElaboration = 1; // Very little or no evidence or elaboration
    }

    // C: Conventions
    const spellingErrors = (essay.match(/\b\w+\b/g) || []).length - essay.length; // Check for spelling errors
    const grammarErrors = (essay.match(/grammar/g) || []).length; // Count occurrences of grammar errors

    if (spellingErrors + grammarErrors <= 2) {
        scores.conventions = 2; // Few errors, doesn't hinder readability
    } else if (spellingErrors + grammarErrors <= 4) {
        scores.conventions = 1; // Some errors, minor impact on readability
    } else {
        scores.conventions = 0; // Frequent and severe errors that obscure meaning
    }

    return scores;
}
