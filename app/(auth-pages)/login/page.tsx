"use client"

import { login, resendEmail } from "@/app/actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, CheckCircle2, Eye, EyeOff, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z
      .string()
      .trim()
      .nonempty({ message: "Email is required." })
      .email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(30, { message: "Password must not exceed 30 characters." }),
})

export default function LoginPage(){
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isNotEmailConfirmed, setIsNotEmailConfirmed] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>){
        setIsLoading(true);
        setError(null);
        try {
            const result = await login(values.email, values.password)
            if (result?.error) {
                if(result.error === "Email not confirmed"){
                    setIsNotEmailConfirmed(true);
                }
                setError(result.error)
            }
            if(result?.success){
                setSuccess(result.success);
                setError(null);
                form.reset();
                router.push("/protected")
            }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            setError("An unexpected error occurred. Please try again.")
          } finally {
            setIsLoading(false)
        }
    }

    async function resendConfirmation(values: z.infer<typeof formSchema>) {
        try{
            console.log("started in component");
            const result = await resendEmail(values.email);
            if(result?.success){
                setSuccess(result.success);
                setError(null);
            } else if(result?.error){
                console.error(error);
            }
        } catch(err){
            console.error(err);
        }
    }

    const closeAlert = () => {
        setSuccess(null)
        setError(null)
    }

    return(
        <div className="flex items-center justify-center min-h-screen px-2 md:px-0">
            <div className="w-full max-w-sm">
            <AnimatePresence>
                    {(success || error) && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.3 }}
                            className="relative top-18 transform -translate-x-1/2 z-50 w-full max-w-sm"
                        >
                            <Alert
                                className={`relative shadow-md ${
                                success
                                    ? ""
                                    : "bg-destructive border-destructive"
                                }`}
                            >
                                <Button className="absolute right-2 top-2 hover:bg-inherit" variant="ghost" size="icon" onClick={closeAlert}>
                                    <X className="h-4 w-4" />
                                </Button>
                                {success ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                    <AlertCircle className="h-5 w-5 text-destructive-foreground" />
                                )}
                                <AlertTitle
                                    className={`text-lg font-semibold ${
                                        success
                                        ? ""
                                        : "text-destructive-foreground"
                                    }`}
                                >
                                    {success ? (success==="Email Sent" ? success: "Logged in Successfully") : (isNotEmailConfirmed ? "Email Not Confirmed": "Registration Error")}
                                </AlertTitle>
                                <AlertDescription
                                    className={`mt-1 text-sm ${
                                        success
                                        ? ""
                                        : "text-destructive-foreground"
                                    }`}
                                >
                                    {success
                                    ? (success === "Email sent" ? "A confirmation email has been sent. Please check your inbox to complete your registration." : "Welcome to Notewave")
                                    : isNotEmailConfirmed ? (
                                        <span>
                                            To resend confirmation link:{" "}
                                            <Button onClick={()=>resendConfirmation(form.getValues())} variant="link" className="underline text-destructive-foreground pl-0">Click Here</Button>
                                        </span>
                                    ) : error}
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl font-semibold">Login</CardTitle>
                        <CardDescription>Login to Your Account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) =>(
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john@example.com" {...field} autoComplete="email"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="password"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input 
                                                        type={showPassword ? "text": "password"}
                                                        placeholder="*******"
                                                        {...field}
                                                        autoComplete="current-password"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2: hover:bg-transparent"
                                                        onClick={()=> setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4"/>
                                                        ): (
                                                            <Eye className="h-4 w-4"/>
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full" type="submit" disabled={isLoading}>
                                    {isLoading ? "Logging In...": "Log In"}
                                </Button>
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