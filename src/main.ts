
import { getRequiredElement } from "./utils/domHelpers.js";
import { checkIfDataIsInitialized} from "./services/student.js";
import { createStudentListItem } from "./ui/createStudentListItem.js";
import { load } from "./data/student.js";

const listContainer = getRequiredElement("#student-ul") as HTMLUListElement;

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
