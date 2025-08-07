
import { getRequiredElement } from "./utils/domHelpers.js";
import { Student } from "./models/student.js";
import { loadStudents, saveStudents } from "./services/student.js";
import { createStudentListItem } from "./ui/createStudentListItem.js";

const listContainer = getRequiredElement("#student-ul") as HTMLUListElement;

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

    const students: Student[] = loadStudents();
    const index = students.findIndex(item => item.id === parseInt(val));
    if (index < 0 || students[index] === undefined)
        return;
    let student = students[index];
    student.isActive = input.checked;

    students[index] = student;
    //
}