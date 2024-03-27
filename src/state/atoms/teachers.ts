import axios from "axios";
import { atom, selector } from "recoil";

export type TeacherProp={
    Ecode: string
    Tname: string
    internal: {course:{Cname:string}}[]
    tags: string[]
}

export const teachersSelector = selector({
    key: 'teacher',
    get: async ()=>{
        const res = (await axios.get<TeacherProp[]>("https://cuxam.azurewebsites.net/api/v1/data/teachers"));
        res.data.forEach(ele=>{
            ele.tags = [... new Set(ele.internal.map(i=>i.course.Cname))]
        })
        return res.data;
    }
});

export const selectedTeacherState = atom({
    key: "selectedTeacher",
    default: {}
});