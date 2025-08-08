import { Student } from "./models/student.js";
const iconsRoot = "./assets/icons/";

export const ICON_PATHS = {
  DELETE_TRASH: `${iconsRoot}delete_trash.png`,
};

export type StudentSortKeysType = keyof Omit<Student, "id">;