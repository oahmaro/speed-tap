import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "ui/Button",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Download Now",
    variant: "default",
    size: "md",
  },
};

export const DefaultSmall: Story = {
  args: {
    children: "Download Now",
    variant: "default",
    size: "sm",
  },
};

export const DefaultLarge: Story = {
  args: {
    children: "Download Now",
    variant: "default",
    size: "lg",
  },
};

export const Secondary: Story = {
  args: {
    children: "Creative",
    variant: "secondary",
    size: "md",
  },
};

export const SecondarySmall: Story = {
  args: {
    children: "Creative",
    variant: "secondary",
    size: "sm",
  },
};

export const SecondaryLarge: Story = {
  args: {
    children: "Creative",
    variant: "secondary",
    size: "lg",
  },
};
