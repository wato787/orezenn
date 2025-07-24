import type { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <div className="zenn-layout flex flex-col">
      <Header />
      <main className={`flex-1 py-8 ${className}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="zenn-content p-6 md:p-8">{children}</div>
        </div>
      </main>
    </div>
  );
};
