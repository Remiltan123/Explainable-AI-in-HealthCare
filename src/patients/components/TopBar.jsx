export default function TopBar() {
  return (
    <div className="topbar">
      <h1 className="topbar__title">Patient View Dashboard</h1>
      <div className="topbar__actions">
        <button className="btn btn--ghost">🔐 <span>Login</span></button>
        <button className="btn btn--primary">🧾 <span>Checkout</span></button>
      </div>
    </div>
  );
}
