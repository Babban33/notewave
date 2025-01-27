import { createClient } from "@/utils/supabase/client";
import { AuthError } from '@supabase/supabase-js';

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