import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import PatientDashboard from "./patients/PatientDashboard";
import Authentication from "./patients/components/Authentication/Authentication";
import ClinicianDashboard from "./Clinician/ClinicianDashboard";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<PatientDashboard />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/clinic" element={<ClinicianDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
