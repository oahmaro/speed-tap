import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "funky-btn--sm",
  md: "funky-btn--md",
  lg: "funky-btn--lg",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variantClass =
      variant === "secondary" ? "funky-btn funky-btn--secondary" : "funky-btn";
    const sizeClass = sizeClasses[size] || sizeClasses.md;
    return (
      <button
        ref={ref}
        className={[variantClass, sizeClass, className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
