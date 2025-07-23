import React from "react";
import { Button } from "@/components/ui/button";

type ResetBarProps = {
  onReset: () => void;
};

export const ResetBar: React.FC<ResetBarProps> = ({ onReset }) => (
  <Button
    size="sm"
    className="fixed top-4 right-4 z-10"
    variant="secondary"
    onClick={onReset}
  >
    Reset Game
  </Button>
);
