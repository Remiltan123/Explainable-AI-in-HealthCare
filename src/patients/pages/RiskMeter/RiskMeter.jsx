import React from "react";
import "./RiskMeter.css";

function Donut({ value = 0.62 }) {
  const R = 60, S = 12, C = 2 * Math.PI * R;
  const progress = C * value;

  return (
    <svg viewBox="0 0 160 160" className="riskmeter" aria-label="Risk meter">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <circle cx="80" cy="80" r={R} fill="none" stroke="#e5e7eb" strokeWidth={S} />
      <circle
        cx="80"
        cy="80"
        r={R}
        fill="none"
        stroke="url(#grad)"
        strokeWidth={S}
        strokeLinecap="round"
        strokeDasharray={`${progress} ${C}`}
        transform="rotate(-90 80 80)"
      />
      <text
        x="80"
        y="80"
        textAnchor="middle"
        dominantBaseline="middle"
        className="riskmeter__value"
      >
        {Math.round(value * 100)}%
      </text>
      <text
        x="80"
        y="100"
        textAnchor="middle"
        className="riskmeter__label"
      >
        Risk level
      </text>
    </svg>
  );
}

export default function RiskMeter() {
  return (
    <div className="risk-meter-section">
      <div className="header">
        <div>
          <h3 className="title">Risk Meter</h3>
          <p className="subtitle">Real-time overall risk score</p>
        </div>
        <span className="muted">updated 2m ago</span>
      </div>

      <div className="riskrow">
        <Donut value={0.62} />
        <ul className="legend">
          <li><i className="dot dot--green" /> Low: 0–30%</li>
          <li><i className="dot dot--amber" /> Medium: 31–60%</li>
          <li><i className="dot dot--red" /> High: 61–100%</li>
        </ul>
      </div>
    </div>
  );
}
