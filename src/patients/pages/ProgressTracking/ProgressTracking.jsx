import { useState } from "react";
import Card from "../../components/Card";
import "./ProgressTracking.css";

export default function ProgressTracking() {
  const [progressValues] = useState(() =>
    Array.from({ length: 7 }, () => 55 + Math.floor(Math.random() * 21))
  );

  return (
    <Card title="Progress Tracking" subtitle="Past 7 days overview">
      <div className="days">
        {progressValues.map((val, i) => (
          <div className="day" key={i}>
            <p className="day__label">D{i + 1}</p>
            <p className="day__value">{val}%</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
