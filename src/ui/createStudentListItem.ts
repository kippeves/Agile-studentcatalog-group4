import { ICON_PATHS } from "../config";
import { Student } from "../models/student";

export function createStudentListItem(student: Student): HTMLLIElement {
  const isChecked = student.isActive;

  const li = document.createElement("li");
  li.dataset["studentId"] = student.id.toString();

  li.innerHTML = `
    <span class="student-name">${student.name}</span>
    <span class="student-age">${student.age}</span>
    <label class="visually-hidden" for="student-active">Active</label>
    <input type="checkbox" id="student-active" ${isChecked ? "checked" : ""}>
    <button type="button" data-action="delete-student" aria-label="Delete student">
        <img src=${ICON_PATHS.DELETE_TRASH} alt="" aria-hidden="true">
    </button>
  `;

  return li;
}
