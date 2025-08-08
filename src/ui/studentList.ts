import { BUTTON_ACTIONS, ICON_PATHS } from "../config.js";
import { Student } from "../models/student.js";

function createStudentListItem(student: Student): HTMLLIElement {
  const isChecked = student.isActive;

  const li = document.createElement("li");
  li.dataset["studentId"] = student.id.toString();

  li.innerHTML = `
    <span class="student-name">${student.name}</span>
    <span class="student-age">${student.age}</span>
    <label class="visually-hidden">
      Active
      <input type="checkbox" data-action=${BUTTON_ACTIONS.TOGGLE_ACTIVE
    } name="isActiveInput" ${isChecked ? "checked" : ""}>
    </lnpx tscabel>
    <button type="button" data-action=${BUTTON_ACTIONS.DELETE_STUDENT
    } aria-label="Delete student">
        <img src=${ICON_PATHS.DELETE_TRASH} alt="" aria-hidden="true">
    </button>
  `;

  return li;
}

export function renderStudentList(students: Student[], listContainer: HTMLElement): void {
  listContainer.textContent = "";
  // Placeholder array
  students.forEach((item) =>
    listContainer.appendChild(createStudentListItem(item))
  );
  if (students.length > 0) return;
  const item = document.createElement("li");
  item.textContent = "Listan är tom...";
  listContainer.appendChild(item);
}
