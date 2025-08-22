import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TextPillProps {
  icon?: React.ReactNode;
  text: string;
  className?: string;
}

export const TextPill = ({ icon, text, className }: TextPillProps) => {
  return (
    <motion.div
      className={cn(
        'text-xs md:text-sm flex w-fit mx-auto my-4 px-3 py-1 rounded-full items-center gap-1 bg-[#18AABE]/10 text-cyan-500',
        className,
      )}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}>
      {icon && icon}
      {text}
    </motion.div>
  );
};
