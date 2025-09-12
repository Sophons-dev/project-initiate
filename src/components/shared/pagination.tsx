'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationMeta } from '@/features/opportunities/types/pagination';

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({ meta, onPageChange, className = '' }: PaginationProps) => {
  const { page, totalPages, hasNextPage, hasPreviousPage, total } = meta;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (page > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push('...');
      }

      // Show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className='text-sm text-gray-700'>
        Showing {(page - 1) * meta.limit + 1} to {Math.min(page * meta.limit, total)} of {total} results
      </div>

      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPreviousPage}
          className='flex items-center gap-1'
        >
          <ChevronLeft className='h-4 w-4' />
          Previous
        </Button>

        <div className='flex items-center space-x-1'>
          {getPageNumbers().map((pageNum, index) => (
            <div key={index}>
              {pageNum === '...' ? (
                <span className='px-3 py-2 text-gray-500'>...</span>
              ) : (
                <Button
                  variant={pageNum === page ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => onPageChange(pageNum as number)}
                  className={`min-w-[40px] ${pageNum === page ? 'bg-cyan-500 hover:bg-cyan-600' : ''}`}
                >
                  {pageNum}
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          className='flex items-center gap-1'
        >
          Next
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};
