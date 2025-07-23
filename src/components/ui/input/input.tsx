import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "funky" | "minimal";
}

function Input({ className, type, variant = "funky", ...props }: InputProps) {
  const variantClass = variant === "minimal" ? "airbnb-input" : "funky-input";
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(variantClass, className)}
      {...props}
    />
  );
}

export { Input };
