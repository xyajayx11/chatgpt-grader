document.getElementById("gradeButton").addEventListener("click", function () {
    const essay = document.getElementById("essayInput").value.trim();

    if (!essay) {
        alert("Please enter an essay to grade!");
        return;
    }

    const scores = gradeEssay(essay);

    document.getElementById("pfoScore").textContent = scores.purposeFocusOrganization || "-";
    document.getElementById("eeScore").textContent = scores.evidenceElaboration || "-";
    document.getElementById("cScore").textContent = scores.conventions || "-";
});

function gradeEssay(essay) {
    const scores = {
        purposeFocusOrganization: "-",
        evidenceElaboration: "-",
        conventions: "-"
    };

    if (essay.includes("clear theme") && essay.includes("well-organized")) {
        scores.purposeFocusOrganization = 4;
    } else if (essay.includes("attempts organization") || essay.includes("basic focus")) {
        scores.purposeFocusOrganization = 3;
    } else if (essay.includes("unclear theme") || essay.includes("weak organization")) {
        scores.purposeFocusOrganization = 2;
    } else if (essay.includes("little focus") || essay.includes("lacks organization")) {
        scores.purposeFocusOrganization = 1;
    }

    if (essay.includes("strong evidence") && essay.includes("thorough elaboration")) {
        scores.evidenceElaboration = 4;
    } else if (essay.includes("some evidence") || essay.includes("basic elaboration")) {
        scores.evidenceElaboration = 3;
    } else if (essay.includes("limited evidence") || essay.includes("weak elaboration")) {
        scores.evidenceElaboration = 2;
    } else if (essay.includes("minimal evidence") || essay.includes("little elaboration")) {
        scores.evidenceElaboration = 1;
    }

    const spellingErrors = (essay.match(/spelling\s+error/gi) || []).length;
    const grammarErrors = (essay.match(/grammar\s+error/gi) || []).length;

    if (spellingErrors + grammarErrors <= 2) {
        scores.conventions = 2;
    } else if (spellingErrors + grammarErrors <= 4) {
        scores.conventions = 1;
    }

    return scores;
}
