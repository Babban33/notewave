import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { NotebookTabs } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <NotebookTabs size={16} /> S-Notes
                        <p className="text-muted-foreground text-base">
                            Making the world a more organized place, one note at a time.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">Twitter</span>
                                <Twitter />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">GitHub</span>
                                <Github />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin />
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Solutions</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link href="#" className="text-base text-muted-foreground hover:text-foreground">
                                            Personal Notes
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-muted-foreground hover:text-foreground">
                                            Team Collaboration
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-muted-foreground hover:text-foreground">
                                            Task Management
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Support</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link href="#" className="text-base text-muted-foreground hover:text-foreground">
                                            Pricing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-muted-foreground hover:text-foreground">
                                            Documentation
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-muted-foreground hover:text-foreground">
                                            Guides
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Company</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link href="#" className="text-base text-muted-foreground hover:text-foreground">
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-muted-foreground hover:text-foreground">
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-muted-foreground hover:text-foreground">
                                            Careers
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link href="#" className="text-base text-muted-foreground hover:text-foreground">
                                            Privacy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-muted-foreground hover:text-foreground">
                                            Terms
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-muted pt-8">
                    <p className="text-base text-muted-foreground xl:text-center">
                        &copy; 2024 Notes WebApp, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}