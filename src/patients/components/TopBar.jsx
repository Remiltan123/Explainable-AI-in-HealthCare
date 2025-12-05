import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();
  return (
    <div className="topbar">
      <h1 className="topbar__title">Patient View Dashboard</h1>
      <div className="topbar__actions">
        <button className="btn btn--ghost" onClick={() => navigate("/auth")}>🔐 <span>Login</span></button>
        
      </div>
    </div>
  );
}
