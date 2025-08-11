import { Student } from "../models/student.js";
import { storage } from "../utils/storage.js";
export const studentStorage = storage<Student[]>("roster");
