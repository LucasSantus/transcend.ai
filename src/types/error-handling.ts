export interface ErrorHandlingType {
  error: Error & { digest?: string };
  reset: () => void;
}
