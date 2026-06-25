"use client";

interface ProfileSlidersProps {
  heavy: number;
  moderate: number;
  nonDrinker: number;
  onChange: (heavy: number, moderate: number, nonDrinker: number) => void;
}

export default function ProfileSliders({
  heavy,
  moderate,
  nonDrinker,
  onChange,
}: ProfileSlidersProps) {
  const sum = heavy + moderate + nonDrinker;
  const valid = sum === 100;

  function adjust(
    field: "heavy" | "moderate" | "nonDrinker",
    delta: number
  ) {
    let h = heavy;
    let m = moderate;
    let n = nonDrinker;

    if (field === "heavy") h = Math.max(0, Math.min(100, h + delta));
    if (field === "moderate") m = Math.max(0, Math.min(100, m + delta));
    if (field === "nonDrinker") n = Math.max(0, Math.min(100, n + delta));

    onChange(h, m, n);
  }

  const rows: {
    key: "heavy" | "moderate" | "nonDrinker";
    label: string;
    value: number;
  }[] = [
    { key: "heavy", label: "Bebem bastante", value: heavy },
    { key: "moderate", label: "Bebem moderadamente", value: moderate },
    { key: "nonDrinker", label: "Não bebem / crianças", value: nonDrinker },
  ];

  return (
    <fieldset className="profile-fieldset">
      <legend className="field-label">
        Perfil dos convidados
        <span
          className={`profile-badge${valid ? " profile-badge--ok" : " profile-badge--err"}`}
          aria-live="polite"
        >
          {sum}%
        </span>
      </legend>
      {!valid && (
        <p className="field-error" role="alert">
          Os percentuais dos convidados devem somar 100%.
        </p>
      )}
      <div className="profile-rows">
        {rows.map(({ key, label, value }) => (
          <div key={key} className="profile-row">
            <span className="profile-row__label">{label}</span>
            <div className="profile-row__controls">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => adjust(key, -5)}
                aria-label={`Diminuir ${label}`}
                disabled={value <= 0}
              >
                −
              </button>
              <span className="profile-row__value" aria-label={`${value}%`}>
                {value}%
              </span>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => adjust(key, 5)}
                aria-label={`Aumentar ${label}`}
                disabled={value >= 100}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
