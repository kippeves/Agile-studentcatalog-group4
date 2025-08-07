
import { getRequiredElement } from "./utils/domHelpers.js";
import { Student } from "./models/student.js";
import { loadStudents } from "./services/student.js";
import { createStudentListItem } from "./ui/createStudentListItem.js";

export const Students: Student[] = [
    { id: 100, name: "Erik Johansson", age: 22, isActive: true },
    { id: 101, name: "Anna Karlsson", age: 22, isActive: false },
    { id: 102, name: "Lukas Nilsson", age: 21, isActive: true },
    { id: 103, name: "Maja Larsson", age: 22, isActive: true },
    { id: 104, name: "Oscar Andersson", age: 21, isActive: false },
    { id: 105, name: "Ella Svensson", age: 22, isActive: true },
    { id: 106, name: "William Gustafsson", age: 21, isActive: false },
    { id: 107, name: "Alva Pettersson", age: 22, isActive: true },
    { id: 108, name: "Noah Lindberg", age: 21, isActive: true },
    { id: 109, name: "Freja Bergström", age: 22, isActive: false },
    { id: 110, name: "Elias Lundqvist", age: 21, isActive: true },
    { id: 111, name: "Agnes Holm", age: 22, isActive: true },
    { id: 112, name: "Viktor Axelsson", age: 21, isActive: false },
    { id: 113, name: "Stella Ek", age: 23, isActive: true },
    { id: 114, name: "Filip Björk", age: 21, isActive: true },
    { id: 115, name: "Alice Håkansson", age: 23, isActive: false },
    { id: 116, name: "Theo Ström", age: 21, isActive: true },
    { id: 117, name: "Ebba Lindgren", age: 23, isActive: true },
    { id: 118, name: "Isak Forsberg", age: 21, isActive: false },
    { id: 119, name: "Nova Nyström", age: 22, isActive: true },
    { id: 120, name: "Anton Sjöberg", age: 21, isActive: true },
    { id: 121, name: "Julia Sandberg", age: 22, isActive: false },
    { id: 122, name: "Melvin Engström", age: 22, isActive: true },
    { id: 123, name: "Tilde Hellström", age: 22, isActive: true },
    { id: 124, name: "Leo Åberg", age: 21, isActive: false }
];

const listContainer = getRequiredElement<HTMLUListElement>("#student-ul");
const frmAddUser = getRequiredElement<HTMLFormElement>("form.add-user-form");
const inputName = getRequiredElement<HTMLInputElement>("#name", frmAddUser);
const inputAge = getRequiredElement<HTMLInputElement>("#age", frmAddUser);
const cbIsActive = getRequiredElement<HTMLInputElement>("#isActive", frmAddUser);
const btnAddUser = getRequiredElement<HTMLButtonElement>("button", frmAddUser);

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

frmAddUser.addEventListener("click", (e) => {
    const { target } = e;
    switch (target) {
        case btnAddUser:
            e.preventDefault();
            const age = Number(inputAge.value?.trim());
            const student = {
                name: inputName.value?.trim(),
                age: Number.isInteger(age) ? Number(age) : age,
                isActive: cbIsActive.checked
            };

            student.name && student.age && Number.isInteger(student.age) && (() => {
                console.log("Add user ...");
            })();
            break;
    }
});