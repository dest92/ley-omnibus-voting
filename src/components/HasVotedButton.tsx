import { NextUIProvider, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function HasVottedButton() {
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  useEffect(() => {
    const voted = localStorage.getItem("hasVoted");
    if (voted === "true") {
      setHasVoted(true);
    }
  }, []);

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
}
