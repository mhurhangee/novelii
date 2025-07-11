import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import type { aiSettings } from '../editor'

type Option = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

type SelectorProps = {
    value: string
    onChange: (val: string, field: keyof aiSettings) => void
    options: Option[]
    label?: string
    field: keyof aiSettings
  }
  
  export function GenericSelector({ value, onChange, options, field, label }: SelectorProps) {
    const selected = options.find(opt => opt.value === value);
  
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2 border-none">
            {selected?.icon && <selected.icon className="size-4" />}
            <span className="text-sm">
              {selected ? selected.label : label}
            </span>
            <ChevronDownIcon className="size-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-1" align="start">
          {options.map(opt => (
            <div
              key={opt.value}
              className="flex cursor-pointer items-center rounded px-2 py-1.5 text-xs hover:bg-accent"
              onClick={() => onChange(opt.value, field)}
            >
              {opt.icon && <opt.icon className="mr-2 size-4" />}
              <span>{opt.label}</span>
              <div className="flex-1" />
              {value === opt.value && <CheckIcon className="ms-2 size-4" />}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    );
  }
  
