import Card from "../../components/Card";
import "./EasyExplanation.css";

export default function EasyExplanation() {
  return (
    <Card title="Easy Explanation" subtitle="Why your score looks like this">
      <ul className="list">
        <li>Glucose level was above your usual baseline this week.</li>
        <li>Daily steps decreased by ~18% compared to last week.</li>
        <li>Sleep duration improved by 35 minutes/night.</li>
      </ul>
    </Card>
  );
}
