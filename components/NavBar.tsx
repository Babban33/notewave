"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MoonIcon, SunIcon, MenuIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "@supabase/supabase-js";
import { signout } from "@/app/actions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [session, setSession] = useState<Session | null>(null);

    // Check user authentication state
    useEffect(() => {
        const supabase = createClient();
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
        };

        checkUser();

        // Listen for authentication state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        });

            return () => {
            authListener.subscription.unsubscribe();
            };
    }, []);

    return (
        <nav className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl">📝 Notewave</span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Toggle theme"
                            className="rounded-full"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        {session ? (
                            <div className="flex items-center space-x-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={session.user.user_metadata?.avatar_url || ""} alt="User Avatar" />
                                            <AvatarFallback>{session.user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="mr-2 md:mr-0">
                                        <DropdownMenuLabel className="justify-center text-center">{session.user.user_metadata.display_name}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={signout} className="text-center items-center justify-center cursor-pointer">
                                            Sign Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <div className="hidden sm:flex space-x-4">
                                <Link href="/login">
                                    <Button variant="ghost">Login</Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="default">Register</Button>
                                </Link>
                            </div>
                        )}
                        
                        {!session && (
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="sm:hidden rounded-full">
                                        <MenuIcon className="h-5 w-5" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right">
                                    <SheetTitle>Notewave</SheetTitle>
                                    <SheetDescription className="sr-only">Navigation Menu</SheetDescription>
                                    <nav className="flex flex-col mt-4 space-y-4">
                                        <Link href="/login">
                                            <Button variant="ghost" className="w-full">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button variant="default" className="w-full">
                                                Register
                                            </Button>
                                        </Link>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
