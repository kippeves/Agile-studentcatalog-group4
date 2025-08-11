import { StudentSortKeysType } from "../config.js";
import { studentStorage } from "../data/student.js";
import { Student } from "../models/student.js";

// Module-level state-tracking
let students: Student[] = [];
let currentSortBy: StudentSortKeysType | null = null;
let currentSortOrder = "asc";

/**
 * Initialises the students array by loading from storage, or creating initial data if no array present in storage
 */
export function initialiseStudents() {
  if (!studentStorage.checkExists()) initializeData();
  students = studentStorage.load();
}

/**
 * Returns the current students array
 * @returns The array of students
 */
export const getStudents = () => {
  return students;
};

/**
 * Delets a student by ID and updates storage
 * @param id The ID of the student to delete
 */
export const deleteStudent = (id: number) => {
  const studentList = getStudents();
  const studentToRemove = studentList?.find((x) => x.id === Number(id));
  if (!(studentList && studentToRemove)) return;

  studentList.splice(studentList.indexOf(studentToRemove), 1);
  studentStorage.save({ data: studentList });
};

/**
 * Adds a new student to the list and saves to storage
 * @param student The Student object to add
 * @returns The added student for chaining possibilities
 */
export function addStudent(student: Student): Student {
  students !== undefined &&
    students.push(student) &&
    studentStorage.save({ data: students });
  return student; // for chaining possibilities
}

/**
 * Updates a student's active status by ID and saves to storage
 * @param id The ID of the student to update
 * @param isChecked The new active status
 */
export const updateStudent = (id: number, isChecked: boolean) => {
  const studentToUpdate = students.find((student) => student.id === id);
  if (!studentToUpdate) return;

  studentToUpdate.isActive = isChecked;
  studentStorage.save({ data: students });
};

/**
 * Sets the sorting criteria for the student list display
 * @param sortBy The field to sort by (name, age, or isActive)
 * @param sortOrder The sort direction ("asc" or "desc")
 */
export function setSortCriteria(
  sortBy: StudentSortKeysType,
  sortOrder: string
) {
  currentSortBy = sortBy;
  currentSortOrder = sortOrder;
}

/**
 * Returns students sorted by the current sort critera
 * @returns A sorted copy of the students array
 */
export function getSortedStudents() {
  if (!currentSortBy) return students;

  // Create shallow copy to avoid updating in-memory array
  const sortedStudents = [...students].sort((a, b) => {
    switch (currentSortBy) {
      case "name":
        if (currentSortOrder === "asc")
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
      case "age":
        if (currentSortOrder === "asc")
          return a.age < b.age ? -1 : a.age > b.age ? 1 : 0;
        return a.age > b.age ? -1 : a.age < b.age ? 1 : 0;
      case "isActive":
        if (currentSortOrder === "asc")
          return a.isActive < b.isActive ? -1 : a.isActive > b.isActive ? 1 : 0;
        return a.isActive > b.isActive ? -1 : a.isActive < b.isActive ? 1 : 0;
      default:
        return 0;
    }
  });

  return sortedStudents;
}

/**
 * Creates and saes initial sample student data to storage
 */
export function initializeData() {
  const initialData: Student[] = [
    { id: 100, name: "Erik Johansson", age: 22, isActive: true },
    { id: 101, name: "Anna Karlsson", age: 22, isActive: false },
    { id: 102, name: "Lukas Nilsson", age: 21, isActive: true },
    { id: 103, name: "Maja Larsson", age: 22, isActive: true },
    { id: 104, name: "Oscar Andersson", age: 21, isActive: false },
    { id: 105, name: "Ella Svensson", age: 22, isActive: true },
    { id: 106, name: "William Gustafsson", age: 21, isActive: false },
    { id: 107, name: "Alva Pettersson", age: 22, isActive: true },
    { id: 108, name: "Noah Lindberg", age: 21, isActive: true },
    { id: 109, name: "Freja Bergström", age: 22, isActive: false },
    { id: 110, name: "Elias Lundqvist", age: 21, isActive: true },
    { id: 111, name: "Agnes Holm", age: 22, isActive: true },
    { id: 112, name: "Viktor Axelsson", age: 21, isActive: false },
    { id: 113, name: "Stella Ek", age: 23, isActive: true },
    { id: 114, name: "Filip Björk", age: 21, isActive: true },
    { id: 115, name: "Alice Håkansson", age: 23, isActive: false },
    { id: 116, name: "Theo Ström", age: 21, isActive: true },
    { id: 117, name: "Ebba Lindgren", age: 23, isActive: true },
    { id: 118, name: "Isak Forsberg", age: 21, isActive: false },
    { id: 119, name: "Nova Nyström", age: 22, isActive: true },
    { id: 120, name: "Anton Sjöberg", age: 21, isActive: true },
    { id: 121, name: "Julia Sandberg", age: 22, isActive: false },
    { id: 122, name: "Melvin Engström", age: 22, isActive: true },
    { id: 123, name: "Tilde Hellström", age: 22, isActive: true },
    { id: 124, name: "Leo Åberg", age: 21, isActive: false },
  ];
  studentStorage.save({ data: initialData });
}
