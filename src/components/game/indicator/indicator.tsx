import React from "react";

export type IndicatorSide = "left" | "right";

interface IndicatorProps {
  side: IndicatorSide;
}

export function Indicator({ side }: IndicatorProps) {
  return (
    <div className="flex w-full justify-between items-center mt-24">
      <div className="flex-1 flex justify-start">
        {side === "left" && <div className="w-16 h-16 bg-black rounded-full" />}
      </div>
      <div className="flex-1 flex justify-end">
        {side === "right" && (
          <div className="w-16 h-16 bg-black rounded-full" />
        )}
      </div>
    </div>
  );
}
