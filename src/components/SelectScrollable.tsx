
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
interface selectOptions{
    value: string;
    label: string;
}
interface selectScrollableProps{
    placeholder: string;
    options: selectOptions[];
}
const SelectScrollable = ({ placeholder, options }:selectScrollableProps) => {
  return (
    <Select>
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
