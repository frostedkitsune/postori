import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDateFormat() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Date Format" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
        <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
      </SelectContent>
    </Select>
  )
}
export function SelectTimeFormat() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Time Format" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="12-hour">12-Hour Format</SelectItem>
        <SelectItem value="24-hour">24-Hour Format</SelectItem>
        <SelectItem value="auto">Automatic</SelectItem>
      </SelectContent>
    </Select>
  )
}
export function SelectFontFamily() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Font Family" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="sans-serif">Sans Serif</SelectItem>
        <SelectItem value="serif">Serif</SelectItem>
        <SelectItem value="monospace">Monospace</SelectItem>
      </SelectContent>
    </Select>
  )
}

