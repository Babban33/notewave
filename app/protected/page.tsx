import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PageContent from "./PageContent";

export default async function ProtectedPage() {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();
    
    if (authError || !authData?.user) {
        redirect("/login");
    }

    const user = {
        id: authData.user.id,
        name: authData.user.user_metadata.display_name as string | undefined,
    };

    const { data: notes, error: notesError } = await supabase
        .from("notes")
        .select("id, title, content, created_at") // Only fetch needed fields
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10); // Add pagination

    return (
        <PageContent 
            user={user} 
            notes={notes ?? []} 
            error={notesError?.message} // Pass error to client
        />
    );
}