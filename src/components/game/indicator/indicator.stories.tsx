import type { Meta, StoryObj } from "@storybook/react";
import { Indicator } from "./indicator";

const meta: Meta<typeof Indicator> = {
  component: Indicator,
  title: "game/Indicator",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          background: "linear-gradient(180deg, #a259ff 0%, #6c63ff 100%)",
          padding: "2rem",
          minHeight: 120,
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Indicator>;

export const Left: Story = {
  args: {
    side: "left",
  },
};

export const Right: Story = {
  args: {
    side: "right",
  },
};
