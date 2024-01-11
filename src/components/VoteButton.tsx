import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import updateColumn from "../database/updateColumn";

interface BtnProps {
  type?: "default" | "primary" | "success" | "warning" | "danger" | "secondary";
  variant?:
    | "solid"
    | "ghost"
    | "flat"
    | "light"
    | "faded"
    | "bordered"
    | "shadow";
  text?: string;
}

export default function VoteButton({
  type = "primary",
  variant = "flat",
  text = "Button",
}: BtnProps) {
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  useEffect(() => {
    const voted = localStorage.getItem("hasVoted");
    if (voted === "true") {
      setHasVoted(true);
    }
  }, []);

  const handleVote = async () => {
    await updateColumn();
    setHasVoted(true);
  };

  if (hasVoted) {
    return (
      <NextUIProvider>
        <Button
          color="danger"
          variant="flat"
          className="hover:opacity-70 text-center justify-center align-middle"
          disabled
        >
          Ya votaste
        </Button>
      </NextUIProvider>
    );
  }

  return (
    <NextUIProvider>
      <Button
        color={type}
        variant={variant}
        className="hover:opacity-70 text-center justify-center align-middle"
        onClick={handleVote}
      >
        {text}
      </Button>
    </NextUIProvider>
  );
}
