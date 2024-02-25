"use client";

import { Button } from "@/components/ui/button";
import { ErrorHandlingType } from "@/types/error-handling";
import { RefreshCcwIcon } from "lucide-react";
import { useEffect } from "react";

export default function ErrorHandling({ error, reset }: ErrorHandlingType) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <h2 className="text-center text-sm font-medium text-red-600">
        Ocorreu um erro inesperado!
      </h2>
      <Button
        onClick={() => reset()}
        icon={<RefreshCcwIcon className="size-4" />}
      >
        Tentar Novamente
      </Button>
    </div>
  );
}
