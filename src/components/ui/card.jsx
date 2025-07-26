// src/components/ui/card.jsx
export function Card({ children, className = "" }) {
  return (
    <div
      className={
        "backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl shadow-lg " +
        className
      }
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={"p-6 " + className}>
      {children}
    </div>
  );
}
