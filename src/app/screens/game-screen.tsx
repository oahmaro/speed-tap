import React from "react";
import {
  PlayerBar,
  ScoreBar,
  ResetBar,
  InstructionsBar,
} from "@/components/game";
import { useGame } from "../game-context";

export default function GameScreen() {
  const {
    username,
    steps,
    reset,
    gameState,
    indicatorSide,
    indicatorProgress,
    feedback,
  } = useGame();

  return (
    <>
      <PlayerBar username={username} />
      <ScoreBar steps={steps} />
      <ResetBar onReset={reset} />
      <InstructionsBar />
      <div className="flex items-center justify-center min-h-screen w-full px-8">
        {/* Left circle or empty */}
        <div className="relative w-32 h-16 flex items-center justify-center">
          {gameState === "indicator" && indicatorSide === "left" && (
            <div
              className="absolute left-0 w-16 h-16 bg-black rounded-full"
              style={{ opacity: 1 - indicatorProgress }}
            />
          )}
        </div>
        {/* Center message */}
        <div className="flex-1 text-center text-lg text-gray-700">
          {gameState === "indicator"
            ? "Press 'A' for left, 'L' for right!"
            : "Get ready... Don't press anything yet!"}
        </div>
        {/* Right circle or empty */}
        <div className="relative w-32 h-16 flex items-center justify-center">
          {gameState === "indicator" && indicatorSide === "right" && (
            <div
              className="absolute right-0 w-16 h-16 bg-black rounded-full"
              style={{ opacity: 1 - indicatorProgress }}
            />
          )}
        </div>
      </div>
      {gameState === "indicator" && feedback && (
        <div
          className={`fixed bottom-8 left-0 w-full text-center text-xl font-semibold ${
            feedback === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback === "success"
            ? "Success!"
            : feedback === "wrong"
            ? "Wrong Key"
            : feedback === "tooLate"
            ? "Too Late"
            : null}
        </div>
      )}
      {gameState === "waiting" && feedback === "tooSoon" && (
        <div className="fixed bottom-8 left-0 w-full text-center text-xl font-semibold text-red-600">
          Too Soon
        </div>
      )}
    </>
  );
}
