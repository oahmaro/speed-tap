import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  steps: number;
  gender: string;
  enrichedData?: any;
}

export function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    // Refresh leaderboard every 3 seconds to show real-time updates
    const interval = setInterval(fetchUsers, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="mt-8 text-center">
        <div className="text-white/70">Loading leaderboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 text-center">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="mt-8 text-center">
        <div className="text-white/70">No players yet. Be the first!</div>
      </div>
    );
  }

  return (
    <div className="mt-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Leaderboard
      </h2>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <div className="space-y-2">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <span className="text-white font-medium">{user.name}</span>
              </div>
              <div className="text-white font-bold">{user.steps}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
