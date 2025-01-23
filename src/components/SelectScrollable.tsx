import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface selectOptions {
  value: string;
  label: string;
}

interface selectScrollableProps {
  placeholder: string;
  options: selectOptions[];
  onValueChange: (value: string) => void;
}

const SelectScrollable = ({
  placeholder,
  options,
  onValueChange,
}: selectScrollableProps) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectScrollable;
