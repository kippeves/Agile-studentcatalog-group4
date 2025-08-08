import { BUTTON_ACTIONS } from "./config.js";
import { Student } from "./models/student.js";
import { checkIfDataIsInitialized, deleteStudent } from "./services/student.js";
import { renderStudentList } from "./ui/studentList.js";
import { getRequiredElement } from "./utils/domHelpers.js";
import { generateId } from "./utils/generateId.js";
import { load } from "./data/student.js";

function handleStudentDeletion(
  listContainer: HTMLElement,
  studentId: number
): void {
  try {
    deleteStudent(studentId);
    renderStudentList(listContainer);
  } catch (error) {
    alert("Could not delete student - please refresh the page");
  }
}

function handleStudentListClick(e: MouseEvent): void {
  const container = e.currentTarget as HTMLLIElement;
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
      handleStudentDeletion(container, studentId);
      break;
    case BUTTON_ACTIONS.TOGGLE_ACTIVE:
      break;
  }
}

function intialisePage(): void {
  // FInd DOM elements
  const listContainer = getRequiredElement<HTMLUListElement>("#student-ul");
  const frmAddUser = getRequiredElement<HTMLFormElement>("form.add-user-form");
  const inputName = getRequiredElement<HTMLInputElement>("#name", frmAddUser);
  const inputAge = getRequiredElement<HTMLInputElement>("#age", frmAddUser);
  const cbIsActive = getRequiredElement<HTMLInputElement>(
    "#isActive",
    frmAddUser
  );

  // Add event listeners
  listContainer.addEventListener("click", handleStudentListClick);

  frmAddUser.addEventListener("submit", (e) => {
    e.preventDefault();
    const age = Number(inputAge.value?.trim());
    const student: Student = {
      id: generateId(undefined, load()),
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

  // Initialise data and render list
  checkIfDataIsInitialized();
  renderStudentList(listContainer);
}

// Entry point
document.addEventListener("DOMContentLoaded", intialisePage);
