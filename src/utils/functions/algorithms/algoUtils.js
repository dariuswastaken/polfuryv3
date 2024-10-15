export const calculateActivityScore = async (
  pontaj,
  minPontaj,
  { gradeIncrease, minIncrease, gradeDecrease }
) => {
  let rangePontaj = [0];
  let min = 0;
  let grade = 0;

  for (let i = 0; i < 21; i++) {
    min += minIncrease;
    grade += gradeIncrease;
    rangePontaj.push(min);
    let isInRange = pontaj >= rangePontaj[i] && pontaj <= rangePontaj[i + 1];
    if (isInRange) {
      break;
    }
  }

  if (pontaj < minPontaj) {
    grade -= gradeDecrease;
  }

  grade = parseFloat(grade.toFixed(2));

  return grade.toFixed(2);
};

export const calculateReportScore = async (
  reports,
  minReports,
  { gradeIncrease, reportIncrease, gradeDecrease }
) => {
  let rangeReports = [0];
  let rapoarte = 0;
  let grade = 0;

  for (let i = 0; i < 21; i++) {
    rapoarte += reportIncrease;
    grade += gradeIncrease;
    rangeReports.push(rapoarte);
    let isInRange = reports >= rangeReports[i] && reports < rangeReports[i + 1];
    if (isInRange) {
      break;
    }
  }

  if (reports < minReports) {
    grade -= gradeDecrease;
  }

  grade = parseFloat(grade.toFixed(2));

  return grade.toFixed(2);
};

export const calculateFineScore = async (
  amenzi,
  minFines,
  { gradeIncrease, fineIncrease, gradeDecrease }
) => {
  let rangeFines = [0];
  let fines = 0;
  let grade = 0;

  for (let i = 0; i < 21; i++) {
    fines += fineIncrease;
    grade += gradeIncrease;
    rangeFines.push(fines);
    let isInRange = amenzi >= rangeFines[i] && amenzi < rangeFines[i + 1];
    if (isInRange) {
      break;
    }
  }

  if (fines < minFines) {
    grade -= gradeDecrease;
  }

  grade = parseFloat(grade.toFixed(2));

  return grade.toFixed(2);
};

export const calculateCallsScore = async (
  calls,
  minCalls,
  { gradeIncrease, callIncrease, gradeDecrease }
) => {
  let rangeCalls = [0];
  let apeluri = 0;
  let grade = 0;

  for (let i = 0; i < 21; i++) {
    apeluri += callIncrease;
    grade += gradeIncrease;
    rangeCalls.push(apeluri);
    let isInRange = calls >= rangeCalls[i] && calls < rangeCalls[i + 1];
    if (isInRange) {
      break;
    }
  }

  if (calls < minCalls) {
    grade -= gradeDecrease;
  }

  grade = parseFloat(grade.toFixed(2));

  return grade.toFixed(2);
};

export const calculateActionActivityScore = async (
  actionActivity,
  minActionActivity,
  { gradeIncrease, actionActivityIncrease, gradeDecrease }
) => {
  let rangeActionActivity = [0];
  let actiuni = 0;
  let grade = 0;

  for (let i = 0; i < 21; i++) {
    actiuni += actionActivityIncrease;
    grade += gradeIncrease;
    rangeActionActivity.push(actiuni);
    let isInRange =
      actionActivity >= rangeActionActivity[i] &&
      actionActivity < rangeActionActivity[i + 1];
    if (isInRange) {
      break;
    }
  }

  if (actionActivity < minActionActivity) {
    grade -= gradeDecrease;
  }

  grade = parseFloat(grade.toFixed(2));

  return grade.toFixed(2);
};

export const gradeAdjust = async (
  rank,
  grade,
  { reports, fines, calls, actionActivity }
) => {
  let adjustedGrade = grade;
  if (rank === 'Agent Sef Principal') {
    if (reports < 1 && grade >= 9) {
      adjustedGrade -= 1;
    }
    if (fines < 5 && grade >= 9) {
      adjustedGrade -= 1;
    }
    if (calls < 1 && grade >= 9) {
      grade -= 0.25;
    }
    if (actionActivity < 1 && grade >= 9) {
      adjustedGrade -= 1.5;
    }
  } else if (rank === 'Agent Principal') {
    if (reports < 2 && grade >= 9) {
      adjustedGrade -= 1;
    }
    if (fines < 5 && grade >= 9) {
      adjustedGrade -= 1.5;
    }
    if (calls < 1 && grade >= 9) {
      grade -= 0.25;
    }
    if (actionActivity < 1 && grade >= 9) {
      adjustedGrade -= 1;
    }
  } else if (rank === 'Agent') {
    if (reports < 3 && grade >= 9) {
      adjustedGrade -= 2;
    }
    if (fines < 5 && grade >= 9) {
      adjustedGrade -= 1.5;
    }
    if (calls < 1 && grade >= 9) {
      grade -= 0.25;
    }
    if (actionActivity < 1 && grade >= 9) {
      adjustedGrade -= 1;
    }
  } else if (rank === 'Cadet') {
    if (reports < 4 && grade >= 9) {
      adjustedGrade -= 2;
    }
    if (fines < 4 && grade >= 9) {
      adjustedGrade -= 1.5;
    }
    if (calls < 1 && grade >= 9) {
      grade -= 0.25;
    }
    if (actionActivity < 1 && grade >= 9) {
      adjustedGrade -= 1;
    }
  }
  return adjustedGrade;
};
