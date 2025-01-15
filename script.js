document.getElementById("gradeButton").addEventListener("click", function () {
    const essay = document.getElementById("essayInput").value;
    const scores = gradeEssay(essay);

    document.getElementById("pfoScore").textContent = scores.pfo;
    document.getElementById("eeScore").textContent = scores.ee;
    document.getElementById("cScore").textContent = scores.c;
});

// Function to calculate scores based on OST rubric
function gradeEssay(essay) {
    const scores = {
        purposeFocusOrganization: 0, // Out of 4
        evidenceElaboration: 0,     // Out of 4
        conventions: 0              // Out of 2
    };

    // Analyze Purpose, Focus, and Organization (PFO)
    if (essay.includes("clear theme") && essay.includes("well-organized")) {
        scores.purposeFocusOrganization = 4;
    } else if (essay.includes("attempts organization") || essay.includes("basic focus")) {
        scores.purposeFocusOrganization = 3;
    } else if (essay.includes("unclear theme") || essay.includes("weak organization")) {
        scores.purposeFocusOrganization = 2;
    } else if (essay.includes("little focus") || essay.includes("lacks organization")) {
        scores.purposeFocusOrganization = 1;
    } else {
        scores.purposeFocusOrganization = 0;
    }

    // Analyze Evidence and Elaboration (EE)
    if (essay.includes("strong evidence") && essay.includes("thorough elaboration")) {
        scores.evidenceElaboration = 4;
    } else if (essay.includes("some evidence") || essay.includes("basic elaboration")) {
        scores.evidenceElaboration = 3;
    } else if (essay.includes("limited evidence") || essay.includes("weak elaboration")) {
        scores.evidenceElaboration = 2;
    } else if (essay.includes("minimal evidence") || essay.includes("little elaboration")) {
        scores.evidenceElaboration = 1;
    } else {
        scores.evidenceElaboration = 0;
    }

    // Analyze Conventions (C)
    const spellingErrors = (essay.match(/spelling error/g) || []).length;
    const grammarErrors = (essay.match(/grammar error/g) || []).length;

    if (spellingErrors + grammarErrors <= 2) {
        scores.conventions = 2;
    } else if (spellingErrors + grammarErrors <= 4) {
        scores.conventions = 1;
    } else {
        scores.conventions = 0;
    }

    // Return calculated scores
    return scores;
}

// Example usage
const essay = `
    This essay includes a clear theme and is well-organized.
    It provides strong evidence and thorough elaboration.
    There are minor spelling error and grammar error issues.
`;

const results = gradeEssay(essay);

// Display scores
console.log("Purpose, Focus, Organization: ", results.purposeFocusOrganization, "/ 4");
console.log("Evidence and Elaboration: ", results.evidenceElaboration, "/ 4");
console.log("Conventions: ", results.conventions, "/ 2");
