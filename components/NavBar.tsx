import { Button } from "./ui/button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import Link from "next/link";
import { NotebookTabs } from 'lucide-react';

export default function NavBar() {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-background shadow-md dark:bg-background border-b z-50">
            <div className="flex items-center justify-between p-4 max-w-6xl w-full mx-auto">
                <Link href="/" className="flex items-center space-x-2">
                    <NotebookTabs size={32} />
                    <span className="text-2xl font-bold text-foreground">S-Notes</span>
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="outline" className="hidden sm:inline-block">Signup</Button>
                    </Link>
                    <ThemeSwitcher />
                </div>
            </div>
        </nav>
    );
}