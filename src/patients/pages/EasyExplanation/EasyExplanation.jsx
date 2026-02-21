/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import "./EasyExplanation.css";
import { db } from "../../../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

export default function EasyExplanation() {

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const doctorEmail = localStorage.getItem("doctorEmail");

    // ❌ Not logged in
    if (!doctorEmail) {
      alert("Please login first ❗");
      setLoading(false);
      return;
    }

    const fetchMessage = async () => {

      const q = query(
        collection(db, "explanations"),
        where("doctorEmail", "==", doctorEmail)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setMessage(snapshot.docs[0].data().message);
      } else {
        setMessage("No explanation available.");
      }

      setLoading(false);
    };

    fetchMessage();

  }, []);

  return (
    <div className="easy-explanation">

      <h3 className="title">Easy Explanation</h3>
      <p className="subtitle">Why your score looks like this</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list">
          <li>{message}</li>
        </ul>
      )}

    </div>
  );
}