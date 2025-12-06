import { useState } from "react";
import "./clinician.css";                 // use your global CSS (board/sidebar/main/card)
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

// Technical pages
import ShapSummary from "./pages/ShapSummary/ShapSummary";
import LimeExplanation from "./pages/LimeExplanation/LimeExplanation";
import FairnessMetrics from "./pages/FairnessMetrics/FairnessMetrics";
import UncertaintyPanel from "./pages/UncertaintyPanel/UncertaintyPanel";
import WhatIfSimulation from "./pages/WhatIfSimulation/WhatIfSimulation";

export default function ClinicianDashboard() {
  const [active, setActive] = useState("shap"); // default tab

  function renderContent() {
    switch (active) {
      case "shap":        return <ShapSummary />;
      case "lime":        return <LimeExplanation />;
      case "fairness":    return <FairnessMetrics />;
      case "uncertainty": return <UncertaintyPanel />;
      case "simulate":    return <WhatIfSimulation />;
      default:            return <ShapSummary />;
    }
  }

  return (
    <div className="board">
      <Sidebar active={active} setActive={setActive} />
      <main className="main">
        <TopBar />
        <div className="content">
          <div className="card">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
}
