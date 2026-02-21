import { useState } from "react";
import "./clinician.css";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

// Pages
import ShapSummary from "./pages/ShapSummary/ShapSummary";
import LimeExplanation from "./pages/LimeExplanation/LimeExplanation";
import WhatIfSimulation from "./pages/WhatIfSimulation/WhatIfSimulation";
import PatientInputForm from "./pages/PatientInputForm/PatientInputForm";
import DoctorPatientForm from "./pages/DoctorPatientForm/DoctorPatientForm"; // ⭐ NEW

export default function ClinicianDashboard() {
  const [active, setActive] = useState("shap");
  const [result, setResult] = useState(null);

  function renderContent() {
    switch (active) {

      case "input":
        return <PatientInputForm onResult={setResult} />;

      case "doctorForm":     // ⭐ NEW TAB CONTENT
        return <DoctorPatientForm />;

      case "shap":
        return <ShapSummary result={result} />;

      case "lime":
        return <LimeExplanation result={result} />;

      case "simulate":
        return <WhatIfSimulation result={result} />;

      default:
        return <ShapSummary result={result} />;
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