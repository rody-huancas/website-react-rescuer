import { type PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type Props = PropsWithChildren<{ className?: string }>;

const Container = ({ className, children }: Props) => (
  <div className={cn("rr-container", className)}>{children}</div>
);

export default Container;
