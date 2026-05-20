import { cn } from "@/shared/lib/cn";

type Props = React.ComponentProps<"div">;

export const Skeleton = ({ className, ...props }: Props) => (
  <div
    aria-hidden="true"
    className={cn("shimmer rounded-md", className)}
    {...props}
  />
);
