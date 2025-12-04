import Card from "../../components/Card";
import "./PersonalizedRecos.css";

export default function PersonalizedRecos() {
  return (
    <Card title="Personalized Recommendations" subtitle="Small steps you can take today">
      <ul className="list">
        <li>⏱️ Aim for three 10-minute walks after meals.</li>
        <li>🥗 Add one cup of leafy greens to lunch.</li>
        <li>💧 Keep a 500ml water bottle at your desk.</li>
      </ul>
    </Card>
  );
}
