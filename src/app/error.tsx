'use client'; 

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-destructive/10 p-3 rounded-full">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="mt-4 text-2xl">Something went wrong!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We're sorry, but an unexpected error occurred. You can try to go
            back or refresh the page.
          </p>
          <pre className="text-xs text-left bg-muted p-4 rounded-md overflow-x-auto text-destructive">
            <code>Error: {error.message}</code>
          </pre>
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
