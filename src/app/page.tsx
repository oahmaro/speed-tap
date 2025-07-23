"use client";

import { Button, Input } from "@/components/ui";
import { useGame } from "./useGame";
import { Indicator } from "@/components/game";

export default function Home() {
  const {
    username,
    setUsername,
    gameState,
    indicatorSide,
    startGame,
    feedback,
  } = useGame();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      startGame();
    }
  };

  if (gameState === "indicator" && indicatorSide) {
    return (
      <>
        <Indicator side={indicatorSide} />
        {feedback && (
          <div
            className={`fixed bottom-8 left-0 w-full text-center text-xl font-semibold ${
              feedback === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback === "success" ? "Success!" : "Wrong Key"}
          </div>
        )}
      </>
    );
  }

  if (gameState === "waiting") {
    return (
      <div className="flex flex-col items-center mt-24 text-xl">
        Get ready...
      </div>
    );
  }

  // entry state
  return (
    <main className="flex flex-col items-center mt-24">
      <form onSubmit={handleStart} className="flex gap-2">
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
