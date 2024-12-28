import { createClient } from "@/utils/supabase/server";
import RegisterComponent from "./component";

export default async function RegisterPage(){
    const supabase =await createClient();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await supabase.auth.getUser();

    // if (data?.user) {
    //     const email = data.user.email; // Extract the user's email
    //     return <div>Welcome, <strong>{email}</strong>!</div>;
    // }
    return <RegisterComponent/>
}