import { useState } from "react";
import "./UncertaintyPanel.css";

export default function UncertaintyPanel() {
  const [conf, setConf] = useState(0.76);
  const deg = Math.round(conf * 270) - 135;

  return (
    <section>
      <div className="card__head">
        <div>
          <h2 className="card__title">Uncertainty Estimation</h2>
          <p className="card__subtitle">Confidence indicator for current predictions</p>
        </div>
      </div>

      <div className="unc-gauge">
        <div className="unc-arc" />
        <div className="unc-needle" style={{ transform: `rotate(${deg}deg)` }} />
        <div className="unc-value">{Math.round(conf * 100)}%</div>
        <div className="unc-label">Model Confidence</div>
      </div>

      <button className="btn" onClick={() =>
        setConf(Math.max(0.3, Math.min(0.95, +(Math.random()*0.3+0.55).toFixed(2))))
      }>
        Re-sample confidence
      </button>

      <p className="muted">Low confidence → verify with extra labs / history.</p>
    </section>
  );
}
