import { Student } from "./models/student.js";
import { getRequiredElement } from "./utils/domHelpers.js";
import { generateId } from "./utils/generateId.js";
import { getStudents, createStudent, updateStudent } from "./services/student.js";
import { createStudentListItem } from "./ui/createStudentListItem.js";

const frmAddUser = getRequiredElement<HTMLFormElement>("form.add-user-form");
const inputName = getRequiredElement<HTMLInputElement>("#name", frmAddUser);
const inputAge = getRequiredElement<HTMLInputElement>("#age", frmAddUser);
const cbIsActive = getRequiredElement<HTMLInputElement>("#isActive", frmAddUser);
const listContainer = getRequiredElement<HTMLUListElement>("#student-ul");

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
    const students = getStudents();
    if (!students)
        return;
    students.forEach((item) => listContainer.appendChild(createStudentListItem(item)));
    if (students.length > 0)
        return;
    const item = document.createElement("li");
    item.textContent = "Listan är tom...";
    listContainer.appendChild(item);
}

frmAddUser.addEventListener("submit", (e) => {
    e.preventDefault();
    const age = Number(inputAge.value?.trim());
    const student: Student = {
        id: generateId(undefined, getStudents()),
        name: inputName.value?.trim(),
        age: Number.isInteger(age) ? Number(age) : age,
        isActive: cbIsActive.checked
    };

    student.name && student.age && Number.isInteger(student.age) && createStudent(student) && renderStudentList();
});

function toggleStudentActive(target: HTMLElement): void {
    const input = target as HTMLInputElement;
    const val = input.closest("li")?.dataset["studentId"];

    if (val === undefined || isNaN(parseInt(val)))
        return;

    const foundStudent = getStudents()?.find(x => x.id === parseInt(val));
    if (foundStudent === undefined)
        return;

    foundStudent.isActive = input.checked;
    updateStudent(foundStudent);
    renderStudentList();
}