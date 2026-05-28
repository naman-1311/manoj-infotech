'use client';

import { useState, useEffect } from 'react';

const TRACK_HEIGHT = 279; // px
const CONTAINER_WIDTH = 65; // px — sidebar width

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const [heroExited, setHeroExited] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Switch to dark colors once user scrolls past 90% of hero height
      setHeroExited(scrollTop > window.innerHeight * 0.9);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(1, Math.max(0, pct)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dotOffset = progress * TRACK_HEIGHT;

  return (
    <div
      className="hidden lg:flex fixed flex-col items-center justify-center"
      style={{
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: `${CONTAINER_WIDTH}px`,
        height: `${TRACK_HEIGHT}px`,
        zIndex: 40,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: `${CONTAINER_WIDTH}px`,
          height: `${TRACK_HEIGHT}px`,
        }}
      >
        {/* Full track */}
        <div
          className="absolute"
          style={{
            left: '50%',
            top: 0,
            width: '3px',
            height: '100%',
            background: 'rgba(255,255,255,0.3)',
            transform: 'translateX(-50%)',
            transition: 'background 0.4s ease',
          }}
        />

        {/* Filled portion above dot */}
        <div
          className="absolute"
          style={{
            left: '50%',
            top: 0,
            width: '3px',
            height: `${dotOffset}px`,
            background: '#EF4444',
            boxShadow: '0 0 6px rgba(239,68,68,0.7)',
            transform: 'translateX(-50%)',
            transition: 'background 0.4s ease',
          }}
        />

        {/* Dot */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: `${dotOffset}px`,
            width: '13px',
            height: '13px',
            borderRadius: '50%',
            background: '#EF4444',
            boxShadow: '0 0 10px rgba(239,68,68,0.9)',
            transform: 'translate(-50%, -50%)',
            transition: 'top 0.1s linear, background 0.4s ease',
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
}
