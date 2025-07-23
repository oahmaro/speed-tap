"use client";

import { GameProvider } from "./game-context";
import GameViewRouter from "./game-view-router";

export default function GamePage() {
  return (
    <GameProvider>
      <GameViewRouter />
    </GameProvider>
  );
}
