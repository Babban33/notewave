"use client"

import { login } from "@/app/actions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)
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
            if (result && result.error) {
              setError(result.error)
            }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            setError("An unexpected error occurred. Please try again.")
          } finally {
            setIsLoading(false)
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen px-2 md:px-0">
            <div className="w-full max-w-md">
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
                                                <Input 
                                                    type="password"
                                                    placeholder="*******"
                                                    {...field}
                                                    autoComplete="current-password"
                                                />
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
                    {error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </Card>
            </div>
        </div>
    )
}