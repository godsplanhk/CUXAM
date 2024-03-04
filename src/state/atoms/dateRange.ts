import { DateRange } from "react-day-picker";
import { atom } from "recoil";
import { addDays } from 'date-fns';

export const datesState = atom<Date[]| undefined>({
  key: "days",
  default: [
    new Date(),
  ],
});

