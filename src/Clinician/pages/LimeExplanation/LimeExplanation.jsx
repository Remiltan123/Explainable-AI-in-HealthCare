import "./LimeExplanation.css";

export default function LimeExplanation({ result }) {

  const limeData = result?.explanations?.lime;

  if (!limeData) {
    return <p>No LIME data available. Run prediction first.</p>;
  }

  const items = Object.entries(limeData).map(([feature, value]) => ({
    feature,
    value
  }));

  const maxAbs = Math.max(...items.map(i => Math.abs(i.value)), 0.0001);

  const cleanLabel = (text) => {
    return text
      .replace("num__", "")
      .replace("cat__", "")
      .replace(/_/g, " ");
  };

  return (
    <section className="lime-container">

      <h2>LIME Explanation (Per-Patient)</h2>

      {/* 🔥 RAW BACKEND DATA */}
      <pre className="lime-debug">
        {JSON.stringify(limeData, null, 2)}
      </pre>

      {/* 🔥 SCROLL BOX */}
      <div className="lime-scroll">

        {items.map((it, idx) => {
          const pct = (Math.abs(it.value) / maxAbs) * 100;

          return (
            <div key={idx} className="lime-row">

              <div className="lime-label">
                {cleanLabel(it.feature)}
              </div>

              <div className="lime-axis">
                <div
                  className={`lime-bar ${
                    it.value >= 0 ? "pos" : "neg"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div
                className={`lime-val ${
                  it.value >= 0 ? "pos" : "neg"
                }`}
              >
                {(it.value >= 0 ? "+" : "") +
                  (it.value * 100).toFixed(1)}%
              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}