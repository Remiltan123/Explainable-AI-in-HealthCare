import { useMemo, useState } from "react";
import "./WhatIfSimulation.css";

export default function WhatIfSimulation() {
  const [sim, setSim] = useState({ age: 47, bmi: 30.6, glucose: 168, hba1c: 7.1, activity: 3 });

  function predict({ age, bmi, glucose, hba1c, activity }) {
    const z = 0.03*age + 0.08*bmi + 0.015*glucose + 0.12*hba1c - 0.05*activity - 10.5;
    return 1 / (1 + Math.exp(-z));
  }
  const prob = useMemo(() => predict(sim), [sim]);

  return (
    <section>
      <div className="card__head">
        <div>
          <h2 className="card__title">What-If Simulation</h2>
          <p className="card__subtitle">Adjust inputs and see instant risk change</p>
        </div>
      </div>

      <div className="sim-grid">
        <div className="sim-card">
          <Slider label={`BMI: ${sim.bmi.toFixed(1)}`} min={18} max={40} step={0.1}
                  value={sim.bmi} onChange={v=>setSim(s=>({...s,bmi:v}))}/>
          <Slider label={`Glucose: ${sim.glucose} mg/dL`} min={80} max={220} step={1}
                  value={sim.glucose} onChange={v=>setSim(s=>({...s,glucose:v}))}/>
          <Slider label={`HbA1c: ${sim.hba1c.toFixed(1)} %`} min={5} max={10} step={0.1}
                  value={sim.hba1c} onChange={v=>setSim(s=>({...s,hba1c:v}))}/>
          <Slider label={`Activity (days/wk): ${sim.activity}`} min={0} max={7} step={1}
                  value={sim.activity} onChange={v=>setSim(s=>({...s,activity:v}))}/>
          <Slider label={`Age: ${sim.age}`} min={18} max={90} step={1}
                  value={sim.age} onChange={v=>setSim(s=>({...s,age:v}))}/>
        </div>

        <div className="sim-card">
          <div className="sim-kpi">
            <div className="sim-kpi__label">Predicted Risk</div>
            <div className="sim-kpi__value">{(prob*100).toFixed(0)}%</div>
          </div>
          <p className="muted">BMI −1 & Activity +2 days → risk usually ↓ (mock model).</p>
        </div>
      </div>
    </section>
  );
}

function Slider({ label, min, max, step, value, onChange }) {
  return (
    <label className="sim-slider">
      <div className="sim-slider__label">{label}</div>
      <input type="range" min={min} max={max} step={step}
             value={value} onChange={(e)=>onChange(parseFloat(e.target.value))}/>
    </label>
  );
}
