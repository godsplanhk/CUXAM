// import { labsList } from "@/data/labs";
import { atom, selector } from "recoil";
import axios from 'axios';

export const labsState = selector({
    key: "labs",
    get : async ()=>{
        const res = await axios('https://cuxam.azurewebsites.net/api/v1/data/rooms');
        return res.data;
    }
})

export const selectedLabsState = atom({
    key: "selectedRooms",
    default: {}
})
