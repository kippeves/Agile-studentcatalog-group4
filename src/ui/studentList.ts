import { BUTTON_ACTIONS, ICON_PATHS } from "../config.js";
import { Student } from "../models/student.js";

function createStudentListItem(student: Student): HTMLLIElement {
  const isChecked = student.isActive;

  const li = document.createElement("li");
  li.setAttribute("role", "list");
  li.dataset["studentId"] = student.id.toString();
  li.classList.add("student-list__item");

  li.innerHTML = `
    <span class="justify-self-start">${student.name}</span>
    <span>${student.age}</span>
    <input type="checkbox" name="active-students" value=${
      student.id
    } data-action=${BUTTON_ACTIONS.TOGGLE_ACTIVE} aria-label="Mark ${
    student.name
  } as active" ${isChecked ? "checked" : ""}>
    <button type="button" data-action=${
      BUTTON_ACTIONS.DELETE_STUDENT
    } class="no-border" aria-label="Delete student">
        <img src=${ICON_PATHS.DELETE_TRASH} alt="" aria-hidden="true">
    </button>
  `;

  return li;
}

function createStudentListHeading(): HTMLLIElement {
  const headingLi = document.createElement("li");
  headingLi.setAttribute("role", "list");
  headingLi.classList.add("student-list__heading", "student-list__item");

  headingLi.innerHTML = `
    <span class="justify-self-start">Student</span>
    <span>Age</span>
    <span id="is-active-heading">Active</span>
  `;

  return headingLi;
}

export function renderStudentList(
  students: Student[],
  listContainer: HTMLElement
): void {
  listContainer.textContent = "";
  const frag = document.createDocumentFragment();
  frag.appendChild(createStudentListHeading());

  students.forEach((item) => frag.appendChild(createStudentListItem(item)));
  listContainer.appendChild(frag);
  if (students.length > 0) return;

  // Display message if student list empty
  const item = document.createElement("li");
  item.textContent = "Listan är tom...";
  listContainer.appendChild(item);
}
