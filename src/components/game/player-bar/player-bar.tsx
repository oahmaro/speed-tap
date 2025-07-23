import React from "react";

type PlayerBarProps = {
  username: string;
};

export const PlayerBar: React.FC<PlayerBarProps> = ({ username }) => {
  if (!username) return null;
  return (
    <div className="fixed top-4 left-4 text-lg font-bold z-10">
      <span className="text-yellow-400">PLAYER:</span>{" "}
      <span className="text-white">{username}</span>
    </div>
  );
};
