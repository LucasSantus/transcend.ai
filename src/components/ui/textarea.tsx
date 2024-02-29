import * as React from "react";

import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isLoading?: boolean;
  shouldDisplayNumberOfCharacters?: boolean;
  limitCharacters?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      isLoading,
      shouldDisplayNumberOfCharacters = false,
      limitCharacters = 0,
      value,
      ...props
    },
    ref,
  ) => {
    const shouldDisplayMaxCounter =
      shouldDisplayNumberOfCharacters && typeof value === "string";

    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-muted transition-all delay-150 duration-150 placeholder:text-muted-foreground focus:ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          value={value}
          maxLength={shouldDisplayMaxCounter ? limitCharacters : undefined}
          {...props}
        />

        {isLoading && (
          <div className="absolute bottom-2 right-2 top-2 z-10">
            <Loader2Icon className="h-5 w-5 animate-spin text-zinc-400" />
          </div>
        )}

        {shouldDisplayMaxCounter && (
          <div className="flex justify-end p-1">
            {limitCharacters !== 0 ? (
              <span className="text-xs">
                {value?.length}/{limitCharacters}
              </span>
            ) : (
              <span className="text-xs">{value?.length}</span>
            )}
          </div>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
