import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PageContent from "./PageContect";


export default async function ProtectedPage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login"); // Redirect unauthenticated users
    }

    return (
        <PageContent user={data.user} />
    );
}