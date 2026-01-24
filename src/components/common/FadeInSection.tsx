import { useRef, useEffect, useState } from "react";

export default function FadeInSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{
        willChange: "opacity",
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
