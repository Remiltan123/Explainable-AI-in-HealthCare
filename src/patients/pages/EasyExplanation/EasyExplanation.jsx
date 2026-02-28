// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useEffect, useState } from "react";
// import "./EasyExplanation.css";
// import { db } from "../../../firebaseConfig";
// import {
//   collection,
//   query,
//   where,
//   getDocs
// } from "firebase/firestore";

// export default function EasyExplanation() {

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const doctorEmail = localStorage.getItem("doctorEmail");

//     // ❌ Not logged in
//     if (!doctorEmail) {
//       alert("Please login first ❗");
//       setLoading(false);
//       return;
//     }

//     const fetchMessage = async () => {

//       const q = query(
//         collection(db, "explanations"),
//         where("doctorEmail", "==", doctorEmail)
//       );

//       const snapshot = await getDocs(q);

//       if (!snapshot.empty) {
//         setMessage(snapshot.docs[0].data().message);
//       } else {
//         setMessage("No explanation available.");
//       }

//       setLoading(false);
//     };

//     fetchMessage();

//   }, []);

//   return (
//     <div className="easy-explanation">

//       <h3 className="title">Easy Explanation</h3>
//       <p className="subtitle">Why your score looks like this</p>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul className="list">
//           <li>{message}</li>
//         </ul>
//       )}

//     </div>
//   );
// }


/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import "./EasyExplanation.css";

export default function EasyExplanation() {

  const [explanations, setExplanations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Example ML Response (you will replace this with API response)
  const mlResponse = {
    prediction: 1,
    probability: 1.0,
    result: "Diabetic",
    explanations: {
      shap: {
        "num__Age": 0.013,
        "num__Glucose": 6.85,
        "num__Blood Pressure": -0.11,
        "num__Skin Thickness": 0.05,
        "num__Insulin": -0.41,
        "num__BMI": 2.18,
      },
    },
  };

  useEffect(() => {
    const generateEasyExplanation = (result, shap) => {
      let messages = [];

      if (result === "Diabetic") {
        messages.push(
          "Your result indicates a high risk of diabetes."
        );
      }

      if (shap["num__Glucose"] > 1) {
        messages.push(
          "Your blood sugar level is much higher than normal, which is the main reason for this result."
        );
      }

      if (shap["num__BMI"] > 1) {
        messages.push(
          "Your body weight is above the healthy range, increasing your risk of diabetes."
        );
      }

      if (shap["num__Insulin"] < 0) {
        messages.push(
          "Your body may not be using insulin efficiently, which affects blood sugar control."
        );
      }

      messages.push(
        "Other factors such as blood pressure and lifestyle habits had a smaller impact."
      );

      messages.push(
        "Healthy eating, regular physical activity, and medical guidance can help reduce your risk."
      );

      return messages;
    };

    const easyText = generateEasyExplanation(
      mlResponse.result,
      mlResponse.explanations.shap
    );

    setExplanations(easyText);
    setLoading(false);

  }, []);

  return (
    <div className="easy-explanation">

      <h3 className="title">Easy Explanation</h3>
      <p className="subtitle">Why your result looks like this</p>

      {loading ? (
        <p>Loading explanation...</p>
      ) : (
        <ul className="list">
          {explanations.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      )}

    </div>
  );
}