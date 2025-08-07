
import { getRequiredElement } from "./utils/domHelpers.js";
import { Student } from "./models/student.js";
import { initializeData, loadStudents, updateStudent } from "./services/student.js";
import { createStudentListItem } from "./ui/createStudentListItem.js";

const listContainer = getRequiredElement<HTMLUListElement>("#student-ul");

const studentList = loadStudents();
if (studentList === undefined) // "Index is initialized previously"
    initializeData();

renderStudentList();

listContainer.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    switch (target.tagName) {
        case "INPUT":
            toggleStudentActive(target);
            break;
    }
});

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

function toggleStudentActive(target: HTMLElement): void {
    const input = target as HTMLInputElement;
    const val = input.closest("li")?.dataset["studentId"];

    if (val === undefined || isNaN(parseInt(val)))
        return;

    const foundStudent = studentList?.find(x => x.id === parseInt(val));
    if (foundStudent === undefined)
        return;

    updateStudent(foundStudent);
    renderStudentList();
}