"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";

export default function Home() {
  const [username, setUsername] = useState("");
  const [gameState, setGameState] = useState<"entry" | "waiting" | "indicator">(
    "entry"
  );

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setGameState("waiting");
      // Wait 2-5 seconds, then show indicator
      const delay = 2000 + Math.random() * 3000;
      setTimeout(() => {
        setGameState("indicator");
      }, delay);
    }
  };

  if (gameState === "indicator") {
    return (
      <div className="flex flex-col items-center mt-24 text-2xl font-bold">
        [Indicator placeholder]
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
