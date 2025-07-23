import React from "react";

export const InstructionsBar: React.FC = () => (
  <div className="fixed bottom-4 left-4 text-gray-600 text-base z-10 bg-white/80 rounded p-2">
    Instructions:
    <ul className="list-disc ml-6">
      <li>Wait for the circle to appear</li>
      <li>Press 'A' if it appears on the left</li>
      <li>Press 'L' if it appears on the right</li>
      <li>You have 1 second to react!</li>
    </ul>
  </div>
);
