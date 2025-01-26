'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { FaGoogle, FaMicrosoft, FaGithub } from 'react-icons/fa';
import Link from "next/link";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." })
        .max(30, { message: "Password must not exceed 30 characters." })
});

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log('Form Submitted:', values);
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-2 md:px-0">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl font-semibold">Login</CardTitle>
                    <CardDescription>Access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 gap-4 grid grid-cols-3">
                        <Button variant="outline">
                            <FaGoogle />
                        </Button>
                        <Button variant="outline">
                            <FaMicrosoft />
                        </Button>
                        <Button variant="outline">
                            <FaGithub />
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
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary">Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="john@example.com" {...field} autoComplete="email" />
                                        </FormControl>
                                        <FormMessage />
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
                                                    autoComplete="current-password"
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
                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="justify-center">
                    <div className="text-center text-sm">
                        Don&apos;t have an account? {" "}
                        <Link href="/register" className="underline underline-offset-4">
                            Register
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
