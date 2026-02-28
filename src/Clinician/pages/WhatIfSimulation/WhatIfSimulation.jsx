import React, { useState, useEffect, useMemo } from 'react';
import { LucideActivity, LucideAlertCircle, LucideRefreshCcw, LucideTrendingDown, LucideShieldCheck } from 'lucide-react';
import "./WhatIfSimulation.css";
const WhatIfSimulation = () => {
  // --- HARD-CODED DATA FROM YOUR JSON ---
  const rawInputData = {
    Age: 65,
    Glucose: 180,
    Blood_Pressure: 95,
    Skin_Thickness: 35,
    Insulin: 210,
    BMI: 34.2,
    Gender: "Male",
    Physical_Activity: "Low",
    Smoking_Status: "Current",
    Alcohol_Intake: "High"
  };

  const rawExplanations = {
    shap: {
      "num__Age": 0.3656049370765686,
      "num__Glucose": 8.0355863571167,
      "num__Blood Pressure": -0.12193292379379272,
      "num__Skin Thickness": -0.023687690496444702,
      "num__Insulin": -0.13978470861911774,
      "num__BMI": 1.9579315185546875,
      "cat__Gender_Male": 0.0,
      "cat__Physical Activity_Low": -0.06532798707485199,
      "cat__Smoking Status_Current": -0.014487577602267265,
      "cat__Alcohol Intake_High": 0.01917491853237152,
    },
    lime: {
      "num__Glucose > 0.69": 0.2736,
      "num__Insulin > 0.68": 0.0272,
      "num__BMI > 0.50": 0.0198
    }
  };

  // --- LOGIC & STATE ---
  const [values, setValues] = useState(rawInputData);
  const [probability, setProbability] = useState(1.0);

  // Clean SHAP keys for logic
  const cleanedShap = useMemo(() => {
    const obj = {};
    Object.entries(rawExplanations.shap).forEach(([k, v]) => {
      const cleanK = k.replace('num__', '').replace('cat__', '').replace(' ', '_');
      obj[cleanK] = v;
    });
    return obj;
  }, []);

  useEffect(() => {
    let impact = 0;
    // Numerical logic
    const numKeys = ["Age", "Glucose", "Blood_Pressure", "Skin_Thickness", "Insulin", "BMI"];
    numKeys.forEach(key => {
      const delta = (values[key] - rawInputData[key]) / rawInputData[key];
      const weight = cleanedShap[key] || cleanedShap[key.replace('_', ' ')] || 0;
      impact += delta * (weight / 5);
    });

    setProbability(Math.max(0, Math.min(1, 1.0 + impact)));
  }, [values, cleanedShap]);

  const reset = () => setValues(rawInputData);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto bg-slate-50 min-h-screen font-sans text-slate-900">


      {/* TOP NAV / STATUS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2 tracking-tight">

            DIABETES <span className="text-blue-600">WHAT-IF</span> SIMULATOR
          </h1>
          <p className="text-slate-500 text-sm font-medium">Interactive Explainable AI (XAI) Prototype</p>
        </div>

        <div className="flex items-center gap-6 bg-slate-50 px-6 py-3 rounded-xl border border-slate-200 w-full md:w-auto">
          <div className="text-center">
            <p className="riskpredictor-clz">
              Current Risk :{" "}
              <span className={`riskpredictor ${probability > 0.5 ? "" : "green"
                }`}>
                {(probability * 100).toFixed(0)}%
              </span>
            </p>
          </div>

          <div className="h-10 w-[1px] bg-slate-200"></div>
          <button
            onClick={reset}
            className="flex flex-col items-center text-slate-400 hover:text-blue-600 transition-colors"
          >
            <LucideRefreshCcw size={20} />
            <span className="text-[10px] font-bold uppercase mt-1">Reset</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT: SLIDERS (INPUTS) */}
          <div className="lg:col-span-7 space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              Adjust Biometric Parameters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {["Glucose", "BMI", "Age", "Insulin", "Blood_Pressure", "Skin_Thickness"].map((key) => (
                <div key={key} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700">{key.replace('_', ' ')}</label>
                    <span className={`text-xs font-mono px-2 py-1 rounded-md ${values[key] < rawInputData[key] ? 'bg-green-100 text-green-700 font-bold' : 'bg-slate-100 text-slate-500'}`}>
                      {values[key]} {values[key] < rawInputData[key] && "↓"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={rawInputData[key] * 0.4}
                    max={rawInputData[key] * 1.6}
                    step="0.1"
                    value={values[key]}
                    onChange={(e) => setValues({ ...values, [key]: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              ))}
            </div>


          </div>


        </div>

      </div>
    </div>
  );
};

export default WhatIfSimulation;