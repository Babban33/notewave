'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeOff, Eye, CheckCircle2, AlertCircle, X } from "lucide-react";
import { FaGoogle, FaMicrosoft, FaGithub } from 'react-icons/fa';
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {motion, AnimatePresence} from "framer-motion"
import { login, signInWithGithub } from "@/app/actions";

const formSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty({ message: "Email is required." })
        .email({ message: "Please enter a valid email address." })
        .regex(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        { message: "Invalid email format. Please enter a valid email address." }
    ),
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
});

export default function LoginPage(){
    const [showPassword, setShowPassword] = useState(false)
    const [registrationSuccess, setRegistrationSuccess] = useState(false)
    const [registrationError, setRegistrationError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            const { email, password} = values;
            console.log("Password: ",password, password.length);
            const response = await login(email, password);
            if(response.error){
                setIsLoading(false);
                setRegistrationError(response.error);
                setRegistrationSuccess(false);
            }
            else if(response.success){
                setIsLoading(false);
                setRegistrationSuccess(true);
                setRegistrationError(null);
                form.reset();
            }
        } catch (error: unknown) {
            if(error instanceof Error){
                setRegistrationError(error.message || "An error occurred during registration. Please try again.");
            }
            else{
                setRegistrationError("An unknown error occurred");
            }
            setRegistrationSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };    

    const closeAlert = () => {
        setRegistrationSuccess(false)
        setRegistrationError(null)
    }

    return(
        <div className="flex items-center justify-center min-h-screen px-2 md:px-0">
            <div className="w-full max-w-md">
                <AnimatePresence>
                    {(registrationSuccess || registrationError) && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-18 transform -translate-x-1/2 z-50 w-full max-w-sm"
                        >
                            <Alert
                                className={`relative shadow-md ${
                                registrationSuccess
                                    ? ""
                                    : "bg-destructive/15 dark:bg-destructive border-destructive/50 dark:border-destructive"
                                }`}
                            >
                                <Button className="absolute right-2 top-2" variant="ghost" size="icon" onClick={closeAlert}>
                                    <X className="h-4 w-4" />
                                </Button>
                                {registrationSuccess ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                    <AlertCircle className="h-5 w-5 text-destructive dark:text-destructive-foreground" />
                                )}
                                <AlertTitle
                                    className={`text-lg font-semibold ${
                                        registrationSuccess
                                        ? ""
                                        : "text-destructive dark:text-destructive-foreground"
                                    }`}
                                >
                                    {registrationSuccess ? "Registration Successful!" : "Registration Error"}
                                </AlertTitle>
                                <AlertDescription
                                    className={`mt-1 text-sm ${
                                        registrationSuccess
                                        ? ""
                                        : "text-destructive dark:text-destructive-foreground"
                                    }`}
                                >
                                    {registrationSuccess
                                    ? "A confirmation email has been sent. Please check your inbox to complete your registration."
                                    : registrationError}
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Card className="w-full max-w-sm shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl font-semibold">Login</CardTitle>
                        <CardDescription>Login to Your Account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6 gap-4 grid grid-cols-3">
                            <Button variant="outline">
                                <FaGoogle/>
                            </Button>
                            <Button variant="outline">
                                <FaMicrosoft/>
                            </Button>
                            <Button variant="outline" onClick={signInWithGithub}>
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
                                <Button type="submit" className="w-full">{isLoading ? "Registering...": "Register"}</Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="underline underline-offset-4">
                                Register
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}