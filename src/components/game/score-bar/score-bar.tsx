import React from "react";

type ScoreBarProps = {
  steps: number;
};

export const ScoreBar: React.FC<ScoreBarProps> = ({ steps }) => (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 text-lg font-bold z-10">
    <span className="text-yellow-400">SUCCESS COUNT:</span>{" "}
    <span className="text-white">{steps}</span>
  </div>
);
