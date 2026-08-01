"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format, subDays } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { TInsightDateType } from "@/types"

type RangeType = TInsightDateType | null

export function DatePicker({
  date,
  setDate,
  range = null,
}: {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date | null>>
  range?: RangeType
}) {
  const [open, setOpen] = React.useState(false)
  const [tempDate, setTempDate] = React.useState<Date>(date)

  React.useEffect(() => {
    setTempDate(date)
  }, [date])

  const computedRange = React.useMemo(() => {
    if (!range) return undefined

    if (range === "weekly") {
      return {
        from: subDays(tempDate, 6),
        to: tempDate,
      }
    }

    if (range === "monthly") {
      return {
        from: subDays(tempDate, 29),
        to: tempDate,
      }
    }
  }, [tempDate, range])

  const handleApply = () => {
    setDate(tempDate)
    setOpen(false)
  }

  const handleCancel = () => {
    setTempDate(date)
    setOpen(false)
  }
  const handleReset = () => {
    setDate(null)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[212px] justify-between text-left font-normal"
        >
          {format(date, "PPP")}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-3" align="start">
        {range ? (

          <Calendar
            mode="single"
            selected={date}
            onSelect={(val) => {
              if (!val) return
              setTempDate(val)
            }}
            defaultMonth={date}
            disabled={{ after: new Date() }}
            modifiers={{
              range: computedRange,
            }}
            modifiersClassNames={{
              range: "bg-accent",

            }}
          />
        ) : (
          <Calendar
            mode="single"
            selected={tempDate}
            onSelect={(val) => {
              if (val) setTempDate(val)
            }}
            defaultMonth={tempDate}
            disabled={{ after: new Date() }}
          />
        )}

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="sm" variant={'outline'} onClick={handleApply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}