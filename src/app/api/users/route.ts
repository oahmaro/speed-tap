// In-memory user storage
let users: User[] = [];

interface User {
  id: string;
  name: string;
  steps: number;
  gender: 'male' | 'female' | 'undetermined';
  enrichedData?: any;
}

export async function POST(req: Request) {
  const { name, steps } = await req.json();

  if (!name || typeof steps !== 'number') {
    return new Response(JSON.stringify({ error: 'Missing or invalid name/steps' }), { status: 400 });
  }

  // Check if user exists
  let user = users.find(u => u.name === name);

  if (user) {
    user.steps = steps;
  } else {
    user = {
      id: Math.random().toString(36).slice(2, 11), // Simple ID generation
      name,
      steps,
      gender: 'undetermined',
    };
    
    users.push(user);
  }

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
} 