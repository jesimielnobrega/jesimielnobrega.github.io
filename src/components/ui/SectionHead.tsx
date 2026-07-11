interface SectionHeadProps {
  num: string;
  id: string;
  label: string;
}

export default function SectionHead({ num, id, label }: SectionHeadProps) {
  return (
    <div className="section-head">
      <span className="section-num">{num}</span>
      <h2 id={id} className="section-title">
        {label}
      </h2>
      <span className="section-rule" />
    </div>
  );
}
