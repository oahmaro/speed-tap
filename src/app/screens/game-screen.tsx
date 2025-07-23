import React from "react";
import {
  PlayerBar,
  ScoreBar,
  ResetBar,
  InstructionsBar,
  Indicator,
} from "@/components/game";
import { useGame } from "../game-context";
import { AnimatedCircleBackground } from "@/components/game";

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
    <div style={{ position: "relative", minHeight: "100vh", width: "100vw" }}>
      <AnimatedCircleBackground />
      <PlayerBar username={username} />
      <ScoreBar steps={steps} />
      <ResetBar onReset={reset} />
      <InstructionsBar />
      <div className="flex items-center justify-center min-h-screen w-full px-8">
        {/* Left indicator */}
        <div className="relative w-32 h-16 flex items-center justify-center">
          {gameState === "indicator" && indicatorSide === "left" && (
            <Indicator side="left" opacity={1 - indicatorProgress} />
          )}
        </div>
        {/* Center message */}
        <div className="flex-1 text-center text-2xl text-white font-bold drop-shadow-lg">
          {gameState === "indicator"
            ? "Press 'A' for left, 'L' for right!"
            : "Get ready... Don't press anything yet!"}
        </div>
        {/* Right indicator */}
        <div className="relative w-32 h-16 flex items-center justify-center">
          {gameState === "indicator" && indicatorSide === "right" && (
            <Indicator side="right" opacity={1 - indicatorProgress} />
          )}
        </div>
      </div>
      {gameState === "indicator" &&
        ["success", "wrong", "tooLate"].includes(
          (feedback || "") as string
        ) && (
          <div className="fixed bottom-8 left-0 w-full flex justify-center z-50">
            <span
              className={`px-6 py-3 rounded-full font-bold text-xl shadow-lg bg-white/80 ${
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
            </span>
          </div>
        )}
      {gameState === "waiting" && feedback === "tooSoon" && (
        <div className="fixed bottom-8 left-0 w-full flex justify-center z-50">
          <span className="px-6 py-3 rounded-full font-bold text-xl shadow-lg bg-white/80 text-red-600">
            Too Soon
          </span>
        </div>
      )}
    </div>
  );
}
