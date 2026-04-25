"use client";

import useGsapEnter from "@/hooks/useGsapEnter";

const DocEnter = ({ children }: { children: React.ReactNode }) => {
  const ref = useGsapEnter({ y: 10, duration: 0.5 });
  return (
    <div ref={ref} className="min-w-0 pr-2">
      {children}
    </div>
  );
};

export default DocEnter;
