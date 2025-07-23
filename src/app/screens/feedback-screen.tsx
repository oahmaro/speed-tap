import React from "react";
import {
  PlayerBar,
  ScoreBar,
  ResetBar,
  InstructionsBar,
} from "@/components/game";
import { useGame } from "../game-context";

export default function FeedbackScreen() {
  const { username, steps, reset } = useGame();
  return (
    <>
      <PlayerBar username={username} />
      <ScoreBar steps={steps} />
      <ResetBar onReset={reset} />
      <InstructionsBar />
      <div className="flex flex-col items-center mt-24 text-2xl font-bold">
        Next round starting...
      </div>
    </>
  );
}
