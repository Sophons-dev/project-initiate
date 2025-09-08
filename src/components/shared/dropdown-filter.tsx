import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DropdownFilterProps {
  filters: { label: string; value: string }[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const DropdownFilter = ({ filters, activeFilter, setActiveFilter }: DropdownFilterProps) => {
  return (
    <Select onValueChange={setActiveFilter} value={activeFilter}>
      <SelectTrigger className='w-[180px] bg-white'>
        <SelectValue placeholder='All Organizations' />
      </SelectTrigger>
      <SelectContent>
        {filters.map(filter => (
          <SelectItem key={filter.value} value={filter.value}>
            {filter.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
