import type { Meta, StoryObj } from "@storybook/react";
import AnimatedCircleBackground from "./animated-circle-background";

const meta: Meta<typeof AnimatedCircleBackground> = {
  component: AnimatedCircleBackground,
  title: "game/AnimatedCircleBackground",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100vw",
          height: "60vh",
          background: "linear-gradient(180deg, #a259ff 0%, #6c63ff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof AnimatedCircleBackground>;

export const Default: Story = {};
