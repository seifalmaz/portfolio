function Card({ children, className = "", hover = true }) {
  return (
    <div
      className={`rounded-2xl border border-[#D2C7B6]/15 bg-[#211f1e] p-6 transition duration-200 ease-out ${
        hover ? "hover:border-[#6E2638] hover:shadow-[0_8px_30px_rgba(110,38,56,0.15)] md:hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
