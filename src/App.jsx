// src/App.jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";
import PatientDashboard from "./patients/PatientDashboard";
import Authentication from "./patients/components/Authentication/Authentication";

export default function App() {
  return (
    <div className="app">
      <PatientDashboard />
      {/* Route layer that renders overlays above the dashboard */}
      <Routes>
        <Route path="/auth" element={<Authentication />} />
      </Routes>
    </div>
  );
}
