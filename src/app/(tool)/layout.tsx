import type { ReactNode } from "react";
import ModeNav from "@/components/ModeNav";

export default function ToolLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ModeNav />
      {children}
    </>
  );
}
