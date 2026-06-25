"use client";

interface Option {
  id: string;
  label: string;
  sublabel?: string;
}

interface SegmentedButtonProps {
  legend: string;
  options: readonly Option[];
  value: string;
  onChange: (id: string) => void;
  name: string;
}

export default function SegmentedButton({
  legend,
  options,
  value,
  onChange,
  name,
}: SegmentedButtonProps) {
  return (
    <fieldset className="seg-fieldset">
      <legend className="field-label">{legend}</legend>
      <div className="seg-group" role="group">
        {options.map((opt) => {
          const selected = opt.id === value;
          return (
            <label
              key={opt.id}
              className={`seg-btn${selected ? " seg-btn--active" : ""}`}
              aria-pressed={selected}
            >
              <input
                type="radio"
                name={name}
                value={opt.id}
                checked={selected}
                onChange={() => onChange(opt.id)}
                className="sr-only"
              />
              <span className="seg-btn__label">{opt.label}</span>
              {opt.sublabel && (
                <span className="seg-btn__sub">{opt.sublabel}</span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
