import { useEffect, useState } from "react";
import "./cursor.css";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });

    const addHover = () => setHover(true);
    const removeHover = () => setHover(false);

    window.addEventListener("mousemove", move);

    document.querySelectorAll("a, button, .card").forEach(el => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        className={`cursor-dot ${hover ? "hover" : ""}`}
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className={`cursor-ring ${hover ? "hover" : ""}`}
        style={{ left: pos.x, top: pos.y }}
      />
    </>
  );
}