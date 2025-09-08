import { motion } from 'framer-motion';

interface TabFilterProps {
  filters: { label: string; value: string }[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filterColors?: Record<string, string>;
}

export const TabFilter = ({ filters, activeFilter, setActiveFilter, filterColors = {} }: TabFilterProps) => (
  <div className='relative rounded-lg h-fit p-1.5 bg-slate-50'>
    <div className='flex space-x-1'>
      {filters.map(filter => (
        <motion.button
          key={filter.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveFilter(filter.value)}
          className={`flex flex-row items-center gap-x-2 whitespace-nowrap cursor-pointer px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
            activeFilter === filter.value
              ? 'bg-white shadow-xs'
              : 'border-transparent text-gray-600 hover:bg-white/50 hover:border-gray-200'
          }`}
        >
          {filter.value in filterColors && <div className={`h-2 w-2 rounded-full ${filterColors[filter.value]}`} />}
          {filter.label}
        </motion.button>
      ))}
    </div>
  </div>
);
