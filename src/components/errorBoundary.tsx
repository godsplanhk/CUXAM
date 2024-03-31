import { FallbackProps } from "react-error-boundary";
import { Button } from "./ui/button";
export const fallbackRender=(function({ error, resetErrorBoundary }:FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div role="alert" className="w-auto">
      <p>Something went wrong:</p>
      <pre className="w-auto overflow-hidden" style={{ color: "red" }}>{error.message}</pre>
      <Button
      variant={'outline'}
      size={"sm"}
      onClick={resetErrorBoundary}
      >Try Again</Button>
    </div>
  );
})