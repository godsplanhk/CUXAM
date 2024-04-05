import { atom, selector } from "recoil";
import { Branch, selectedBranchState } from "./branch.js";

export type Batch = {
  id: string;
  branch: string;
  semester: number;
  BEME: string;
};

export const batchState = atom({
  key: "batches",
  default: []
  },
);

export const selectedBatchState = selector<Batch[]>({
  key: "selectedBatch",
  get: ({ get }) => {
    const branches = get(selectedBranchState) as Branch[];
    let batches: Batch[] = [];
    branches.forEach((branch) => {
      batches = batches.concat(branch.batches);
    });
    return batches;
  },
});
