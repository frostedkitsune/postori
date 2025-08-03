import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle({ themes }) {
  const { setTheme } = useTheme()

  return (

    <>
      <RadioGroup defaultValue="system" className={`grid ${themes.length <= 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
        {themes.map((theme: any) => {
          return (
            <div className="border border-primary rounded-lg relative overflow-hidden">
              <label className="" htmlFor={theme.name}>
                <div className="min-w-40 min-h-30 p-2 bg-primary-foreground">
                  <h1 className="capitalize text-sm font-semibold">{theme.name}</h1>
                </div>
              </label>
              <RadioGroupItem className="absolute left-2 bottom-2" onClick={() => setTheme(theme.name)} value={theme.name} id={theme.name} />
            </div>
          )
        })}
      </RadioGroup>
    </>
  )
}
