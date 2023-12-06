"use client";

import { usePathname } from "next/navigation";
import { navigation } from "./navbar";

export const LayoutHeader = () => {
  const pathname = usePathname();
  const currentRoute = navigation.find((nav) => pathname === nav.href);

  const computeHeader = () => {
    if (pathname.includes("/acknowledgement/")) {
      return "Successful Booking";
    }

    return currentRoute ? currentRoute.name : "Library XYZ";
  };

  return (
    <header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          {computeHeader()}
        </h1>
      </div>
    </header>
  );
};
