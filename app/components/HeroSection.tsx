import { Button } from "@/components/ui/button";
import { Cloud, Folder, Lock } from "lucide-react";
import Link from 'next/link';
import { FeatureCard } from "./FeatureCard";

export default function HeroSection() {
    return(
        <div className="text-center min-h-screen flex flex-col justify-center items-center py-20">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Simplify Your Notes
            </h1>
            <p className="text-xl mb-8 max-w-2xl text-muted-foreground">
                Organize, access, and manage your notes from anywhere, anytime. Experience the power of seamless note-taking.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
                </Link>
                <Button size="lg" variant="outline" className="hover:bg-secondary/90">Learn More</Button>
            </div>
        </div>
    );
}

export function CallAction() {
    return(
        <div className="bg-primary text-primary-foreground py-20">
            <div className="max-w-4xl mx-auto text-center px-4">
                <h2 className="text-4xl font-bold mb-4">
                    Ready to Simplify Your Life?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                    Join thousands of users who are taking control of their productivity with Notes WebApp.
                </p>
                <Link href="/register">
                    <Button size="lg" className="bg-background text-foreground hover:bg-background/90">Sign Up Now</Button>
                </Link>
            </div>
        </div>
    );
}

export function FeatureSection() {
    return(
        <section className="py-20 bg-secondary/10">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Powerful Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Cloud Sync"
                        description="Sync your notes across all your devices effortlessly. Access your thoughts anywhere, anytime."
                        icon={<Cloud size={50} className="text-primary" />}
                    />
                    <FeatureCard
                        title="Secure Storage"
                        description="Keep your notes safe with end-to-end encryption. Your privacy is our top priority."
                        icon={<Lock size={50} className="text-primary" />}
                    />
                    <FeatureCard
                        title="Easy Organization"
                        description="Tag and categorize your notes for quick access. Find what you need when you need it."
                        icon={<Folder size={50} className="text-primary" />}
                    />
                </div>
            </div>
        </section>
    );
}