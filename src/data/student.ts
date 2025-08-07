import { Student } from "../models/student.js";
import { storage } from "../utils/storage.js";
export const { load: loadStudents, save: saveStudents } = storage<Student[]>("roster");

/*
const Students: Student[] = 
*/

export const getStudents = () => loadStudents();

export const deleteStudent = (id: number) => {
    const studentList = loadStudents();
    const studentToRemove = studentList?.find(x => x.id === Number(id));
    if(!(studentList && studentToRemove))
        return;
    saveStudents({ data: studentList.splice(studentList.indexOf(studentToRemove), 1) })
}