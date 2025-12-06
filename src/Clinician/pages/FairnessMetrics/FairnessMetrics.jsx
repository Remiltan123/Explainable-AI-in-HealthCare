import "./FairnessMetrics.css";

export default function FairnessMetrics() {
  const byGender = [
    { group: "Female", posRate: 0.62, tpr: 0.78 },
    { group: "Male",   posRate: 0.56, tpr: 0.74 },
  ];
  const parityDiff = 0.06; // Female - Male
  const eqOppDiff  = 0.04; // TPR Female - Male
  const maxPR  = Math.max(...byGender.map(g => g.posRate), 0.0001);
  const maxTPR = Math.max(...byGender.map(g => g.tpr), 0.0001);

  return (
    <section>
      <div className="card__head">
        <div>
          <h2 className="card__title">Fairness Metrics</h2>
          <p className="card__subtitle">Demographic Parity & Equal Opportunity checks</p>
        </div>
      </div>

      <div className="fair-grid">
        <Bar title="Positive Prediction Rate (Parity)"
             items={byGender.map(g => ({ label: g.group, value: g.posRate }))}
             max={maxPR} />
        <Bar title="True Positive Rate (Equal Opportunity)"
             items={byGender.map(g => ({ label: g.group, value: g.tpr }))}
             max={maxTPR} />
      </div>

      <div className="fair-table">
        <div className="fair-row fair-head">
          <div>Group</div><div>Positive Rate</div><div>TPR</div>
        </div>
        {byGender.map((g,i)=>(
          <div key={i} className="fair-row">
            <div>{g.group}</div>
            <div>{(g.posRate*100).toFixed(1)}%</div>
            <div>{(g.tpr*100).toFixed(1)}%</div>
          </div>
        ))}
      </div>

      <div className="fair-kpis">
        <KPI label="Demographic Parity Δ" value={(parityDiff*100).toFixed(1)+"%"} />
        <KPI label="Equal Opportunity Δ" value={(eqOppDiff*100).toFixed(1)+"%"} />
      </div>

      <p className="muted">Δ close to 0 ⇒ fairer. பெரிய gap இருந்தால் bias mitigation consider pannunga.</p>
    </section>
  );
}

function Bar({ title, items, max }) {
  return (
    <div>
      <h4 className="fair-sub">{title}</h4>
      <div className="fair-bars">
        {items.map((it,i)=>(
          <div key={i} className="fair-rowbar">
            <div className="fair-label">{it.label}</div>
            <div className="fair-barwrap">
              <div className="fair-bar" style={{ width: `${(it.value/(max||1))*100}%` }} />
            </div>
            <div className="fair-val">{Math.round(it.value*100)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KPI({ label, value }) {
  return (
    <div className="fair-kpi">
      <div className="fair-kpi__label">{label}</div>
      <div className="fair-kpi__value">{value}</div>
    </div>
  );
}
