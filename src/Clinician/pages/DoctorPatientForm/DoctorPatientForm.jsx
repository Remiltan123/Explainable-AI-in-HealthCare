import React, { useState } from "react";
import { app } from "../../../firebaseConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "./DoctorPatientForm.css";

const db = getFirestore(app);

const DoctorPatientForm = () => {

  const [data, setData] = useState({
    patientEmail: "",
    name: "",
    age: "",
    gender: "",
    phone: "",
    disease: "",
    notes: "",
    risk: "",
    explanation: "",
    recos: "",
    progress: "",
    goals: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "patients"), data);

      setMsg("Patient saved successfully ✅");

      // Clear form
      setData({
        patientEmail: "",
        name: "",
        age: "",
        gender: "",
        phone: "",
        disease: "",
        notes: "",
        risk: "",
        explanation: "",
        recos: "",
        progress: "",
        goals: "",
      });

    } catch {
      setMsg("Error saving data ❌");
    }
  };

  return (
    <div className="doc-form-container">

      <h2>Add Patient Details</h2>

      <form className="doc-form" onSubmit={handleSubmit}>

        {/* DOCTOR EMAIL */}
        <input
          type="email"
          name="patientEmail"
          placeholder="Patient Email"
          value={data.patientEmail}
          onChange={handleChange}
          required
        />

        {/* PATIENT INFO */}
        <input name="name" placeholder="Patient Name" value={data.name} onChange={handleChange} required />

        <input type="number" name="age" placeholder="Age" value={data.age} onChange={handleChange} required />

        <select name="gender" value={data.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input name="phone" placeholder="Phone Number" value={data.phone} onChange={handleChange} required />

        <input name="disease" placeholder="Disease / Condition" value={data.disease} onChange={handleChange} />

        <textarea name="notes" placeholder="Doctor Notes" value={data.notes} onChange={handleChange} />


        {/* EXTRA SECTIONS */}

        <h3>📈 Risk Meter</h3>
        <input name="risk" placeholder="Risk %" value={data.risk} onChange={handleChange} />

        <h3>📘 Easy Explanation</h3>
        <textarea name="explanation" placeholder="Explanation" value={data.explanation} onChange={handleChange} />

        <h3>💓 Personalized Recos</h3>
        <textarea name="recos" placeholder="Recommendations" value={data.recos} onChange={handleChange} />

        <h3>✅ Progress Tracking</h3>
        <textarea name="progress" placeholder="Progress details" value={data.progress} onChange={handleChange} />

        <h3>🔔 Upcoming Goals</h3>
        <textarea name="goals" placeholder="Goals" value={data.goals} onChange={handleChange} />


        <button type="submit">Save Patient</button>
      </form>

      {/* SUCCESS / ERROR MESSAGE */}
      {msg && <div className="doc-msg">{msg}</div>}

    </div>
  );
};

export default DoctorPatientForm;