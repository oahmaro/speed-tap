import { InstructionsBar } from "./instructions-bar";

export default {
  title: "Game/InstructionsBar",
  component: InstructionsBar,
};

export const Playground = () => (
  <div
    style={{
      background: "linear-gradient(180deg, #a259ff 0%, #6c63ff 100%)",
      minHeight: 200,
      padding: 32,
    }}
  >
    <InstructionsBar fixed={false} />
  </div>
);
