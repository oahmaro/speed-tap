"use client";

import { Button, Input } from "@/components/ui";
import { useGame } from "./useGame";

export default function Home() {
  const { username, setUsername, gameState, indicatorSide, startGame } =
    useGame();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      startGame();
    }
  };

  if (gameState === "indicator") {
    return (
      <div className="flex flex-col items-center mt-24 text-2xl font-bold">
        [Indicator placeholder: {indicatorSide}]
      </div>
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
