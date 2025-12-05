import React from "react";
import "./EasyExplanation.css";

export default function EasyExplanation() {
  return (
    <div className="easy-explanation">
      <h3 className="title">Easy Explanation</h3>
      <p className="subtitle">Why your score looks like this</p>
      <ul className="list">
        <li>Glucose level was above your usual baseline this week.</li>
        <li>Daily steps decreased by ~18% compared to last week.</li>
        <li>Sleep duration improved by 35 minutes/night.</li>
      </ul>
    </div>
  );
}
