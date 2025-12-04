import { useState } from "react";
import "./patients.css";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

import RiskMeter from "./pages/RiskMeter/RiskMeter";
import EasyExplanation from "./pages/EasyExplanation/EasyExplanation";
import PersonalizedRecos from "./pages/PersonalizedRecos/PersonalizedRecos";
import ProgressTracking from "./pages/ProgressTracking/ProgressTracking";
import UpcomingGoals from "./pages/UpcomingGoals/UpcomingGoals";

export default function PatientDashboard() {
  const [active, setActive] = useState("risk");

  function renderContent() {
    switch (active) {
      case "risk":     return <RiskMeter />;
      case "easy":     return <EasyExplanation />;
      case "recos":    return <PersonalizedRecos />;
      case "progress": return <ProgressTracking />;
      case "goals":    return <UpcomingGoals />;
      default:         return null;
    }
  }

  return (
    <div className="board">
      <Sidebar active={active} setActive={setActive} />
      <main className="main">
        <TopBar />
        <div className="content">{renderContent()}</div>
      </main>
    </div>
  );
}
