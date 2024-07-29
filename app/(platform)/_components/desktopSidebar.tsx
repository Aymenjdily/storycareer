"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Book, Heart, LayoutDashboard, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarLinks } from "./mobileSidebar";

const DesktopSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="md:flex hidden flex-col h-full border-r pr-5 space-y-2 w-64">
      {SidebarLinks.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "h-10 px-4 py-2 flex items-center gap-x-2 text-sm hover:bg-primary rounded-md transition-colors duration-200 font-medium hover:text-primary-foreground w-full",
            pathname.startsWith(href) &&
              "bg-primary text-primary-foreground font-semibold"
          )}
        >
          <Icon className="h-5 w-5" />
          {label}
        </Link>
      ))}
    </div>
  );
};

export default DesktopSidebar;
