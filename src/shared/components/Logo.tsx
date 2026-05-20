import { cn } from "@/shared/lib/cn";

type Props = {
  className?: string;
};

export const Logo = ({ className }: Props) => (
  <span
    aria-hidden="true"
    className={cn(
      "inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy text-brand-mint",
      className,
    )}
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </svg>
  </span>
);
