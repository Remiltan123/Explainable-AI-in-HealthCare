import "./ShapSummary.css";

export default function ShapSummary() {
  const items = [
    { feature: "Glucose", value: 0.38 },
    { feature: "BMI", value: 0.27 },
    { feature: "Age", value: 0.19 },
    { feature: "HbA1c", value: 0.11 },
    { feature: "Activity", value: 0.05 },
  ];
  const max = Math.max(...items.map(i => i.value), 0.0001);

  return (
    <section>
      <div className="card__head">
        <div>
          <h2 className="card__title">SHAP Summary (Global Feature Importance)</h2>
          <p className="card__subtitle">Model-level influence of medical attributes</p>
        </div>
      </div>

      <div className="shap-bars">
        {items.map((it, idx) => (
          <div key={idx} className="shap-row">
            <div className="shap-label">{it.feature}</div>
            <div className="shap-barwrap">
              <div className="shap-bar" style={{ width: `${(it.value / max) * 100}%` }} />
            </div>
            <div className="shap-val">{Math.round(it.value * 100)}%</div>
          </div>
        ))}
      </div>

      <p className="muted">Global-aa paathaa Glucose & BMI dhaan prediction-a drive pannudhu.</p>
    </section>
  );
}
