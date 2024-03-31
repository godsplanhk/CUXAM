// import { labsList } from "@/data/labs";
import { atom, selector } from "recoil";
import api from "../../utils/axiosInstance.js";

export const labsState = selector({
    key: "labs",
    get : async ()=>{
        const res = await api('data/rooms');
        return res.data;
    }
})

export const selectedLabsState = atom<[]>({
    key: "selectedRooms",
    default: []
})
