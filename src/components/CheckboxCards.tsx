"use client";

interface Option {
  id: string;
  label: string;
  sublabel?: string;
}

interface CheckboxCardsProps {
  legend: string;
  options: readonly Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  hint?: string;
  errorMessage?: string;
}

export default function CheckboxCards({
  legend,
  options,
  selected,
  onChange,
  hint,
  errorMessage,
}: CheckboxCardsProps) {
  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <fieldset className="check-fieldset">
      <legend className="field-label">{legend}</legend>
      {hint && <p className="field-hint">{hint}</p>}
      {errorMessage && (
        <p className="field-error" role="alert">
          {errorMessage}
        </p>
      )}
      <div className="check-grid">
        {options.map((opt) => {
          const checked = selected.includes(opt.id);
          return (
            <label
              key={opt.id}
              className={`check-card${checked ? " check-card--active" : ""}`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(opt.id)}
                className="sr-only"
              />
              <span className="check-card__label">{opt.label}</span>
              {opt.sublabel && (
                <span className="check-card__sub">{opt.sublabel}</span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
