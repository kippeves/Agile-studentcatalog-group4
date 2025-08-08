import { BUTTON_ACTIONS } from "./config.js";
import { load } from "./data/student.js";
import { Student } from "./models/student.js";
import {
  checkIfDataIsInitialized,
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "./services/student.js";
import { createStudentListItem } from "./ui/createStudentListItem.js";
import { getRequiredElement } from "./utils/domHelpers.js";
import { generateId } from "./utils/generateId.js";

const listContainer = getRequiredElement<HTMLUListElement>("#student-list");
const frmAddUser = getRequiredElement<HTMLFormElement>("form.add-user-form");
const inputName = getRequiredElement<HTMLInputElement>("#name", frmAddUser);
const inputAge = getRequiredElement<HTMLInputElement>("#age", frmAddUser);
const cbIsActive = getRequiredElement<HTMLInputElement>(
  "#isActive",
  frmAddUser
);

checkIfDataIsInitialized();
renderStudentList();

function handleStudentDeletion(
  // listContainer: HTMLElement,
  studentId: number
): void {
  try {
    deleteStudent(studentId);
    renderStudentList();
  } catch (error) {
    alert("Could not delete student - please refresh the page");
  }
}

function toggleStudentActive(target: HTMLElement): void {
  const input = target as HTMLInputElement;
  const val = input.closest("li")?.dataset["studentId"];

  if (val === undefined || isNaN(parseInt(val))) return;

  const foundStudent = getStudents()?.find((x) => x.id === parseInt(val));
  if (foundStudent === undefined) return;

  foundStudent.isActive = input.checked;
  updateStudent(foundStudent);
  renderStudentList();
}

function handleStudentListClick(e: MouseEvent): void {
  // const container = e.currentTarget as HTMLLIElement;
  const target = e.target as HTMLElement;

  // Find parent button of the target
  const btn = target.closest<HTMLElement>("[data-action]");
  if (!btn) return;

  // Find parent list item of the button
  const listItem = btn.closest<HTMLLIElement>("li[data-student-id]");
  if (!listItem)
    throw new Error(`No list item found with id for button ${btn}`);

  const studentId = Number(listItem.dataset["studentId"]);
  const action = btn.dataset["action"];

  // Call appropriate function for action
  switch (action) {
    case BUTTON_ACTIONS.DELETE_STUDENT:
      handleStudentDeletion(studentId);
      break;
    case BUTTON_ACTIONS.TOGGLE_ACTIVE:
      toggleStudentActive(target);
      break;
  }
}

listContainer.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  switch (target.tagName) {
    case "INPUT":
      toggleStudentActive(target);
      break;
  }
});

function renderStudentList(): void {
  listContainer.textContent = "";
  // Placeholder array
  const students = getStudents();
  if (!students) return;
  students.forEach((item) =>
    listContainer.appendChild(createStudentListItem(item))
  );
  if (students.length > 0) return;
  const item = document.createElement("li");
  item.textContent = "Listan är tom...";
  listContainer.appendChild(item);
}

frmAddUser.addEventListener("submit", (e) => {
  e.preventDefault();
  const age = Number(inputAge.value?.trim());
  const student: Student = {
    id: generateId(undefined, getStudents()),
    name: inputName.value?.trim(),
    age: Number.isInteger(age) ? Number(age) : age,
    isActive: cbIsActive.checked,
  };

  student.name &&
    student.age &&
    Number.isInteger(student.age) &&
    createStudent(student) &&
    renderStudentList();
});
