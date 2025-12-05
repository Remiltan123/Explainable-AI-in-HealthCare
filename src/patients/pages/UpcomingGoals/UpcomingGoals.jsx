import React from "react";
import "./UpcomingGoals.css";

export default function UpcomingGoals() {
  return (
    <div className="upcoming-goals">
      <h3 className="title">Upcoming Goals & Notifications</h3>
      <p className="subtitle">What to expect next</p>

      <div className="goals">
        <div className="goals__row">
          <span>📅 HbA1c test reminder</span>
          <span className="muted">Due in 5 days</span>
        </div>

        <div className="goals__row">
          <span>🏃‍♀️ 6k steps/day streak</span>
          <span className="muted">Day 3 of 7</span>
        </div>

        <div className="goals__row">
          <span>🛌 Sleep before 11:00 PM</span>
          <span className="muted">Tonight</span>
        </div>
      </div>
    </div>
  );
}
