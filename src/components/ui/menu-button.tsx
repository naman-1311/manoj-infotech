'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface MenuButtonProps {
  onClick?: () => void;
  label?: string;
  heroExited?: boolean;
  size?: number;
}

const IDLE_POS = [
  { x: -6.5, y: -6.5 },
  { x: 6.5, y: -6.5 },
  { x: -6.5, y: 6.5 },
  { x: 6.5, y: 6.5 },
];

const OPEN_POS = [
  { x: 0, y: -22.5 },
  { x: 22.5, y: 0 },
  { x: 0, y: 22.5 },
  { x: -22.5, y: 0 },
];

export default function MenuButton({ onClick, label = 'menu', heroExited = false, size = 44 }: MenuButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const ballRefs = [
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
  ];
  const labelRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef<'idle' | 'hovered'>('idle');

  useEffect(() => {
    // Set initial idle positions
    ballRefs.forEach((ref, i) => {
      gsap.set(ref.current, { x: IDLE_POS[i].x, y: IDLE_POS[i].y, scale: 1, opacity: 1 });
    });
    gsap.set(labelRef.current, { opacity: 0, scale: 0.8, display: 'none' });
  }, []);

  const toHovered = () => {
    if (stateRef.current === 'hovered') return;
    stateRef.current = 'hovered';

    const tl = gsap.timeline();

    tl.to(ballRefs.map(r => r.current), {
      x: (i: number) => OPEN_POS[i].x,
      y: (i: number) => OPEN_POS[i].y,
      scale: 0.85,
      duration: 0.55,
      ease: 'elastic.out(1, 0.6)',
      stagger: 0.04,
    });

    gsap.set(labelRef.current, { display: 'block' });
    tl.to(labelRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    }, '-=0.25');
  };

  const toIdle = () => {
    if (stateRef.current === 'idle') return;
    stateRef.current = 'idle';

    const tl = gsap.timeline();

    tl.to(labelRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(labelRef.current, { display: 'none' });
      },
    });

    tl.to(ballRefs.map(r => r.current), {
      x: (i: number) => IDLE_POS[i].x,
      y: (i: number) => IDLE_POS[i].y,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.65)',
      stagger: 0.03,
    }, '-=0.05');
  };

  return (
    <button
      ref={btnRef}
      onMouseEnter={toHovered}
      onMouseLeave={toIdle}
      onFocus={toHovered}
      onBlur={toIdle}
      onClick={onClick}
      aria-label={label}
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {ballRefs.map((ref, i) => (
        <span
          key={i}
          ref={ref}
          style={{
            position: 'absolute',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: heroExited ? '#2C2C2A' : '#ffffff',
            display: 'block',
            transition: 'background 0.4s ease',
          }}
        />
      ))}

      <span
        ref={labelRef}
        style={{
          position: 'absolute',
          fontSize: 13,
          fontWeight: 500,
          color: heroExited ? '#2C2C2A' : '#ffffff',
          letterSpacing: '0.04em',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 0,
          display: 'none',
          transition: 'color 0.4s ease',
        }}
      >
        {label}
      </span>
    </button>
  );
}