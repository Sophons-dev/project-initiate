'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  focus: string;
  badge?: string;
  image: string;
};

export default function EventsCarousel({ items }: { items: EventItem[] }) {
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(160);

  useEffect(() => {
    const set = () => setOffset(window.innerWidth >= 768 ? 280 : 160);
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  const n = items.length;
  const current = ((index % n) + n) % n;
  const left = (current - 1 + n) % n;
  const right = (current + 1) % n;

  const trio = useMemo(() => [left, current, right], [left, current, right]);
  const go = (dir: number) => setIndex(i => i + dir);

  const positions = {
    '-1': {
      x: -offset,
      scale: 0.9,
      opacity: 0.8,
      zIndex: 1,
      filter: 'blur(2px)',
    },
    '0': { x: 0, scale: 1.05, opacity: 1, zIndex: 3, filter: 'blur(0px)' },
    '1': {
      x: offset,
      scale: 0.9,
      opacity: 0.8,
      zIndex: 2,
      filter: 'blur(2px)',
    },
  } as const;

  return (
    <div className='relative mx-auto h-[850px] lg:h-[1000px] xl:h-[950px] max-w-7xl overflow-hidden'>
      {/* Controls */}
      <div className='pointer-events-none absolute inset-y-0 left-0 top-1/2 -translate-y-1/2 right-0 z-40 flex items-center justify-between px-2 md:px-4'>
        <Button
          aria-label='Previous event'
          className='pointer-events-auto h-10 w-10 rounded-full bg-orange-500 text-white hover:bg-orange-600'
          onClick={() => go(-1)}
        >
          <ChevronLeft className='h-5 w-5' />
        </Button>
        <Button
          aria-label='Next event'
          className='pointer-events-auto h-10 w-10 rounded-full bg-orange-500 text-white hover:bg-orange-600'
          onClick={() => go(1)}
        >
          <ChevronRight className='h-5 w-5' />
        </Button>
      </div>

      {/* Stage */}
      <div className='absolute left-1/2 top-0 mt-10 z-10 h-full w-full -translate-x-1/2'>
        <AnimatePresence initial={false}>
          {trio.map(idx => {
            const pos = idx === current ? '0' : idx === left ? '-1' : '1';
            const item = items[idx];
            const key = `item-${item.id}-${pos}`;
            const conf = positions[pos as '-1' | '0' | '1'];

            return (
              <motion.div
                key={key}
                className='absolute left-1/2 top-4 -translate-x-1/2'
                initial={{ x: 0, scale: 0.95, opacity: 0 }}
                animate={conf}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{ zIndex: conf.zIndex }}
                aria-hidden={pos !== '0'}
                whileHover={pos === '0' ? { scale: 1.07 } : undefined}
              >
                <Card className='w-[320px] sm:w-[500px] pt-0 overflow-hidden rounded-xl border lg:w-[550px]'>
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.title}
                    width={480}
                    height={640}
                    className='h-[380px] w-full object-cover lg:h-[620px]'
                  />
                  <CardContent className='p-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {/* Event date */}
                      <div className='flex flex-row items-center gap-2'>
                        <div className='flex items-center gap-2 bg-orange-50 rounded-lg w-fit p-2'>
                          <Calendar className='w-5 h-5 text-orange-500' />
                        </div>
                        <span className='flex flex-col'>
                          <div className='text-xs text-muted-foreground'>Event Date</div>
                          <div className='text-xs font-medium line-clamp-1'>{item.date}</div>
                        </span>
                      </div>

                      {/* Event location */}
                      <div className='flex flex-row items-center gap-2'>
                        <div className='flex items-center gap-2 bg-blue-50 rounded-lg w-fit p-2'>
                          <MapPin className='w-5 h-5 text-blue-500' />
                        </div>
                        <span className='flex flex-col'>
                          <div className='text-xs text-muted-foreground'>Venue</div>
                          <div className='text-xs font-medium line-clamp-1'>{item.location}</div>
                        </span>
                      </div>

                      {/* Event focus */}
                      <div className='flex flex-row items-center gap-2'>
                        <div className='flex items-center gap-2 bg-red-50 rounded-lg w-fit p-2'>
                          <Target className='w-5 h-5 text-red-500' />
                        </div>
                        <span className='flex flex-col'>
                          <div className='text-xs text-muted-foreground'>Focus</div>
                          <div className='text-xs font-medium line-clamp-1'>{item.focus}</div>
                        </span>
                      </div>
                    </div>

                    <Separator className='my-5' />

                    <div className='flex flex-col md:flex-row gap-3 items-center justify-center w-full'>
                      <div className='flex flex-col md:flex-row gap-3 items-center justify-center w-full'>
                        <div className='text-xs text-center md:text-left w-full md:w-2/3'>
                          <p className='font-medium'>Ready to shape your future?</p>
                          <p className='text-muted-foreground'>
                            Register now and be part of this transformative experience.
                          </p>
                        </div>

                        <div className='flex flex-col md:flex-row gap-3 items-center justify-end md:w-1/2'>
                          <Link className='text-xs' href={'/sign-in'}>
                            Learn More
                          </Link>
                          <Button
                            asChild
                            size={'sm'}
                            className='text-xs bg-yellow-500 rounded-full hover:bg-yellow-600'
                          >
                            <Link href='/sign-up'>Register Now</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className='absolute bottom-0 left-1/2 z-50 flex -translate-x-1/2 gap-2'>
        {items.map((_, i) => {
          const active = i === current;
          return (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition cursor-pointer ${active ? 'w-6 bg-orange-500' : 'w-2.5 bg-slate-300'}`}
            />
          );
        })}
      </div>
    </div>
  );
}
