export default function Card({ title, subtitle, right, children }) {
  return (
    <div className="card">
      <div className="card__head">
        <div>
          <h3 className="card__title">{title}</h3>
          {subtitle && <p className="card__subtitle">{subtitle}</p>}
        </div>
        {right}
      </div>
      <div className="card__body">{children}</div>
    </div>
  );
}
