import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, Feather } from "lucide-react";
import Link from "next/link";
import React from "react";
export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <HeroSection/>
            <FeatureSection/>
            <CTASection/>
        </div>
    );
}

function HeroSection() {
    return (
        <section className="min-h-screen max-w-screen-xl flex items-center justify-center">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl max-w-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                            Capture Your Thoughts with Notewave 📝
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Organize your ideas, boost productivity, and never forget a brilliant thought again. Let&apos;s make note-taking an adventure! 🚀
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-4">
                        <Link href="/register">
                            <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                                Get Started 🎉
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                Learn More 🧠
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CTASection(){
    return(
        <section className="w-full text-center py-12 md:py-24 lg:py-32 bg-primary dark:bg-primary-foreground">
            <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-foreground dark:text-primary">Ready to Revolutionize Your Note-Taking?</h2>
                    <p className="mx-auto max-w-[700px] md:text-xl text-primary-foreground/80 dark:text-primary/80">
                        Join thousands of users who are already boosting their productivity with Notewave. Start your journey today!
                    </p>
                </div>
                <Button size="lg" className="bg-background text-primary hover:bg-background/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90">
                    <Link href="/register">Register Now 🚀</Link>
                </Button>
            </div>
        </section>
    )
}

function FeatureSection(){
    return(
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features that Empower You</h2>
                <div className="flex gap-4 justify-between">
                    <Card className="flex flex-col items-center text-center w-1/2">
                        <CardHeader className="flex flex-col items-center">
                            <div className="mb-4 p-2 bg-secondary rounded-full">
                                <Feather className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-xl">Intuitive Note-Taking</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Create and edit notes with our user-friendly interface. It&apos;s as easy as thinking!</p>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col items-center text-center w-1/2">
                        <CardHeader className="flex flex-col items-center">
                            <div className="mb-4 p-2 bg-secondary rounded-full">
                                <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-xl">Smart Organization</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Categorize and tag your notes for quick and easy retrieval. Finding your ideas has never been simpler.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}