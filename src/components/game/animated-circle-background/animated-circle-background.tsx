import React from "react";

const AnimatedCircleBackground = () => (
  <div className="animated-circle-bg">
    {[0, 1, 2, 3].map((i) => (
      <svg
        key={i}
        viewBox="0 0 100 100"
        className={`animated-circle animated-circle--${i}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          stroke="rgba(255,255,255,0.1)"
          fill="none"
          strokeWidth={i % 2 === 0 ? 1 : 4}
        />
      </svg>
    ))}
  </div>
);

export default AnimatedCircleBackground;
