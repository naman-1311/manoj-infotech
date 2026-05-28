'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterInteractive = () => {
      gsapScale(dot, 2);
    };

    const onLeaveInteractive = () => {
      gsapScale(dot, 1);
    };

    const gsapScale = (el: HTMLElement, scale: number) => {
      el.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };

    const loop = () => {
      currentRef.current.x += (posRef.current.x - currentRef.current.x) * 0.12;
      currentRef.current.y += (posRef.current.y - currentRef.current.y) * 0.12;
      dot.style.left = `${currentRef.current.x}px`;
      dot.style.top = `${currentRef.current.y}px`;
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);

    const interactives = document.querySelectorAll('a, button');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: 'var(--accent-purple)',
        pointerEvents: 'none',
        zIndex: 9999,
        top: 0,
        left: 0,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.2s ease',
      }}
    />
  );
}
