import { load, save } from "../data/student.js";
import { Student } from "../models/student.js";

export function checkIfDataIsInitialized() {
  const studentList = load();
  if (studentList === undefined)
    // "Index is initialized previously"
    initializeData();
}

export const getStudents = () => {
  let studentList = load();
  if (studentList === undefined) {
    return [];
  }
  return studentList;
};

export const deleteStudent = (id: number) => {
  const studentList = load();
  const studentToRemove = studentList?.find((x) => x.id === Number(id));
  if (!(studentList && studentToRemove)) return;
  studentList.splice(studentList.indexOf(studentToRemove), 1);
  save({ data: studentList });
};

export function createStudent(student: Student): Student {
  const studentList = load();
  studentList !== undefined &&
    studentList.push(student) &&
    save({ data: studentList });
  return student; // for chaining possibillities
}

export const updateStudent = (student: Student) => {
  const studentList = getStudents();
  if (studentList === undefined) return;

  const index = studentList?.findIndex((d) => d.id === student.id);
  if (index < 0) return;

  const studentToUpdate = studentList[index];
  if (!studentToUpdate) return;

  studentToUpdate.isActive = student.isActive;
  studentList[index] = studentToUpdate;
  save({ data: studentList });
};

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
  save({ data: initialData });
}
