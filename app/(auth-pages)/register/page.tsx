import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage(){
    return(
        <div className="flex items-center justify-center min-h-screen">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Create a new account</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}