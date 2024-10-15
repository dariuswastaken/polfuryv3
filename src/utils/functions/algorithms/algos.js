import * as algoUtils from './algoUtils.js';

export const gradeAlgorithm = async (
  rank,
  { activity, reports, fines, calls, actions, leaveDays }
) => {
  let grade = 0;
  switch (rank) {
    case 'Cadet':
      grade += await algoUtils.calculateActivityScore(activity, 900, {
        gradeIncrease: 0.75,
        minIncrease: 100,
        gradeDecrease: 3
      });
      grade += await algoUtils.calculateReportScore(reports, 7, {
        gradeIncrease: 0.375,
        reportIncrease: 2,
        gradeDecrease: 1.5
      });
      grade += await algoUtils.calculateFineScore(fines, 5, {
        gradeIncrease: 0.15,
        fineIncrease: 2,
        gradeDecrease: 0.75
      });
      grade += await algoUtils.calculateCallsScore(calls, 4, {
        gradeIncrease: 0.075,
        callIncrease: 2,
        gradeDecrease: 0.25
      });
      grade += await algoUtils.calculateActionActivityScore(actions, 3, {
        gradeIncrease: 0.15,
        actionIncrease: 1,
        gradeDecrease: 0.5
      });
      break;
    case 'Agent':
      grade += await algoUtils.calculateActivityScore(activity, 900, {
        gradeIncrease: 0.9,
        minIncrease: 100,
        gradeDecrease: 3
      });
      grade += await algoUtils.calculateReportScore(reports, 4, {
        gradeIncrease: 0.225,
        reportIncrease: 2,
        gradeDecrease: 1.5
      });
      grade += await algoUtils.calculateFineScore(fines, 7, {
        gradeIncrease: 0.15,
        fineIncrease: 2,
        gradeDecrease: 0.75
      });
      grade += await algoUtils.calculateCallsScore(calls, 5, {
        gradeIncrease: 0.075,
        callIncrease: 2,
        gradeDecrease: 0.25
      });
      grade += await algoUtils.calculateActionActivityScore(actions, 2, {
        gradeIncrease: 0.15,
        actionIncrease: 1,
        gradeDecrease: 0.5
      });
      break;
    case 'Agent Principal':
      grade += await algoUtils.calculateActivityScore(activity, 840, {
        gradeIncrease: 1.05,
        minIncrease: 100,
        gradeDecrease: 3
      });
      grade += await algoUtils.calculateReportScore(reports, 2, {
        gradeIncrease: 0.075,
        reportIncrease: 2,
        gradeDecrease: 1.5
      });
      grade += await algoUtils.calculateFineScore(fines, 6, {
        gradeIncrease: 0.15,
        fineIncrease: 2,
        gradeDecrease: 0.75
      });
      grade += await algoUtils.calculateCallsScore(calls, 3, {
        gradeIncrease: 0.075,
        callIncrease: 2,
        gradeDecrease: 0.25
      });
      grade += await algoUtils.calculateActionActivityScore(actions, 1, {
        gradeIncrease: 0.15,
        actionIncrease: 1,
        gradeDecrease: 0.5
      });
      break;
    default:
      grade += await algoUtils.calculateActivityScore(activity, 840, {
        gradeIncrease: 0.9,
        minIncrease: 100,
        gradeDecrease: 3
      });
      grade += await algoUtils.calculateReportScore(reports, 2, {
        gradeIncrease: 0.075,
        reportIncrease: 2,
        gradeDecrease: 1.5
      });
      grade += await algoUtils.calculateFineScore(fines, 6, {
        gradeIncrease: 0.15,
        fineIncrease: 2,
        gradeDecrease: 0.75
      });
      grade += await algoUtils.calculateCallsScore(calls, 3, {
        gradeIncrease: 0.075,
        callIncrease: 2,
        gradeDecrease: 0.25
      });
      grade += await algoUtils.calculateActionActivityScore(actions, 1, {
        gradeIncrease: 0.3,
        actionIncrease: 1,
        gradeDecrease: 0.5
      });
      break;
  }

  grade = parseFloat(grade);

  if (grade > 10) grade = 10;
  if (grade < 1) grade = 1;

  grade = await algoUtils.gradeAdjust(rank, grade, {
    reports: reports,
    fines: fines,
    calls: calls,
    actionActivity: actions
  });

  if (leaveDays === 1) {
    grade += grade * 0.075;
  } else if (leaveDays === 2) {
    grade += grade * 0.15;
  } else if (leaveDays === 3) {
    grade += grade * 0.225;
  } else if (leaveDays === 4) {
    grade += grade * 0.3;
  }

  return grade;
};
