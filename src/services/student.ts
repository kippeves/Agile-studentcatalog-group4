import { getStudents } from "../data/student.js";
import { Student } from "../models/student.js";

/**
 * Loads all students from storage.
 * @returns Array of 'Student' objects, or empty array.
 */
export function loadStudents(): Student[] {
  return getStudents() || [];
}
