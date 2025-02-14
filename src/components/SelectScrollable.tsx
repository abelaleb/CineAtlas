import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

interface SelectScrollableProps {
  placeholder: string;
  options: SelectOption[];
  onValueChange: (value: string) => void;
}

const SelectScrollable = ({
  placeholder,
  options,
  onValueChange,
}: SelectScrollableProps) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="flex items-center gap-2"
            >
              <div className="flex gap-2">
                {option.label}
                {option.icon && (
                  <img
                    src={option.icon}
                    alt={option.label}
                    className="w-5 h-5"
                  />
                )}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectScrollable;
