import { useState } from "react";
import "./PatientInputForm.css";

export default function PatientInputForm({ onResult }) {

  const [form, setForm] = useState({
    Age: "",
    Glucose: "",
    Blood_Pressure: "",
    Skin_Thickness: "",
    Insulin: "",
    BMI: "",
    Gender: "Male",
    Physical_Activity: "Moderate",
    Smoking_Status: "No",
    Alcohol_Intake: "Occasional",
  });

  // 🔥 ALERT STATE
  const [alert, setAlert] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

 async function handleSubmit(e) {
  e.preventDefault();

  const payload = {
    Age: Number(form.Age),
    Glucose: Number(form.Glucose),
    Blood_Pressure: Number(form.Blood_Pressure),
    Skin_Thickness: Number(form.Skin_Thickness),
    Insulin: Number(form.Insulin),
    BMI: Number(form.BMI),
    Gender: form.Gender,
    Physical_Activity: form.Physical_Activity,
    Smoking_Status: form.Smoking_Status,
    Alcohol_Intake: form.Alcohol_Intake,
  };

  try {
    const res = await fetch("http://127.0.0.1:8000/predict_explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (onResult) onResult(data);

    // ⭐ GET PROBABILITY %
    const percent = Math.round((data.probability || 0) * 100);

    // 🔴🟢 ALERT
    if (data.result === "Diabetic") {
      setAlert({
        type: "danger",
        text: `⚠️ High Risk (${percent}%) — Patient likely DIABETIC`
      });
    } else {
      setAlert({
        type: "success",
        text: `✅ Low Risk (${percent}%) — Non-Diabetic`
      });
    }

    setTimeout(() => setAlert(null), 4500);

  } catch (err) {
    console.error(err);
    alert("Connection error 😢");
  }
}

  return (
    <>
      {/* 🔥 TOP RIGHT ALERT */}
      {alert && (
        <div className={`top-alert ${alert.type}`}>
          {alert.text}
        </div>
      )}

      <form className="patient-form" onSubmit={handleSubmit}>
        <h3>Patient Details</h3>

        <div className="grid">

          <div className="field">
            <label>Age <span>(years)</span></label>
            <input name="Age" onChange={handleChange} />
          </div>

          <div className="field">
            <label>Glucose <span>(mg/dL)</span></label>
            <input name="Glucose" onChange={handleChange} />
          </div>

          <div className="field">
            <label>Blood Pressure <span>(mmHg)</span></label>
            <input name="Blood_Pressure" onChange={handleChange} />
          </div>

          <div className="field">
            <label>Skin Thickness <span>(mm)</span></label>
            <input name="Skin_Thickness" onChange={handleChange} />
          </div>

          <div className="field">
            <label>Insulin <span>(µU/mL)</span></label>
            <input name="Insulin" onChange={handleChange} />
          </div>

          <div className="field">
            <label>BMI <span>(kg/m²)</span></label>
            <input name="BMI" onChange={handleChange} />
          </div>

          <div className="field">
            <label>Gender</label>
            <select name="Gender" onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="field">
            <label>Physical Activity</label>
            <select name="Physical_Activity" onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="field">
            <label>Smoking Status</label>
            <select name="Smoking_Status" onChange={handleChange}>
              <option value="No">No</option>
              <option value="Former">Former</option>
              <option value="Current">Current</option>
            </select>
          </div>

          <div className="field">
            <label>Alcohol Intake</label>
            <select name="Alcohol_Intake" onChange={handleChange}>
              <option value="None">None</option>
              <option value="Occasional">Occasional</option>
              <option value="Regular">Regular</option>
            </select>
          </div>

        </div>

        <button type="submit">Predict</button>
      </form>
    </>
  );
}