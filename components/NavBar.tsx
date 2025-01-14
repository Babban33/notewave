"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { MoonIcon, SunIcon, MenuIcon } from 'lucide-react'
import { useTheme } from "next-themes"

const navItems = [
    { name: "Login", path: "/login", type: "default"},
    { name: "Register", path:"/register", type: "outline"}
]

export default function Navbar() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    return (
        <nav className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl">Notewave</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex space-x-4">
                            <Link href="/login">
                                <Button>Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="ghost">Register</Button>
                            </Link>
                        </div>
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
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="sm:hidden rounded-full">
                                <MenuIcon className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetDescription>Notewave</SheetDescription>
                                <nav className="flex flex-col mt-4 w-full">
                                    {navItems.map((item) => (
                                        <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`px-3 w-full py-2 rounded-md text-sm font-medium transition-colors ${
                                            pathname === item.path
                                            ? "bg-primary/10 text-primary"
                                            : "text-foreground/60 hover:text-foreground hover:bg-accent"
                                        }`}
                                        >
                                        {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )
}