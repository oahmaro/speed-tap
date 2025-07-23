import { ResetBar } from "./reset-bar";

export default {
  title: "Game/ResetBar",
  component: ResetBar,
};

export const Default = () => <ResetBar onReset={() => alert("Reset!")} />;
