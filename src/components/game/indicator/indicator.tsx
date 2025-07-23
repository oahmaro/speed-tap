import React from "react";

export type IndicatorSide = "left" | "right";

interface IndicatorProps {
  side: IndicatorSide;
  opacity?: number; // 0-1, for fading effect
}

export function Indicator({ side, opacity = 1 }: IndicatorProps) {
  return (
    <div className="relative w-64 h-16 flex items-center justify-center">
      {side === "left" && (
        <div
          className="absolute left-0 w-16 h-16 bg-black rounded-full"
          style={{ opacity }}
        />
      )}
      {side === "right" && (
        <div
          className="absolute right-0 w-16 h-16 bg-black rounded-full"
          style={{ opacity }}
        />
      )}
    </div>
  );
}
