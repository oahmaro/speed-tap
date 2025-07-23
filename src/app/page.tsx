"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";

export default function Home() {
  const [username, setUsername] = useState("");
  const [started, setStarted] = useState(false);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setStarted(true);
      // For now, just log or show a placeholder
      alert(`Game will start for: ${username}`);
    }
  };

  if (started) {
    return <div>Game will go here...</div>;
  }

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
