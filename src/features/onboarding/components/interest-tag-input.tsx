'use client';

import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InterestTagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function InterestTagInput({
  value,
  onChange,
  placeholder,
}: InterestTagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim() !== '') {
      e.preventDefault();
      const newTag = inputValue.trim();

      if (newTag.length < 2) {
        setError('Tag must be at least 2 characters long');
        return;
      }

      if (newTag.length > 20) {
        setError('Tag must be less than 20 characters long');
        return;
      }

      if (value.includes(newTag)) {
        setError('Tag already exists');
        return;
      }

      if (
        newTag.length >= 2 &&
        newTag.length <= 20 &&
        !value.includes(newTag)
      ) {
        onChange([...value, newTag]);
      }

      setInputValue('');
    }

    if (e.key === 'Backspace' && inputValue === '') {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (tag: string) => {
    onChange(value.filter(t => t !== tag));
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className='w-full'>
      <div className='flex flex-wrap items-center gap-2 border rounded px-3 py-2 bg-gray-100 focus-within:ring-2 focus-within:ring-cyan-500'>
        <AnimatePresence>
          {value.map(tag => (
            <motion.span
              key={tag}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='flex items-center gap-1 bg-cyan-100 text-cyan-800 px-2 py-1 rounded-md text-sm border border-cyan-500'
            >
              {tag}
              <button
                type='button'
                onClick={() => removeTag(tag)}
                className='text-cyan-600 hover:text-cyan-800'
              >
                <X size={14} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>

        <input
          type='text'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className='flex-1 bg-transparent outline-none text-sm'
        />

        {value.length > 0 && (
          <button
            type='button'
            onClick={clearAll}
            className='ml-auto text-xs text-red-500 hover:text-red-700'
          >
            Clear all
          </button>
        )}
      </div>

      {error && <p className='mt-1.5 text-xs text-red-500'>{error}</p>}

      <p className='mt-1.5 text-xs text-gray-500'>
        💡 Interests can be separated by pressing{' '}
        <kbd className='px-1 py-0.5 bg-gray-200 rounded'>Enter</kbd> or{' '}
        <kbd className='px-1 py-0.5 bg-gray-200 rounded'>,</kbd>
      </p>
    </div>
  );
}
