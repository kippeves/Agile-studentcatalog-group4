import { BUTTON_ACTIONS } from "./config.js";
import { Student } from "./models/student.js";
import {
  checkIfDataIsInitialized,
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "./services/student.js";
import { renderStudentList } from "./ui/studentList.js";
import { getRequiredElement } from "./utils/domHelpers.js";
import { generateId } from "./utils/generateId.js";

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

function findStudents(listContainer: HTMLElement, search: string): void {
    const studentList = getStudents();

    function likeString(x: string, y: string): boolean {
        return x.toLowerCase().indexOf(y.toLowerCase()) >= 0;
    }
    const found = studentList.filter((item) => likeString(item.name, search));

    const list = listContainer.querySelectorAll("li") as NodeListOf<HTMLElement>;
    list.forEach(item => {
        let hide = true;
        const itemId = item.dataset["studentId"];
        if (itemId !== undefined) {
            const index = found.findIndex(x => x.id === parseInt(itemId));
            hide = (index < 0);
        }
        item.style.display = (hide ? "none" : "block");
    });
}

function toggleStudentActive(target: HTMLElement): void {
  const input = target as HTMLInputElement;
  const val = input.closest("li")?.dataset["studentId"];

  if (val === undefined || isNaN(parseInt(val))) return;

  const foundStudent = getStudents()?.find((x) => x.id === parseInt(val));
  if (foundStudent === undefined) return;

  foundStudent.isActive = input.checked;
  updateStudent(foundStudent);
}

function handleStudentListClick(e: MouseEvent): void {
  const listContainer = e.currentTarget as HTMLLIElement;
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
      handleStudentDeletion(listContainer, studentId);
      break;
    case BUTTON_ACTIONS.TOGGLE_ACTIVE:
      toggleStudentActive(target);
      renderStudentList(listContainer);
      break;
  }
}

function intialisePage(): void {
  // Find DOM elements
  const inputSearch = getRequiredElement<HTMLInputElement>("#student-search");
  const listContainer = getRequiredElement<HTMLUListElement>("#student-ul");
  const frmAddUser = getRequiredElement<HTMLFormElement>("form.add-user-form");
  const inputName = getRequiredElement<HTMLInputElement>("#name", frmAddUser);
  const inputAge = getRequiredElement<HTMLInputElement>("#age", frmAddUser);
  const cbIsActive = getRequiredElement<HTMLInputElement>(
    "#isActive",
    frmAddUser
  );
  let searchTimeout: any;

  // Add event listeners
  listContainer.addEventListener("click", handleStudentListClick);

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
      renderStudentList(listContainer);
  });

  inputSearch.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement;
    if (searchTimeout !== undefined) {
        window.clearTimeout(searchTimeout);
    }
    searchTimeout = window.setTimeout(() => {
        findStudents(listContainer, target.value);
    }, 500);
});

  // Initialise data and render list
  checkIfDataIsInitialized();
  renderStudentList(listContainer);
}

// Entry point
document.addEventListener("DOMContentLoaded", intialisePage);
