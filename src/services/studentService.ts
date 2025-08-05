import { getStudents } from "../data/student";
import { Student } from "../models/student";

/**
 * Loads all students from storage.
 * @returns Array of 'Student' objects, or empty array.
 */
export function loadStudents(): Student[] {
  return getStudents() || [];
}
