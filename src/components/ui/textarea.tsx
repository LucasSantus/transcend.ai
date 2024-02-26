import * as React from "react";

import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isLoading?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isLoading, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-muted transition-all delay-150 duration-150 placeholder:text-muted-foreground focus:ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />

        {isLoading && (
          <div className="absolute bottom-2 right-2 top-2 z-10">
            <Loader2Icon className="h-5 w-5 animate-spin text-zinc-400" />
          </div>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
