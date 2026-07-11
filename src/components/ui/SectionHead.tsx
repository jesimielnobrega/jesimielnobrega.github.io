interface SectionHeadProps {
  num: string;
  id: string;
  label: string;
}

export default function SectionHead({ num, id, label }: SectionHeadProps) {
  return (
    <div className="flex items-center gap-3.5 mb-10">
      <span className="font-mono text-[13px] text-accent">{num}</span>
      <h2 id={id} className="font-space font-bold text-[clamp(26px,3.5vw,38px)] tracking-tight text-[var(--txt)]">
        {label}
      </h2>
      <span className="flex-1 h-px bg-[var(--rule)]" />
    </div>
  );
}
