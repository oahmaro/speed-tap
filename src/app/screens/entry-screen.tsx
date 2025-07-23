import React from "react";
import { Input, Button } from "@/components/ui";
import { useGame } from "../game-context";

export default function EntryScreen() {
  const { username, setUsername, startGame } = useGame();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      startGame();
    }
  };

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
