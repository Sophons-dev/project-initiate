import { motion } from "framer-motion";

interface TextPillProps {
    icon?: React.ReactNode;
    text: string;
}

export const TextPill = ({ icon, text }: TextPillProps) => {
    return (
        <motion.div className="text-sm flex w-fit mx-auto my-4 px-3 py-1 rounded-full items-center gap-1 bg-cyan-100 text-cyan-500" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {icon && icon}
            {text}
        </motion.div>
    )
}