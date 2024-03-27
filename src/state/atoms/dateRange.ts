import { atom } from "recoil";

export const datesState = atom<Date[]| undefined>({
  key: "days",
  default: [
    new Date(),
  ],
});
