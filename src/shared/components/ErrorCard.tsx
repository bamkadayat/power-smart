"use client";

import { Button } from "@/shared/ui/button";

type Props = {
  title: string;
  message: string;
  onRetry?: () => void;
};

export const ErrorCard = ({ title, message, onRetry }: Props) => (
  <div
    role="alert"
    className="rounded-lg border border-border bg-card p-6 text-card-foreground"
  >
    <p className="font-semibold">{title}</p>
    <p className="mt-1 text-sm text-muted-foreground">{message}</p>
    {onRetry ? (
      <Button
        type="button"
        variant="outline"
        onClick={onRetry}
        className="mt-4"
      >
        Try again
      </Button>
    ) : null}
  </div>
);
