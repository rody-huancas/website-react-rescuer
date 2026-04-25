export type LiveExampleMode = "render" | "async" | "recovery" | "observability";

export interface LiveExampleProps {
  mode       : LiveExampleMode;
  title      : string;
  description: string;
  code       : string;
}
