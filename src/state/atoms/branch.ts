import { atom, selector } from "recoil"
import { Batch } from "./batch"
import api from "@/utils/axiosInstance"

export type Branch={
    id: string,
    batches: Batch[]
}

export const branchState = selector<Branch[]>({
    key: 'branches',
    get: async ()=>{
        const res = await api.get('/data/branches');
        return res.data;
    }
})

export const selectedBranchState = atom<[]>({
    key: 'selectedBranch',
    default: []
})