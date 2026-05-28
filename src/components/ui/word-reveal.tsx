'use client';

interface WordRevealProps {
  text: string;
  isInView: boolean;
  baseDelay?: number;
  stagger?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function WordReveal({
  text,
  isInView,
  baseDelay = 0,
  stagger = 60,
  style = {},
  className = '',
}: WordRevealProps) {
  const words = text.split(' ');

  return (
    <span className={className} style={{ display: 'block', ...style }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <span
            style={{
              display: 'inline-block',
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(110%)',
              transition: `opacity 0.5s ease ${baseDelay + i * stagger}ms, transform 0.5s cubic-bezier(0.4,0,0.2,1) ${baseDelay + i * stagger}ms`,
              marginRight: '0.25em',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
