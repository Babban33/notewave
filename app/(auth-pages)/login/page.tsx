"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Link from 'next/link'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // Simulating login process
        setTimeout(() => {
        setIsLoading(false)
        if (email === 'user@example.com' && password === 'password') {
            router.push('/dashboard')
        } else {
            setError('Invalid email or password')
        }
        }, 1500)
    }

    return (
        <div className="flex justify-center min-h-screen bg-background pt-20">
        <Card className="w-full max-w-md max-h-fit">
            <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold text-center">Sign in</CardTitle>
                <CardDescription className="text-center">
                    Enter your email and password to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
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
                        </div>
                    </div>

                    {error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                    )}

                    <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </form>

                <div className="mt-4 text-center">
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                    </Link>
                </div>

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
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="font-semibold text-primary hover:text-primary/80">
                    Sign up
                    </Link>
                </p>
            </CardFooter>
        </Card>
        </div>
    )
}