import { Student } from "./models/student.js";
import { getRequiredElement } from "./utils/domHelpers.js";
import { generateId } from "./utils/generateId.js";
import { checkIfDataIsInitialized, createStudent } from "./services/student.js";
import { createStudentListItem } from "./ui/createStudentListItem.js";
import { load } from "./data/student.js";
import { StudentSortKeysType } from "./config.js";
import { returnSortedList } from "./ui/sortStudentList.js";

const listContainer = getRequiredElement<HTMLUListElement>("#student-list");
const frmAddUser = getRequiredElement<HTMLFormElement>("form.add-user-form");
const inputName = getRequiredElement<HTMLInputElement>("#name", frmAddUser);
const inputAge = getRequiredElement<HTMLInputElement>("#age", frmAddUser);
const cbIsActive = getRequiredElement<HTMLInputElement>("#isActive", frmAddUser);
const select = getRequiredElement<HTMLSelectElement>("#sort-areas")
const frmSort = getRequiredElement<HTMLFormElement>("form#sort-form");

addSortAreas();
checkIfDataIsInitialized();
loadStudentList();

function addSortAreas() {
    type selectOpt = { value: string; text: string; };
    let options: selectOpt[] = [{ value: "name", text: "Name" }, { value: "age", "text": "Age", }, { value: "isActive", text: "Is Active" }];
    let items = options.map(i => {
        const option = document.createElement("option");
        option.value = i.value;
        option.text = i.text;
        return option;
    });
    select.replaceChildren(...[select.children[0]!, ...items]);
}

function loadStudentList() {
    const students = load();
    if (!students)
        return;
    renderStudentList(students);
}

function renderStudentList(students: Student[]): void {
    listContainer.textContent = "";
    // Placeholder array
    students.forEach((item) => listContainer.appendChild(createStudentListItem(item)));
    if (students.length > 0)
        return;
    const item = document.createElement("li");
    item.textContent = "Listan är tom...";
    listContainer.appendChild(item);
}


frmSort.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(frmSort);
    const area = data.get("areas") as StudentSortKeysType;
    const order = data.get("order")?.toString();
    if (!order)
        return;
    const sortedStudentList = returnSortedList(area, order)
    renderStudentList(sortedStudentList!);
})

frmAddUser.addEventListener("submit", (e) => {
    e.preventDefault();
    const age = Number(inputAge.value?.trim());
    const student: Student = {
        id: generateId(undefined, load()),
        name: inputName.value?.trim(),
        age: Number.isInteger(age) ? Number(age) : age,
        isActive: cbIsActive.checked
    };

    student.name && student.age && Number.isInteger(student.age) && createStudent(student) && loadStudentList();
});