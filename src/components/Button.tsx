import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({
  variant = "primary",
  children,
  onClick,
}: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
