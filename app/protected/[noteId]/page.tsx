import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import EditNote from "./EditNote";

export default async function NotePage({
    params,
}: {
    params: Promise<{ noteId: string }>;
}) {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        redirect("/login");
    }

    const { noteId } = await params;

    const { data: note, error: noteError } = await supabase
        .from("notes")
        .select("id, title, content")
        .eq("id", noteId)
        .eq("user_id", authData.user.id)
        .single();

    if (noteError || !note) {
        console.error("Error fetching note:", noteError);
        redirect("/protected");
    }

    return (
        <EditNote
            noteId={note.id}
            initialContent={note.content}
            initialTitle={note.title}
        />
    );
}