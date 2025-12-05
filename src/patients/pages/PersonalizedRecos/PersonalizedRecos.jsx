import React from "react";
import "./PersonalizedRecos.css";

export default function PersonalizedRecos() {
  return (
    <div className="personalized-recos">
      <h3 className="title">Personalized Recommendations</h3>
      <p className="subtitle">Small steps you can take today</p>
      <ul className="list">
        <li>⏱️ Aim for three 10-minute walks after meals.</li>
        <li>🥗 Add one cup of leafy greens to lunch.</li>
        <li>💧 Keep a 500ml water bottle at your desk.</li>
      </ul>
    </div>
  );
}
