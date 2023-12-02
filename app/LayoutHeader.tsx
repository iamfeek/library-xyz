"use client";

import { usePathname } from "next/navigation";
import { navigation } from "./Navbar";

export const LayoutHeader = () => {
  const pathname = usePathname();
  const currentRoute = navigation.find((nav) => pathname === nav.href);

  return (
    <header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          {currentRoute ? currentRoute.name : "Library XYZ"}
        </h1>
      </div>
    </header>
  );
};
