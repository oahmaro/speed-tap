import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "ui/Input",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{ background: "#a259ff", padding: "2rem", minHeight: "100vh" }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Funky: Story = {
  args: {
    placeholder: "Type here...",
    variant: "funky",
  },
};

export const Minimal: Story = {
  args: {
    placeholder: "Type here...",
    variant: "minimal",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Password",
    variant: "funky",
  },
};
