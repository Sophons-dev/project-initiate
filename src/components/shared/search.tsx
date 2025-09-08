import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  return (
    <motion.div
      className='flex-1 relative w-full md:max-w-md'
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
      <Input
        placeholder={placeholder ?? 'Search...'}
        className='pl-10 w-full h-[45px] border border-gray-200 bg-slate-50'
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </motion.div>
  );
};
