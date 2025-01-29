import { createClient } from "@/utils/supabase/client";
import { AuthError } from '@supabase/supabase-js';
import { redirect } from "next/navigation";

export const register = async (username: string, email: string, password: string) => {
    const supabase = createClient();
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: username,
                },
            },
        });
        if(error){
            return {error: error.message};
        }else if(data){
            return {success: "Registration Successfull"};
        }

    } catch (err: unknown) {
        if (err instanceof AuthError) {
            throw new Error(err.message);
        } else {
            console.error(err);
            throw new Error('An unknown error occurred');
        }
    }
};

export async function login(email: string, password: string) {
    try{
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if(error){
            return {error: error.message};
        } else if(data){
            return { success: "Logged in successfully" }
        }
    } catch(err){
        console.error(err);
        return{ error: "An unexpected error occurred"}
    }
}

export const signout = async() =>{
    const supabase = createClient();
    const { error } = await supabase.auth.signOut()
    if(!error){
        redirect('/login')
    }
    else{
        console.error(error);
    }
}

export const signInWithGithub = async () => {
    const currentUrl = window.location.href;
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: currentUrl,
        }
    })
    if(error){
        redirect(`/register`)
    }
    return data;
}

export const resendEmail = async( email: string ) => {
    try{
        console.log("Inside server")
        const supabase = createClient();
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: email,
        })
        if(error){
            return{error: error.message}
        }
        return {success: "Email Sent"};
    } catch(err){
        console.error(err);
        throw new Error("Server Error");
    }
}