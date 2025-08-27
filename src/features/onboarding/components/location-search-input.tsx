'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Suggestion } from '../types/school-search';
import { fetchLocationSuggestions } from '../actions/location-search';

export function LocationSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);

      const results = await fetchLocationSuggestions(query);
      console.log(results);

      if (isMounted) setSuggestions(results);

      setLoading(false);
    }, 400);

    return () => {
      isMounted = false;
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className='relative  justify-between h-12 bg-gray-100 border-1 focus:bg-white focus:ring-2 focus:ring-cyan-500'
        >
          <p className='w-60 lg:w-85 font-normal text-[16px] text-left truncate'>
            {value || 'Select or search school'}
          </p>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[var(--radix-popover-trigger-width)] max-w-[90vw] p-0  '>
        <Command shouldFilter={false} className='w-full'>
          <CommandInput
            placeholder='Search school...'
            onValueChange={val => setQuery(val)}
            className='w-full'
          />
          <CommandList>
            <CommandEmpty>
              {loading ? 'Loading...' : 'No results found'}
            </CommandEmpty>
            <CommandGroup>
              {suggestions.map((s, idx) => (
                <CommandItem
                  key={idx}
                  value={s.display_name}
                  onSelect={() => {
                    onChange(s.display_name);
                    setOpen(false);
                  }}
                >
                  {'isCustom' in s ? `Use "${s.display_name}"` : s.display_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
