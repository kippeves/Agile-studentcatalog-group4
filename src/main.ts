
import { getRequiredElement } from "./utils/domHelpers.js";
import { checkIfDataIsInitialized} from "./services/student.js";
import { createStudentListItem } from "./ui/createStudentListItem.js";
import { load } from "./data/student.js";

const listContainer = getRequiredElement<HTMLUListElement>("#student-list");
const frmAddUser = getRequiredElement<HTMLFormElement>("form.add-user-form");
const inputName = getRequiredElement<HTMLInputElement>("#name", frmAddUser);
const inputAge = getRequiredElement<HTMLInputElement>("#age", frmAddUser);
const cbIsActive = getRequiredElement<HTMLInputElement>("#isActive", frmAddUser);
const btnAddUser = getRequiredElement<HTMLButtonElement>("button", frmAddUser);

checkIfDataIsInitialized();
renderStudentList();

function renderStudentList(): void {
    listContainer.textContent = "";
    // Placeholder array
    const students = load();
    if (!students)
        return;
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