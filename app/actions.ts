"use server"
import { createClient } from "@/utils/supabase/client";
import { AuthError } from '@supabase/supabase-js';
import { cookies } from "next/headers"
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

        if (error) {
            throw error;
        }

        return data;
    } catch (err: unknown) {
        if (err instanceof AuthError) {
            throw new Error(err.message);
        } else {
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
            (await cookies()).set("session", JSON.stringify(data.session))
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