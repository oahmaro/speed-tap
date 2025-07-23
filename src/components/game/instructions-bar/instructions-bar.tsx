import React from "react";

type InstructionsBarProps = {
  fixed?: boolean;
};

export const InstructionsBar: React.FC<InstructionsBarProps> = ({
  fixed = true,
}) => (
  <div
    className={
      (fixed ? "fixed bottom-4 left-4 z-10 p-0 text-white" : "p-0 text-white") +
      ""
    }
  >
    <ul>
      <li>WAIT FOR THE CIRCLE TO APPEAR</li>
      <li>
        PRESS <span className="text-yellow-400">'A'</span> IF IT APPEARS ON THE
        LEFT
      </li>
      <li>
        PRESS <span className="text-yellow-400">'L'</span> IF IT APPEARS ON THE
        RIGHT
      </li>
      <li>YOU HAVE 1 SECOND TO REACT!</li>
    </ul>
  </div>
);
