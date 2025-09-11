import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full mx-auto'>
        <Card className='text-center'>
          <CardHeader>
            <div className='mx-auto mb-4 h-16 w-16 rounded-full bg-red-100 flex items-center justify-center'>
              <svg
                className='h-8 w-8 text-red-600'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                />
              </svg>
            </div>
            <CardTitle className='text-2xl font-bold text-gray-900'>Opportunity Not Found</CardTitle>
            <CardDescription className='text-gray-600'>
              The opportunity you&apos;re looking for doesn&apos;t exist or may have been removed.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-sm text-gray-500'>This could happen if:</p>
            <ul className='text-sm text-gray-500 text-left space-y-1'>
              <li>• The opportunity ID is incorrect</li>
              <li>• The opportunity has been deleted</li>
              <li>• You don&apos;t have permission to view this opportunity</li>
            </ul>
            <div className='flex flex-col sm:flex-row gap-3 pt-4'>
              <Button asChild className='flex-1'>
                <Link href='/opportunities'>Browse Opportunities</Link>
              </Button>
              <Button variant='outline' asChild className='flex-1'>
                <Link href='/dashboard'>Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
