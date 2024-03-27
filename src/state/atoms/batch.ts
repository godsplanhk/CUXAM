import { atom, selector } from 'recoil';
import axios from 'axios';
export const batchState = selector({
key: "batches",
get: async()=>{
    const res = await axios.get("https://cuxam.azurewebsites.net/api/v1/data/batches");
    console.log(res.data);
    return res.data;
}
})

export const selectedBatchState = atom({
    key: "selectedBatch",
    default: {}
});