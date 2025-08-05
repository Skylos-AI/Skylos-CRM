interface SectionBadgeProps {
  text: string;
  className?: string;
}

export function SectionBadge({ text, className = "" }: SectionBadgeProps) {
  return (
    <div className={`inline-block bg-black text-white text-sm font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${className}`}>
      {text}
    </div>
  );
}