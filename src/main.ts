import { BUTTON_ACTIONS, StudentSortKeysType } from "./config.js";
import { Student } from "./models/student.js";
import {
  getStudents,
  updateStudent,
  deleteStudent,
  addStudent,
  getSortedStudents,
  initialiseStudents,
  setSortCriteria,
} from "./services/student.js";
import { addSortAreas } from "./ui/sortForm.js";
import { renderStudentList } from "./ui/studentList.js";
import { getRequiredElement } from "./utils/domHelpers.js";
import { generateId } from "./utils/generateId.js";

// Cached DOM elements
let frmSort: HTMLFormElement;
let selectSortAreas: HTMLSelectElement;
let studentListEl: HTMLUListElement;
let frmAddStudent: HTMLFormElement;
let inputName: HTMLInputElement;
let inputAge: HTMLInputElement;
let cbIsActive: HTMLInputElement;

/**
 * Refreshes the UI be re-rendering the student list in its current sort order
 */
function refreshUI(): void {
  renderStudentList(getSortedStudents(), studentListEl);
}

/**
 * Handles deletion of a student by ID and refreshes the UI
 * @param studentId The ID of the student to delete
 */
function handleStudentDeletion(studentId: number): void {
  try {
    deleteStudent(studentId);
    refreshUI();
  } catch (error) {
    alert("Could not delete student - please refresh and try again!");
  }
}

/**
 * Updates a student's active status based on checkbox state
 * @param target The HTML element that triggered the event
 * @param studentId The ID of the student to update
 */
function setStudentActiveStatus(target: HTMLElement, studentId: number): void {
  if (!(target instanceof HTMLInputElement)) return;

  try {
    updateStudent(studentId, target.checked);
    refreshUI();
  } catch (error) {
    alert("Could not update student - please refresh and try again!");
  }
}

/**
 * Handles click events on the student list to perform actions like delete or set active status
 * @param e The mouse-click event
 */
function handleStudentListClick(e: MouseEvent): void {
  const target = e.target as HTMLElement;

  // Find parent button of the target
  const actionElement = target.closest<HTMLElement>("[data-action]");
  if (!actionElement) return;

  // Find parent list item of the button
  const listItem = actionElement.closest<HTMLLIElement>("li[data-student-id]");
  if (!listItem)
    throw new Error(`No list item found with id for button ${actionElement}`);

  const studentId = Number(listItem.dataset["studentId"]);
  const action = actionElement.dataset["action"];

  // Call appropriate function for action
  switch (action) {
    case BUTTON_ACTIONS.DELETE_STUDENT:
      handleStudentDeletion(studentId);
      break;
    case BUTTON_ACTIONS.TOGGLE_ACTIVE:
      setStudentActiveStatus(target, studentId);
      break;
    default:
      console.log("Unknown action", action);
  }
}

/**
 * Handles form submission for sorting students by criteria and order
 * @param e The form submit event
 */
function handleSorting(e: SubmitEvent): void {
  e.preventDefault();
  const data = new FormData(frmSort);
  const area = data.get("areas") as StudentSortKeysType;
  const order = data.get("order")?.toString();
  if (!order) return;

  setSortCriteria(area, order);
  refreshUI();
}

/**
 * Handles form submission for adding a new student
 * @param e The form submit event
 */
function handleAddStudent(e: SubmitEvent): void {
  e.preventDefault();
  const age = Number(inputAge.value?.trim());

  const student: Student = {
    id: generateId(undefined, getStudents()),
    name: inputName.value?.trim(),
    age: Number.isInteger(age) ? Number(age) : NaN,
    isActive: cbIsActive.checked,
  };

  if (student.name && Number.isInteger(student.age)) {
    try {
      addStudent(student);
      refreshUI();
    } catch (error) {
      alert("Could not add student - please try again!");
    }
  }
}

/**
 * Initialises the page by caching DOM elements, adding event listeneres and rendering initial student data
 */
function initialisePage(): void {
  // Cache DOM elements
  frmSort = getRequiredElement<HTMLFormElement>("form#sort-form");
  selectSortAreas = getRequiredElement<HTMLSelectElement>("#sort-areas");
  studentListEl = getRequiredElement<HTMLUListElement>("#student-ul");
  frmAddStudent = getRequiredElement<HTMLFormElement>("form#add-student-form");
  inputName = getRequiredElement<HTMLInputElement>("#name", frmAddStudent);
  inputAge = getRequiredElement<HTMLInputElement>("#age", frmAddStudent);
  cbIsActive = getRequiredElement<HTMLInputElement>("#isActive", frmAddStudent);

  // Add event listeners
  studentListEl.addEventListener("click", handleStudentListClick);
  frmSort.addEventListener("submit", handleSorting);
  frmAddStudent.addEventListener("submit", handleAddStudent);

  // Populate 'sort' dropdown
  addSortAreas(selectSortAreas);

  // Initialise data and render list
  initialiseStudents();
  refreshUI();
}

// Entry point
document.addEventListener("DOMContentLoaded", initialisePage);
