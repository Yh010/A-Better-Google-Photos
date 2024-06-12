// components/ui/Button.tsx
import React from "react";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return <button {...props}>{children}</button>;
};

export default Button;
