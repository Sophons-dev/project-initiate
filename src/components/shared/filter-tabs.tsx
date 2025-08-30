import { motion } from 'framer-motion';

interface FilterTabsProps {
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filterColors?: Record<string, string>;
}

export const FilterTabs = ({
  filters,
  activeFilter,
  setActiveFilter,
  filterColors = {},
}: FilterTabsProps) => (
  <div className='relative rounded-lg h-fit p-1.5 bg-[#E9E9E9]/50'>
    <div className='flex space-x-1 overflow-x-auto md:overflow-hidden hide-scrollbar'>
      {filters.map(filter => (
        <motion.button
          key={filter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveFilter(filter)}
          className={`flex flex-row items-center gap-x-2 whitespace-nowrap cursor-pointer px-4 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
            activeFilter === filter
              ? 'bg-white shadow-sm'
              : 'border-transparent text-gray-600 hover:bg-white/50 hover:border-gray-200'
          }`}
        >
          {filter in filterColors && (
            <div className={`h-2 w-2 rounded-full ${filterColors[filter]}`} />
          )}
          {filter}
        </motion.button>
      ))}
    </div>
    <div className='absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#E9E9E9] to-transparent pointer-events-none' />
  </div>
);
