import React, { useState } from "react";
import "./ProgressTracking.css";

export default function ProgressTracking() {
  const [progressValues] = useState(() =>
    Array.from({ length: 7 }, () => 55 + Math.floor(Math.random() * 21))
  );

  return (
    <div className="progress-tracking">
      <h3 className="title">Progress Tracking</h3>
      <p className="subtitle">Past 7 days overview</p>

      <div className="days">
        {progressValues.map((val, i) => (
          <div className="day" key={i}>
            <p className="day__label">D{i + 1}</p>
            <p className="day__value">{val}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
