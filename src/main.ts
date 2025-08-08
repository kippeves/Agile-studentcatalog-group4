import { BUTTON_ACTIONS } from "./config.js";
import { Student } from "./models/student.js";
import {
  getStudents,
  updateStudent,
  deleteStudent,
} from "./services/student.js";
import { renderStudentList } from "./ui/studentList.js";
import { getRequiredElement } from "./utils/domHelpers.js";
import { generateId } from "./utils/generateId.js";
import { checkIfDataIsInitialized, createStudent } from "./services/student.js";
import { load } from "./data/student.js";
import { StudentSortKeysType } from "./config.js";
import { returnSortedList } from "./ui/sortStudentList.js";

const listContainer = getRequiredElement<HTMLUListElement>("#student-ul");
const select = getRequiredElement<HTMLSelectElement>("#sort-areas")
const frmSort = getRequiredElement<HTMLFormElement>("form#sort-form");

addSortAreas();
checkIfDataIsInitialized();
loadStudentList();

function handleStudentDeletion(
  studentId: number
): void {
  try {
    deleteStudent(studentId);
    loadStudentList();
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
  loadStudentList();
}

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
      toggleStudentActive(target);
      loadStudentList();
      break;
  }
}

listContainer.addEventListener("click", handleStudentListClick);
loadStudentList();

function loadStudentList() {
  const initialList = load();
  if (!initialList)
    return;
  renderStudentList(initialList, listContainer);
}

function addSortAreas() {
  type selectOpt = { value: string; text: string; };
  let options: selectOpt[] = [{ value: "name", text: "Name" }, { value: "age", "text": "Age", }, { value: "isActive", text: "Is Active" }];
  let items = options.map(i => {
    const option = document.createElement("option");
    option.value = i.value;
    option.text = i.text;
    return option;
  });
  select.replaceChildren(...[select.children[0]!, ...items]);
}

function intialisePage(): void {
  // Find DOM elements
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

frmSort.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(frmSort);
  const area = data.get("areas") as StudentSortKeysType;
  const order = data.get("order")?.toString();
  if (!order)
    return;
  const sortedStudentList = returnSortedList(area, order)
  renderStudentList(sortedStudentList!, listContainer);
})

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
    loadStudentList();
});

// Initialise data and render list
checkIfDataIsInitialized();
loadStudentList();
}

// Entry point
document.addEventListener("DOMContentLoaded", intialisePage);
