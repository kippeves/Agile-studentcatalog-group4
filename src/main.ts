import { BUTTON_ACTIONS } from "./config.js";
import { checkIfDataIsInitialized, deleteStudent } from "./services/student.js";
import { renderStudentList } from "./ui/studentList.js";
import { getRequiredElement } from "./utils/domHelpers.js";

function handleStudentDeletion(
  listContainer: HTMLElement,
  studentId: number
): void {
  deleteStudent(studentId);
  renderStudentList(listContainer);
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
  const listContainer = getRequiredElement<HTMLUListElement>("#student-ul");

  listContainer.addEventListener("click", handleStudentListClick);

  checkIfDataIsInitialized();
  renderStudentList(listContainer);
}

// Entry point
document.addEventListener("DOMContentLoaded", intialisePage);
