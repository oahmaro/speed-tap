import React from "react";
import { Input, Button } from "@/components/ui";
import { useGame } from "../game-context";
import { InstructionsBar, Leaderboard } from "@/components/game";

export default function EntryScreen() {
  const { username, setUsername, startGame } = useGame();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      startGame();
    }
  };

  return (
    <div className="entry-bg">
      <div className="entry-bg__zigzag"></div>
      <div className="entry-bg__content">
        <main className="flex flex-col items-center justify-center min-h-[60vh] mt-32">
          <h1 className="text-6xl font-bold text-white mb-10 text-center">
            Speed Tap
          </h1>
          <form onSubmit={handleStart} className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="text-base"
            />
            <Button
              type="submit"
              className="text-base"
              disabled={!username.trim()}
            >
              START
            </Button>
          </form>
          <InstructionsBar />
          <Leaderboard />
        </main>
      </div>
    </div>
  );
}
