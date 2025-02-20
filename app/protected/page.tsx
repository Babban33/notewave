import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PageContent from "./PageContent";

export default async function ProtectedPage() {
    const supabase = await createClient();

    // Get the authenticated user
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
        redirect("/login");
    }

    const user = {
        id: authData.user.id,
        name: authData.user.user_metadata.display_name,
    }

    const { data: notes, error: notesError } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (notesError) {
        console.error("Error fetching notes:", notesError);
    }

    return <PageContent user={user} notes={notes || []} />;
}