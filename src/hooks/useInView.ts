'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

export function useInView(
  ref: RefObject<Element | null>,
  threshold = 0.1,
  rootMargin = '0px 0px -10% 0px'
): boolean {
  const [isInView, setIsInView] = useState(false);
  // Keep rootMargin in a ref so it never changes deps array size
  const rootMarginRef = useRef(rootMargin);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: rootMarginRef.current }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isInView;
}
