"use client";

import React, { useRef, useLayoutEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts: string[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

// --- Hooks ---
/**
 * Calculates the width of an element and updates on resize.
 * Defined outside to prevent re-creation on render.
 */
function useElementWidth(ref: React.RefObject<HTMLElement | null>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    // Initial measure
    updateWidth();
    
    // Resize listener
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

// --- Child Component ---
/**
 * VelocityText must be defined OUTSIDE the parent component.
 * If defined inside, React creates a new component instance on every render,
 * violating hook rules and causing the "executed more than once" error.
 */
const VelocityText = ({
  children,
  baseVelocity,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
  scrollContainerRef,
}: VelocityTextProps) => {
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping ?? 50,
    stiffness: stiffness ?? 400,
  });

  // Stabilize args to ensure useTransform is always called with the same structure
  const velocityInput = velocityMapping?.input || [0, 1000];
  const velocityOutput = velocityMapping?.output || [0, 5];

  const velocityFactor = useTransform(
    smoothVelocity,
    velocityInput,
    velocityOutput,
    { clamp: false }
  );

  // Example: This is the useRef line that was erroring (Line 101 in original)
  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  function wrap(min: number, max: number, v: number): number {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return '0px';
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  const directionFactor = useRef<number>(1);
  
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Dynamic direction change based on scroll direction
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={cn(parallaxClassName, 'relative overflow-hidden whitespace-nowrap')}
      style={parallaxStyle}
    >
      <motion.div
        className={cn(scrollerClassName, 'flex whitespace-nowrap text-center')}
        style={{ x, ...scrollerStyle }}
      >
        {/* Generate copies for the infinite loop effect */}
        {Array.from({ length: numCopies }).map((_, i) => (
          <span
            className={cn('flex-shrink-0', className)}
            key={i}
            ref={i === 0 ? copyRef : null}
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// --- Main Component ---
export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) => {
  return (
    <section>
      {texts.map((text: string, index: number) => (
        <VelocityText
          key={index}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          className={className}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
          scrollContainerRef={scrollContainerRef}
        >
          {text}&nbsp;
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;