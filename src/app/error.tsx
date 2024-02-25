"use client";

import ErrorHandling from "@/components/error-handling";
import { ErrorHandlingType } from "@/types/error-handling";

export default function GlobalErrorHandling(props: ErrorHandlingType) {
  return <ErrorHandling {...props} />;
}
