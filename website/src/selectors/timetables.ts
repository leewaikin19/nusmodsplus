import { createSelector } from 'reselect';

import type { ModuleCode, Semester, CustomBlock } from 'types/modules';
import type { State } from 'types/state';

import { fetchArchiveRequest } from 'actions/constants';
import config from 'config';
import { isOngoing, isSuccess } from 'selectors/requests';

export function isArchiveLoading(state: State, moduleCode: ModuleCode) {
  return config.archiveYears.some((year) =>
    isOngoing(state, fetchArchiveRequest(moduleCode, year)),
  );
}

export function availableArchive(state: State, moduleCode: ModuleCode): string[] {
  return config.archiveYears.filter((year) =>
    isSuccess(state, fetchArchiveRequest(moduleCode, year)),
  );
}

const EMPTY_OBJECT = {};

/**
 * Extract semester timetable lessons for a specific semester.
 */
export const getSemesterTimetableLessons = createSelector(
  ({ timetables }: State) => timetables.lessons,
  (lessons) => (semester: Semester | null) =>
    semester === null ? EMPTY_OBJECT : lessons[semester] ?? EMPTY_OBJECT,
);

// TODO changed
const tmp : CustomBlock = {
  customBlock: true,
  classNo: "",
      colorIndex: 5,
      day: "Thursday",
      endTime: "1100",
      startTime: "0900",
      lessonType: "Tutorial",
      moduleCode: "ABC1000",
      moduleCredit: "0",
      acadYear: "",
      department: "",
      faculty: "",
      venue: "LT11",
      semesterData: [],
      timestamp: 0,
      title: "Test Title Goes Here",
      weeks: [1,2,3,4,5,6,7,8,9,10,11,12,13],
}
export const getCustomBlocks = createSelector(
  ({ timetables }: State) => timetables.customBlocks,
  (blocks) => blocks,
);

/**
 * Extract semester timetable colors for a specific semester.
 */
export const getSemesterTimetableColors = createSelector(
  ({ timetables }: State) => timetables.colors,
  (colors) => (semester: Semester | null) =>
    semester === null ? EMPTY_OBJECT : colors[semester] ?? EMPTY_OBJECT,
);
