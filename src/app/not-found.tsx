import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4'>
      <Card className='w-full max-w-md text-center'>
        <CardHeader>
          <CardTitle className='text-6xl font-bold text-cyan-500'>404</CardTitle>
          <CardDescription className='text-xl text-gray-600'>Page Not Found</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-gray-500'>
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or you
            entered the wrong URL.
          </p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <Button asChild className='bg-cyan-500 hover:bg-cyan-600'>
              <Link href='/'>Go Home</Link>
            </Button>
            <Button variant='outline' asChild>
              <Link href='/opportunities'>Browse Opportunities</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
