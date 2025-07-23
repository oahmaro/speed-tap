"use client";

import { useGame } from "./useGame";
import { Button, Input } from "@/components/ui";

import {
  ResetBar,
  ScoreBar,
  PlayerBar,
  InstructionsBar,
} from "@/components/game";

export default function Home() {
  const {
    username,
    setUsername,
    gameState,
    indicatorSide,
    startGame,
    reset,
    feedback,
    steps,
    indicatorProgress,
  } = useGame();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      startGame();
    }
  };

  if (
    feedback &&
    gameState !== "entry" &&
    gameState !== "indicator" &&
    gameState !== "waiting"
  ) {
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

  if (gameState === "indicator" || gameState === "waiting") {
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

  // entry state
  return (
    <main className="flex flex-col items-center mt-24">
      <form onSubmit={handleStart} className="flex gap-2 mt-16">
        <Input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="text-base"
        />
        <Button type="submit" className="text-base">
          START
        </Button>
      </form>
    </main>
  );
}
