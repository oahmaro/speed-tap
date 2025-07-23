# Speed Tap

This is a [Next.js](https://nextjs.org) home assignment project. It is designed to be easy to run and review, with no external database or complex setup required.

## Getting Started

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Storybook (UI Components)

To view and develop UI components in isolation, you can run Storybook:

```bash
npm run storybook
# or
yarn storybook
# or
pnpm storybook
# or
bun storybook
```

Storybook will be available at [http://localhost:6006](http://localhost:6006).

## Project Notes

- **No database setup required:**
  - All user and leaderboard data is stored in-memory for simplicity and ease of review. Data will reset on server restart.
  - In a production scenario, a persistent database would be used.
- **APIs used for enrichment:**
  - [Genderize.io](https://genderize.io/) to guess user gender (probability > 0.95, otherwise "undetermined").
  - [Random User Generator](https://randomuser.me/) to fetch mock profile data based on gender.
- **Leaderboard:**
  - The backend provides an API endpoint to return the leaderboard, sorted by steps. No UI is provided for the leaderboard as per assignment requirements.

## Folder Structure

- `src/app/` — Main app and screens
- `src/components/` — UI and game components
- `src/app/api/` — Backend API routes

---

For any questions or issues, please contact the author.
