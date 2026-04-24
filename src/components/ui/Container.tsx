import { type PropsWithChildren } from "react";

type Props = PropsWithChildren<{ className?: string }>;

const Container = ({ className, children }: Props) => (
  <div className={`rr-container ${className ?? ""}`}>{children}</div>
);

export default Container;
