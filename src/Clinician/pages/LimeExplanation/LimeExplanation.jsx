import "./LimeExplanation.css";

export default function LimeExplanation() {
  const patient = { id: "P-20491", age: 47, bmi: 30.6, glucose: 168, hba1c: 7.1, activity: 3 };
  const items = [
    { feature: "Glucose", value: +0.25 },
    { feature: "BMI", value: +0.18 },
    { feature: "Age", value: +0.06 },
    { feature: "Activity", value: -0.05 },
    { feature: "HbA1c", value: +0.08 },
  ];
  const maxAbs = Math.max(...items.map(i => Math.abs(i.value)), 0.0001);

  return (
    <section>
      <div className="card__head">
        <div>
          <h2 className="card__title">LIME Explanations (Per-Patient)</h2>
          <p className="card__subtitle">
            Patient #{patient.id} • Age {patient.age} • BMI {patient.bmi} • Glucose {patient.glucose} • HbA1c {patient.hba1c}
          </p>
        </div>
      </div>

      <div className="lime-rows">
        {items.map((it, idx) => {
          const pct = (Math.abs(it.value) / maxAbs) * 50; // left 50, right 50
          return (
            <div key={idx} className="lime-row">
              <div className="lime-label">{it.feature}</div>
              <div className="lime-axis">
                <div className="lime-neg" style={{ width: `${it.value < 0 ? pct : 0}%` }} />
                <div className="lime-zero" />
                <div className="lime-pos" style={{ width: `${it.value > 0 ? pct : 0}%` }} />
              </div>
              <div className={`lime-val ${it.value >= 0 ? "pos" : "neg"}`}>
                {(it.value >= 0 ? "+" : "") + (it.value * 100).toFixed(0)}%
              </div>
            </div>
          );
        })}
      </div>

      <p className="muted">Positive ↑ risk increase, Negative ↓ risk decrease. Focus: BMI & Activity (modifiable).</p>
    </section>
  );
}
