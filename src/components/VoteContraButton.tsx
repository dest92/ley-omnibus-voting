import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { updateContraColumn } from "../database/updateColumn";

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

export default function VoteContraButton({
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
    await updateContraColumn();
    setHasVoted(true);
  };

  if (hasVoted) {
    return <></>;
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
