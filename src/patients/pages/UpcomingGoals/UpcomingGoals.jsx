import Card from "../../components/Card";
import "./UpcomingGoals.css";

export default function UpcomingGoals() {
  return (
    <Card title="Upcoming Goals & Notifications" subtitle="What to expect next">
      <div className="goals">
        <div className="goals__row"><span>📅 HbA1c test reminder</span><span className="muted">Due in 5 days</span></div>
        <div className="goals__row"><span>🏃‍♀️ 6k steps/day streak</span><span className="muted">Day 3 of 7</span></div>
        <div className="goals__row"><span>🛌 Sleep before 11:00 PM</span><span className="muted">Tonight</span></div>
      </div>
    </Card>
  );
}
