import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import updateColumn, { updateContraColumn } from "../database/updateColumn";

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

  const handleVoteTrue = async () => {
    await updateColumn();
    setHasVoted(true);
  };
  const handleVoteFalse = async () => {
    await updateContraColumn();
    setHasVoted(true);
  };

  if (hasVoted) {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
      <NextUIProvider>
        <div className="flex flex-col items-center justify-center">
          <Button
            color="success"
            variant={variant}
            className="hover:opacity-70 mb-2" // Añadido mb-2 para espacio entre los botones
            onClick={handleVoteTrue}
          >
            Sí, estoy a favor
          </Button>
          <Button
            color="danger"
            variant={variant}
            className="hover:opacity-70"
            onClick={handleVoteFalse}
          >
            No, estoy en contra
          </Button>
        </div>
      </NextUIProvider>
    </>
  );
}
