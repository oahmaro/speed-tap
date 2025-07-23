export type Gender = 'male' | 'female' | 'undetermined';

export interface EnrichedData {
  gender?: string;
  name?: { title: string; first: string; last: string };
  email?: string;
  picture?: { large: string; medium: string; thumbnail: string };
  [key: string]: any;
}

export async function enrichUser(name: string): Promise<{ gender: Gender; enrichedData?: EnrichedData }> {
  let gender: Gender = 'undetermined';
  let enrichedData: EnrichedData | undefined = undefined;

  // Genderize.io API
  try {
    const genderizeRes = await fetch(`https://api.genderize.io?name=${encodeURIComponent(name)}`);
    if (genderizeRes.ok) {
      const genderizeData = await genderizeRes.json();
      if (genderizeData.gender && genderizeData.probability > 0.95) {
        gender = genderizeData.gender;
      }
    }
  } catch (e) {
    console.error('Genderize.io error:', e);
  }

  // Random User Generator API
  if (gender === 'male' || gender === 'female') {
    try {
      const randomUserRes = await fetch(`https://randomuser.me/api/?gender=${gender}`);
      if (randomUserRes.ok) {
        const randomUserData = await randomUserRes.json();
        if (randomUserData.results && randomUserData.results.length > 0) {
          enrichedData = randomUserData.results[0];
        }
      }
    } catch (e) {
      console.error('Random User Generator error:', e);
    }
  }

  return { gender, enrichedData };
} 