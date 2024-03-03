import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BugIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full flex-1 flex-col items-center justify-center text-center">
      <div className="space-y-3">
        <BugIcon className="inline-block size-16" />
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-7xl">
          404 Not Found
        </h1>
        <h3 className="text-lg font-medium tracking-tighter md:text-xl lg:text-2xl">
          Uh oh! This page does not exist.
        </h3>
        <p className="mx-auto max-w-lg px-2 text-muted-foreground">
          You ve hit a route that does not exist. The best course of action is
          to turn around and head back to safety.
        </p>
        <Link
          className={cn(
            buttonVariants({
              variant: "default",
              size: "default",
              className: "!text-primary-foreground",
            }),
          )}
          href="/"
        >
          Take me home
        </Link>
      </div>
    </main>
  );
}
