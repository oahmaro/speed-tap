import React from "react";

type ResetBarProps = {
  onReset: () => void;
};

export const ResetBar: React.FC<ResetBarProps> = ({ onReset }) => (
  <button
    className="fixed top-4 right-4 px-4 py-1 border rounded bg-white text-black hover:bg-gray-100 z-10"
    onClick={onReset}
  >
    Reset Game
  </button>
);
