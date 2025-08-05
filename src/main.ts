
import { getRequiredElement } from "./utils/domHelpers.js";
import { Student } from "./models/student.js";

const listContainer = getRequiredElement("#student-list") as HTMLElement;

function renderStudentList(): void {
    listContainer.textContent = "";
    // Placeholder array
    const students: Student[] = [];
    students.forEach((item) => listContainer.appendChild(plainListItem(item)));
    if (students.length > 0)
        return;
    const li = document.createElement("div");
    li.textContent = "Listan är tom...";
    listContainer.appendChild(li);
}

/*
    Plain list item
*/
function plainListItem(item: Student): HTMLElement {
    let div = document.createElement("div");
    return div;
}

renderStudentList();