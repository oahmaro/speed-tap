import { enrichUser, Gender, EnrichedData } from './enrich';

// In-memory user storage (persists during server runtime)
let users: User[] = [];

interface User {
  id: string;
  name: string;
  steps: number;
  gender: Gender;
  enrichedData?: EnrichedData;
}

// Handle user creation and update. Enrich new users with gender and mock profile.
export async function POST(req: Request) {
  const { name, steps } = await req.json();

  if (!name || typeof steps !== 'number') {
    return new Response(JSON.stringify({ error: 'Missing or invalid name/steps' }), { status: 400 });
  }

  // Check if user exists
  let user = users.find(u => u.name === name);

  if (user) {
    // Only update if new score is higher (preserve best score)
    if (steps > user.steps) {
      user.steps = steps;
    }
  } else {
    // Use enrichment utility for new users
    const { gender, enrichedData } = await enrichUser(name);
    user = {
      id: Math.random().toString(36).slice(2, 11),
      name,
      steps,
      gender,
      enrichedData,
    };
    users.push(user);
  }

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// GET: Return users sorted by steps (leaderboard)
export async function GET() {
  const sorted = [...users].sort((a, b) => b.steps - a.steps);
  return new Response(JSON.stringify(sorted), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
} 