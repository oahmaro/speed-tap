import { ScoreBar } from "./score-bar";

export default {
  title: "Game/ScoreBar",
  component: ScoreBar,
};

export const Default = () => <ScoreBar steps={5} />;

export const Playground = () => (
  <div
    style={{
      background: "linear-gradient(180deg, #a259ff 0%, #6c63ff 100%)",
      minHeight: 120,
      padding: 32,
    }}
  >
    <ScoreBar steps={5} />
  </div>
);
