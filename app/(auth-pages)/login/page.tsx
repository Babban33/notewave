import { createClient } from "@/utils/supabase/server";
import LoginComponent from "./component";
export default async function LoginPage(){
    const supabase =await createClient();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await supabase.auth.getUser();
    return <LoginComponent/>;
}