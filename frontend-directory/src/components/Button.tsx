'use client';

import { motion } from 'framer-motion';

interface ButtonProps {
  text: string;
  onClick: () => void;
  fillContainer: boolean;
  invert?: boolean;
}

// Create a motion-enabled button element
const MotionButton = motion.button;

export default function Button({
  text,
  onClick,
  fillContainer,
  invert = false,
}: ButtonProps) {
  return (
    <MotionButton
      onClick={onClick}
      className={`
        flex items-center justify-center
        ${invert ? 'bg-white text-black' : 'bg-black text-white'}
        rounded-[8px] py-[4px] px-[8px]
        ${fillContainer ? 'w-full' : 'w-fill'}
        focus:outline-none
      `}
      // Animate to 1.05× on hover
      whileHover={{ scale: 1.05, boxShadow: '0px 4px 10px rgba(0,0,0,0.15)' }}
      // Shrink down a bit on tap/click
      whileTap={{ scale: 0.95 }}
      // Subtle focus animation
      whileFocus={{ scale: 1.02 }}
      // Use a spring for all interactions
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
    >
      {text}
    </MotionButton>
  );
}
