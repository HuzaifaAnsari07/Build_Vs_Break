'use client';

export function GlitterText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="glitter absolute inset-0 mix-blend-screen opacity-80 pointer-events-none"></span>
      <span className="relative">{text}</span>
    </span>
  );
}
