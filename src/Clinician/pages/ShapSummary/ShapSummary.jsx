import "./ShapSummary.css";

export default function ShapSummary({ result }) {

  if (!result?.explanations?.shap) {
    return <p>No SHAP data yet. Predict first.</p>;
  }

  const shapData = result.explanations.shap;

  // Convert object → array WITHOUT modifying values
  const items = Object.entries(shapData).map(([key, value]) => {
    const cleanName = key.replace(/^num__|^cat__/, "");
    return { feature: cleanName, value };
  });

  // OPTIONAL: sort by absolute impact (does not change values)
  items.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

  // For bar scaling only (not value change)
  const maxAbs = Math.max(...items.map(i => Math.abs(i.value)), 0.0001);

  return (

    <section className="shap-container-df">

  <div className="shap-scroll-dfs">

    <div className="card__head">
        <h2>SHAP Summary (Patient Feature Impact)</h2>
        <p>Raw contribution values from the model</p>
      </div>

      <div className="shap-bars">

        {items.map((it, idx) => (
          <div key={idx} className="shap-row">

            <div className="shap-label">{it.feature}</div>

            <div className="shap-barwrap">
              <div
                className="shap-bar"
                style={{
                  width: `${(Math.abs(it.value) / maxAbs) * 100}%`,
                  backgroundColor: it.value > 0 ? "#e74c3c" : "#3b82f6"
                }}
              />
            </div>

            {/* ⭐ RAW VALUE — NOT PERCENT */}
            <div className="shap-val">
              {it.value.toFixed(6)}
            </div>

          </div>
        ))}

      </div>

      <p className="muted">
        Positive values increase risk, negative values decrease risk.
      </p>

  </div>

    </section>
  );
}