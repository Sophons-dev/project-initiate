import { useMemo, useState } from 'react';

type FilterOption<T> = {
  label: string;
  predicate: (item: T) => boolean;
};

export function useFilter<T>(data: T[], filters: FilterOption<T>[]) {
  const [activeFilter, setActiveFilter] = useState(filters[0]?.label ?? '');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const filter = filters.find(f => f.label === activeFilter);
      const matchesFilter = filter ? filter.predicate(item) : true;

      const matchesSearch =
        searchQuery === '' ||
        JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [data, activeFilter, searchQuery, filters]);

  return {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    filteredData,
  };
}
