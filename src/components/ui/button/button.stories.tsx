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

export const Disabled: Story = {
  args: {
    children: "Disabled",
    variant: "default",
    size: "md",
    disabled: true,
  },
};

export const DisabledSecondary: Story = {
  args: {
    children: "Disabled",
    variant: "secondary",
    size: "md",
    disabled: true,
  },
};

export const AllSizes = {
  render: () => (
    <div
      style={{
        background: "#a259ff",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Button size="sm" variant="default">
          Small
        </Button>
        <Button size="md" variant="default">
          Medium
        </Button>
        <Button size="lg" variant="default">
          Large
        </Button>
      </div>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Button size="sm" variant="secondary">
          Small
        </Button>
        <Button size="md" variant="secondary">
          Medium
        </Button>
        <Button size="lg" variant="secondary">
          Large
        </Button>
      </div>
    </div>
  ),
};
