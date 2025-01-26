'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { FaGoogle, FaMicrosoft, FaGithub } from 'react-icons/fa';
import Link from "next/link";

const formSchema = z.object({
    username: z
        .string()
        .min(2, { message: "Username must be at least 2 characters." })
        .max(20, { message: "Username must not exceed 20 characters." })
        .regex(/^[a-zA-Z0-9_]+$/, {
            message: "Username can only contain letters, numbers, and underscores.",
        }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." })
        .max(30, { message: "Password must not exceed 30 characters." })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter.",
        })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter.",
        })
        .regex(/[0-9]/, {
            message: "Password must contain at least one number.",
        })
        .regex(/[@$!%*?&#]/, {
            message: "Password must contain at least one special character.",
        }),
        confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
});

export default function RegisterPage(){
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log('Form Submitted:', values);
    };

    return(
        <div className="flex items-center justify-center min-h-screen px-2 md:px-0">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl font-semibold">Register</CardTitle>
                    <CardDescription>Create a new account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 gap-4 grid grid-cols-3">
                        <Button variant="outline">
                            <FaGoogle/>
                        </Button>
                        <Button variant="outline">
                            <FaMicrosoft/>
                        </Button>
                        <Button variant="outline">
                            <FaGithub/>
                        </Button>
                    </div>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                        </span>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                name="username"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel className="text-primary"> Username </FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} autoComplete="name"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary">Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="john@example.com" {...field} autoComplete="email"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input 
                                                    type={showPassword ? "text" : "password"} 
                                                    placeholder="********" 
                                                    {...field} 
                                                    autoComplete="new-password"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} autoComplete="on"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">Register</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="justify-center">
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline underline-offset-4">
                            Log In
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}