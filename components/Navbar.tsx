"use client";

import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { LogOut, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const { isAuthenticated, session } = useAuth();

  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b">
      <Link href="/" className="text-2xl font-bold">
        Your App Name
      </Link>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-muted-foreground">
              Welcome, {session?.user?.name || session?.user?.email}
            </span>
            <Button onClick={() => signOut()} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="ghost" size="sm">
              <Link
                href="/login"
                className={cn(
                  "flex items-center transition-colors hover:text-foreground/80"
                )}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link
                href="/signUp"
                className={cn(
                  "flex items-center transition-colors hover:text-foreground/80"
                )}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
