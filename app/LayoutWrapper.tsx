"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldHideNavbarAndFooter = pathname.startsWith("/protected/") && pathname !== "/protected";

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideNavbarAndFooter && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!shouldHideNavbarAndFooter && <Footer />}
    </div>
  );
}
