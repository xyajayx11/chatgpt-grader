function gradeEssay(essay) {
    const scores = {
        purposeFocusOrganization: 0,
        evidenceElaboration: 0,
        conventions: 0
    };

    const essayLower = essay.toLowerCase();

    // Analyze Purpose, Focus, and Organization (PFO)
    if (/clear\s+theme|well[-\s]*organized/.test(essayLower)) {
        scores.purposeFocusOrganization = 4;
    } else if (/basic\s+focus|attempts\s+organization/.test(essayLower)) {
        scores.purposeFocusOrganization = 3;
    } else if (/weak\s+organization|unclear\s+theme/.test(essayLower)) {
        scores.purposeFocusOrganization = 2;
    } else if (/lacks\s+organization|little\s+focus/.test(essayLower)) {
        scores.purposeFocusOrganization = 1;
    }

    // Analyze Evidence and Elaboration (EE)
    if (/strong\s+evidence|thorough\s+elaboration/.test(essayLower)) {
        scores.evidenceElaboration = 4;
    } else if (/some\s+evidence|basic\s+elaboration/.test(essayLower)) {
        scores.evidenceElaboration = 3;
    } else if (/limited\s+evidence|weak\s+elaboration/.test(essayLower)) {
        scores.evidenceElaboration = 2;
    } else if (/minimal\s+evidence|little\s+elaboration/.test(essayLower)) {
        scores.evidenceElaboration = 1;
    }

    // Analyze Conventions (C)
    const spellingErrors = (essay.match(/spelling\s+error/gi) || []).length;
    const grammarErrors = (essay.match(/grammar\s+error/gi) || []).length;

    if (spellingErrors + grammarErrors <= 2) {
        scores.conventions = 2;
    } else if (spellingErrors + grammarErrors <= 4) {
        scores.conventions = 1;
    }

    return scores;
}
