import "./LimeExplanation.css";

export default function LimeExplanation({ result }) {

  const limeData = result?.explanations?.lime;

  if (!limeData)
    return <p className="muted">No LIME explanation available.</p>;

  // Convert object → array
  const items = Object.entries(limeData).map(([feature, value]) => ({
    feature,
    value
  }));

  const maxAbs = Math.max(...items.map(i => Math.abs(i.value)), 0.0001);

  return (
    <section>

      <div className="card__head">
        <div>
          <h2 className="card__title">LIME Explanation (Per-Patient)</h2>
          <p className="card__subtitle">
            Feature impact for THIS prediction
          </p>
        </div>
      </div>

      <div className="lime-rows">

        {items.map((it, idx) => {
          const pct = (Math.abs(it.value) / maxAbs) * 50;

          return (
            <div key={idx} className="lime-row">

              <div className="lime-label">
                {it.feature.replace(/num__|cat__/g, "")}
              </div>

              <div className="lime-axis">
                <div
                  className="lime-neg"
                  style={{ width: `${it.value < 0 ? pct : 0}%` }}
                />
                <div className="lime-zero" />
                <div
                  className="lime-pos"
                  style={{ width: `${it.value > 0 ? pct : 0}%` }}
                />
              </div>

              <div className={`lime-val ${it.value >= 0 ? "pos" : "neg"}`}>
                {(it.value >= 0 ? "+" : "") + (it.value * 100).toFixed(1)}%
              </div>

            </div>
          );
        })}

      </div>

      <p className="muted">
        Positive → increases risk • Negative → decreases risk
      </p>

    </section>
  );
}