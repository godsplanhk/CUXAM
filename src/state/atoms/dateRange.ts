import { addDays, eachDayOfInterval } from "date-fns";
import { atom } from "recoil";

export const datesState = atom<Date[]| undefined>({
  key: "days",
  default: eachDayOfInterval({start:new Date(),end:addDays(new Date(),3)}),
});
