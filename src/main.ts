
import { getRequiredElement } from "./utils/domHelpers.js";
import { Student } from "./models/student.js";
import { loadStudents } from "./services/student.js";

const listContainer = getRequiredElement("#student-list") as HTMLElement;

renderStudentList();

function renderStudentList(): void {
    listContainer.textContent = "";
    // Placeholder array
    const students: Student[] = loadStudents();
    students.forEach((item) => listContainer.appendChild(plainListItem(item)));
    if (students.length > 0)
        return;
    const item = document.createElement("div");
    item.textContent = "Listan är tom...";
    listContainer.appendChild(item);
}

/*
    Plain list item
*/
function plainListItem(item: Student): HTMLElement {
    let div = document.createElement("div");
    return div;
}
