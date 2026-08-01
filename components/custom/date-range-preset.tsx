import { NextPage } from "next"
import dayjs from "dayjs"
import { DateRange } from "react-day-picker"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  date: DateRange | null
  setDate: Dispatch<SetStateAction<DateRange | null>>
  className?: string
}

const presets = [
  { label: "Semua", value: "all" },
  { label: "Hari Ini", value: "today" },
  { label: "7 Hari Terakhir", value: "7days" },
  { label: "14 Hari Terakhir", value: "14days" },
  { label: "30 Hari Terakhir", value: "30days" },
  { label: "3 Bulan Terakhir", value: "3months" },
  { label: "6 Bulan Terakhir", value: "6months" },
  { label: "Tahun Ini", value: "thisYear" },
  { label: "Tahun Lalu", value: "lastYear" },
]

const DateRangePreset: NextPage<Props> = ({ date, setDate, className }) => {
  const [selected, setSelected] = useState<string>("")



  const handleSelect = (value: string) => {
    setSelected(value)

    const now = dayjs()
    let start: dayjs.Dayjs
    let end: dayjs.Dayjs = now

    switch (value) {
      case "all":
        setDate(null)
        return
        break
      case "today":
        start = now.startOf("day")
        end = now.endOf("day")
        break
      case "7days":
        start = now.subtract(6, "day").startOf("day")
        end = now.endOf("day")
        break
      case "14days":
        start = now.subtract(13, "day").startOf("day")
        end = now.endOf("day")
        break
      case "30days":
        start = now.subtract(29, "day").startOf("day")
        end = now.endOf("day")
        break
      case "3months":
        start = now.subtract(3, "month").startOf("month")
        end = now.endOf("month")
        break
      case "6months":
        start = now.subtract(6, "month").startOf("month")
        end = now.endOf("month")
        break
      case "thisYear":
        start = now.startOf("year")
        end = now.endOf("year")
        break
      case "lastYear":
        const lastYear = now.subtract(1, "year")
        start = lastYear.startOf("year")
        end = now.endOf("year")
        break
      case "":
        setDate(null)
        return
        break
      default:
        start = now.startOf("day")
        end = now.endOf("day")
    }

    setDate({ from: start.toDate(), to: end.toDate() })
  }

  // ✅ Automatically detect preset based on the passed `date` prop
  useEffect(() => {
    if (!date?.from || !date?.to) {
      handleSelect("");
      return
    }

    const from = dayjs(date.from)
    const to = dayjs(date.to)
    const diffDays = to.diff(from, "day") + 1
    const now = dayjs()
    if (from.isSame(now.startOf("day"), "day") && to.isSame(now.endOf("day"), "day")) {

      setSelected("today")
    } else if (diffDays === 7) {

      setSelected("7days")
    } else if (diffDays === 14) {

      setSelected("14days")
    } else if (diffDays === 30) {

      setSelected("30days")
    } else if (from.isSame(now.startOf("year"), "day") && to.isSame(now.endOf("year"), "day")) {

      setSelected("thisYear")
    } else if (
      from.isSame(now.subtract(1, "year").startOf("year"), "day") &&
      to.isSame(now.subtract(1, "year").endOf("year"), "day")
    ) {

      setSelected("lastYear")
    } else {


      setSelected("") // Custom or non-preset range
    }
  }, [date])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("flex items-center gap-2", className)}>
          <CalendarDays className="h-4 w-4" />
          <span>
            {presets.find((p) => p.value === selected)?.label || "Periode"}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="z-[9999] w-56">
        <DropdownMenuLabel>Pilih Rentang Tanggal</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {presets.map(({ label, value }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleSelect(value)}
            className={`cursor-pointer ${selected === value
              ? "bg-blue-50 text-blue-600 dark:bg-blue-600/20"
              : ""
              }`}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DateRangePreset
