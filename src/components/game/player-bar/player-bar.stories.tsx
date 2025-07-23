import { PlayerBar } from "./player-bar";

export default {
  title: "Game/PlayerBar",
  component: PlayerBar,
};

export const Default = () => <PlayerBar username="Player1" />;

export const Playground = () => (
  <div
    style={{
      background: "linear-gradient(180deg, #a259ff 0%, #6c63ff 100%)",
      minHeight: 120,
      padding: 32,
    }}
  >
    <PlayerBar username="Player1" />
  </div>
);
