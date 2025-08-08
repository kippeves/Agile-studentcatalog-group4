import { StudentSortKeysType } from "../config.js";
import { load } from "../data/student.js";

export function returnSortedList(keys: StudentSortKeysType, order: string) {
    const list = load();
    if (!list)
        return;

    return list.sort((a, b) => {
        switch (keys) {
            case "name":
                if (order === "asc")
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
            case "age":
                if (order === "asc")
                    return a.age < b.age ? -1 : a.age > b.age ? 1 : 0;
                return a.age > b.age ? -1 : a.age < b.age ? 1 : 0
            case "isActive":
                if (order === "asc")
                    return a.isActive < b.isActive ? -1 : a.isActive > b.isActive ? 1 : 0;
                return a.isActive > b.isActive ? -1 : a.isActive < b.isActive ? 1 : 0
        }
    })
}