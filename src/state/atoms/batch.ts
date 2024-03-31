import { atom, selector } from 'recoil';
import api from "../../utils/axiosInstance.js";

export type Batch={
    id: string
    branch: string
    semester: string
    BEME: string
}

export const batchState = selector({
key: "batches",
get: async()=>{
    const res = await api.get("data/batches");
    console.log(res.data);
    return res.data;
}
})

export const selectedBatchState = atom<[]>({
    key: "selectedBatch",
    default: []
});