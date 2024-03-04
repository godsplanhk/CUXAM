import { labsList } from "@/data/labs";
import { rooms } from "@/types/rooms";
import { atom } from "recoil";

export const labsState = atom<rooms[]>({
    key: "labs",
    default: [...labsList.data]
})

