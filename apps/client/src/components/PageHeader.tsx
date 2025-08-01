import { Search } from "lucide-react";

interface PageHeaderProps {
  heading: string;
}

export default function PageHeader({heading}: PageHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center w-full px-4">
        <h1 className="py-2 font-semibold">{heading}</h1>
        <Search size={16} />
      </div>
    </>
  )
}
