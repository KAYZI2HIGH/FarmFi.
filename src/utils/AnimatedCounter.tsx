"use client"; // Required for Next.js 13+ since we're using hooks

import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { CountUp } from "countup.js";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter = ({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const countUpRef = useRef<CountUp | null>(null);
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  useEffect(() => {
    if (counterRef.current) {
      countUpRef.current = new CountUp(counterRef.current, end, {
        duration,
        prefix,
        suffix,
      });
    }
  }, [end, duration, prefix, suffix]);

  useEffect(() => {
    if (inView && countUpRef.current && !countUpRef.current.error) {
      countUpRef.current.start();
    }
  }, [inView]);

  const setRefs = (node: HTMLSpanElement) => {
    counterRef.current = node;
    inViewRef(node);
  };

  return (
    <span
      ref={setRefs}
      className={className}
    >
      0
    </span>
  );
};
