"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from '../../lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement>{
  days: Date[]|undefined,
  setDays: React.Dispatch<React.SetStateAction<Date[] | undefined>>
}
export function DatePickerWithRange({
  className,days,setDays
}: DatePickerWithRangeProps) {
  console.log(days);
  const footer =
  days && days.length > 0 ? (
    <p>You selected {days.length} day(s).</p>
  ) : (
    <p>Please pick one or more days.</p>
  );
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-auto justify-center text-left font-normal",
              !days && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <>
              {days && days.length > 0 ? (
                days[days.length - 1] ? (
                  <>
                    {format(days[0], "LLL dd, y")} -{" "}
                    {format(days[days.length - 1], "LLL dd, y")}
                  </>
                ) : (
                  format(days[0], "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="multiple"
            min={3}
            selected={days}
            onSelect={(days)=>{
              days?.sort((a,b)=>a.getTime()-b.getTime());
              setDays(days);
            }}
            footer={footer}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
