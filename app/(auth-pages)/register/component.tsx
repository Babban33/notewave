"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { createClient } from "@/utils/supabase/client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function RegisterComponent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState('')

    const isPasswordValid = (password: string) => {
        const hasLetter = /[a-zA-Z]/.test(password)
        const hasNumber = /\d/.test(password)
        return password.length >= 6 && hasLetter && hasNumber
    }
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isPasswordValid(password)) {
            alert('Password must contain at least 6 characters and contain both letters and numbers');
            return;
        }
        setIsLoading(true);
        const supabase = await createClient();
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options:{
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                    data:{
                        display_name: name
                    }
                }
            });
            if (error) {
                setError(error.message);
                throw error;
            }
            setSuccess('Account created successfully. Please check your email to verify your account');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="flex justify-center bg-background pt-12">
            <Card className="w-full max-w-md md:mx-0 mx-4">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-bold text-center">Create an Account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your details to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {(success || error) && (
                        <Alert variant={success ? "default" : "destructive"} className="mb-4">
                            {success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                            <AlertTitle>{success ? "Success" : "Error"}</AlertTitle>
                            <AlertDescription>
                                {success ? "Account created successfully. Please check your mail inbox" : error}
                            </AlertDescription>
                        </Alert>
                    )}
                    <form onSubmit={handleSignUp}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input 
                                    id="name" 
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {password.length >0 &&(
                                    <div className="text-sm">
                                        <div className="flex items-center space-x-2">
                                            {password.length >= 6 ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                                            <span>At least 6 characters</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {/[a-zA-Z]/.test(password) && /\d/.test(password) ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                                            <span>Contains both letters and numbers</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                            {isLoading ? 'Creating account...' : 'Create account'}
                        </Button>
                    </form>
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-muted"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" disabled={isLoading}>
                            <Icons.google className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                        <Button variant="outline" disabled={isLoading}>
                            <Icons.microsoft className="mr-2 h-4 w-4" />
                            Microsoft
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                    <p className="text-sm text-muted-foreground mt-4">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-primary hover:text-primary/80">
                            Login
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}