function SidebarItem({ emoji, label, active, onClick }) {
  return (
    <button
      className={`sideitem ${active ? "sideitem--active" : ""}`}
      onClick={onClick}
      title={label}           /* tooltip when collapsed */
    >
      <span className="sideitem__icon" role="img" aria-label={label}>
        {emoji}
      </span>
      {/* label hidden by default via CSS; shown on hover or when active */}
      <span className="sideitem__label">{label}</span>
    </button>
  );
}

export default function Sidebar({ active, setActive }) {
  return (
    <aside className="sidebar sidebar--collapsible">
      <div className="sidebar__inner">
        <div className="userpill">
          <div className="userpill__avatar" aria-hidden>🧑‍⚕️</div>
          <div className="userpill__text">
            <p className="userpill__hint">User name</p>
            <p className="userpill__name">Patient</p>
          </div>
        </div>

        <div className="sidebar__menu">
          <SidebarItem emoji="📈" label="Risk Meter"        active={active==="risk"}     onClick={() => setActive("risk")} />
          <SidebarItem emoji="📘" label="Easy Explanation"  active={active==="easy"}     onClick={() => setActive("easy")} />
          <SidebarItem emoji="💓" label="Personalized Recos" active={active==="recos"}   onClick={() => setActive("recos")} />
          <SidebarItem emoji="✅" label="Progress Tracking" active={active==="progress"} onClick={() => setActive("progress")} />
          <SidebarItem emoji="🔔" label="Upcoming Goals"    active={active==="goals"}    onClick={() => setActive("goals")} />
        </div>

        {/*
        <div className="sidebar__foot">
          <span>© 2025 CareDash</span>
          <span>v1.0</span>
        </div>
        */}
      </div>
    </aside>
  );
}
