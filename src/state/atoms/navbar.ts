import { atom } from "recoil";

export const GenerateNavbarState = atom({
    key: "generateNavbar",
    default: {scheduled: 0,unscheduled: 0,fitness: 0}
});