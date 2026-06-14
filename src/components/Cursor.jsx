import { useEffect, useState } from "react";

function Cursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest("button, a")) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Ring */}
      <div
        className={`pointer-events-none fixed z-[9999] rounded-full border border-blue-400/50 transition-all duration-200 ease-out ${
          hovering
            ? "h-14 w-14 border-blue-400"
            : "h-8 w-8"
        }`}
        style={{
          left: position.x - (hovering ? 28 : 16),
          top: position.y - (hovering ? 28 : 16),
        }}
      />

      {/* Dot */}
      <div
        className="pointer-events-none fixed z-[9999] h-2 w-2 rounded-full bg-white"
        style={{
          left: position.x - 4,
          top: position.y - 4,
        }}
      />
    </>
  );
}

export default Cursor;