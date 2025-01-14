document.getElementById("gradeButton").addEventListener("click", function () {
    const essay = document.getElementById("essayInput").value;
    const scores = gradeEssay(essay);

    document.getElementById("pfoScore").textContent = scores.pfo;
    document.getElementById("eeScore").textContent = scores.ee;
    document.getElementById("cScore").textContent = scores.c;
});

function gradeEssay(essay) {
    // Placeholder scoring logic. Replace with AI/ML integration for advanced grading.
    let pfo = 0;
    let ee = 0;
    let c = 0;

    // Basic criteria for grading
    if (essay.length > 100) pfo = Math.min(4, Math.floor(essay.length / 100)); // Simplified length check for PFO
    if (essay.split(".").length > 3) ee = Math.min(4, essay.split(".").length / 3); // Simplified evidence count for EE
    if (/^[A-Za-z0-9\s.,'!?]*$/.test(essay)) c = 2; // Basic conventions check

    return { pfo, ee, c };
}
