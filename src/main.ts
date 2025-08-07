
import { getRequiredElement } from "./utils/domHelpers.js";
import { Student } from "./models/student.js";
import { initializeData, loadStudents } from "./services/student.js";
import { createStudentListItem } from "./ui/createStudentListItem.js";
import { getStudents } from "./data/student.js";

const listContainer = getRequiredElement("#student-ul") as HTMLUListElement;

const studentList = getStudents();
if (studentList === undefined) // "Index is initialized previously"
    initializeData();

renderStudentList();

function renderStudentList(): void {
    listContainer.textContent = "";
    // Placeholder array
    const students: Student[] = loadStudents();
    students.forEach((item) => listContainer.appendChild(createStudentListItem(item)));
    if (students.length > 0)
        return;
    const item = document.createElement("li");
    item.textContent = "Listan är tom...";
    listContainer.appendChild(item);
}
