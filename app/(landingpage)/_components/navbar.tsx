"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { ModeToggle } from "@/components/modeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Plus } from "lucide-react";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const NavLinks = [
  { label: "Home", href: "/" },
  { label: "Share your story", href: "/story" },
  { label: "Browse stories", href: "/stories" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="py-5 fixed z-50 w-full bg-background">
      <div className="flex max-w-7xl mx-auto px-5 items-center justify-between">
        <Image
          src="/logo-black.svg"
          alt="logo"
          width={130}
          height={130}
          className="dark:hidden"
        />
        <Image
          src="/logo-white.svg"
          alt="logo"
          width={130}
          height={130}
          className="dark:block hidden"
        />
        <div className="md:flex hidden items-center gap-x-3">
          {NavLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm text-muted-foreground hover:text-primary transition-colors",
                pathname === href && "text-primary font-semibold"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-x-2">
          <ModeToggle />

          <SignedOut>
            <div className="md:block hidden">
              <SignInButton mode="modal">
                <Button>Log In</Button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <Link href="/story">
              <Button>
                <Plus className="h-5 w-5 md:mr-2" />
                <span className="md:block hidden">Create a story</span>
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <Sheet>
            <SheetTrigger className="md:hidden block">
              <Menu className="w-8 h-8" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <Image
                  src="/logo-black.svg"
                  alt="logo"
                  width={130}
                  height={130}
                  className="dark:hidden"
                />
                <Image
                  src="/logo-white.svg"
                  alt="logo"
                  width={130}
                  height={130}
                  className="dark:block hidden"
                />
              </SheetHeader>
              <div className="flex flex-col items-start gap-y-3 my-10">
                {NavLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "text-sm text-muted-foreground hover:text-primary transition-colors",
                      pathname === href && "text-primary font-semibold"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button>Log In</Button>
                </SignInButton>
              </SignedOut>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
