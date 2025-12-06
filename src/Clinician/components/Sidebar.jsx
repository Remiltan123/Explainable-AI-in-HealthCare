import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../firebaseConfig";

function SidebarItem({ emoji, label, active, onClick }) {
  return (
    <button
      className={`sideitem ${active ? "sideitem--active" : ""}`}
      onClick={onClick}
      title={label}
    >
      <span className="sideitem__icon" role="img" aria-label={label}>
        {emoji}
      </span>
      <span className="sideitem__label">{label}</span>
    </button>
  );
}

export default function Sidebar({ active, setActive }) {
  const [userName, setUserName] = useState("Patient");
  const [profileImg, setProfileImg] = useState(null);
  const auth = getAuth(app);

  // ✅ Get Firebase user info
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.displayName || user.email?.split("@")[0] || "Patient";
        setUserName(name);
      } else {
        setUserName("Guest");
      }
    });
    return unsubscribe;
  }, [auth]);

  // ✅ Handle image upload (local preview)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImg(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="sidebar sidebar--collapsible">
      <div className="sidebar__inner">
        <div className="userpill">
          <div className="userpill__avatar" aria-hidden>
            {profileImg ? (
              <img src={profileImg} alt="User Avatar" className="avatar-img" />
            ) : (
              "🧑‍⚕️"
            )}
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              id="avatarInput"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <button
              className="avatar-edit-btn"
              onClick={() => document.getElementById("avatarInput").click()}
              title="Change picture"
            >
              ✏️
            </button>
          </div>

          <div className="userpill__text">
            <p className="userpill__name">{userName}</p>
          </div>
        </div>

        <div className="sidebar__menu">
          <SidebarItem emoji="🌎" label="SHAP Summary" active={active==="shap"} onClick={()=>setActive("shap")} />
          <SidebarItem emoji="🧩" label="LIME (Per-Patient)" active={active==="lime"} onClick={()=>setActive("lime")} />
          <SidebarItem emoji="⚖️" label="Fairness" active={active==="fairness"} onClick={()=>setActive("fairness")} />
          <SidebarItem emoji="❓" label="Uncertainty" active={active==="uncertainty"} onClick={()=>setActive("uncertainty")} />
          <SidebarItem emoji="🔬" label="What-If Simulation" active={active==="simulate"} onClick={()=>setActive("simulate")} />
        </div>
      </div>
    </aside>
  );
}
