"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function RootNavWrapper() {
  const pathname = usePathname();

  // On the Phase 01 3D homepage, navigation is fully integrated into the 3D spatial experience.
  // We render the standard Navbar only on subpages (/work, /about, etc.).
  if (pathname === "/") {
    return null;
  }

  return <Navbar />;
}
