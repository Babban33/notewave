"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Client-side Supabase

interface User {
    id: string;
    name?: string;
}

interface Note {
    id: string;
    title: string;
    content: string;
    created_at: string;
}

export default function PageContent({
    user,
    notes: initialNotes,
    error,
}: {
    user: User;
    notes: Note[];
    error?: string;
}) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreating, setIsCreating] = useState(false); // Loading state
    const supabase = createClient();

    const filteredNotes = initialNotes.filter(
        (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleNewNote = async () => {
        if (isCreating) return;

        setIsCreating(true);
        const { data: newNote, error: insertError } = await supabase
            .from("notes")
            .insert({
                title: "Untitled Note",
                content: "",
                user_id: user.id,
            })
            .select("id")
            .single();

        setIsCreating(false);
        if (insertError || !newNote) {
            console.error("Error creating new note:", insertError);
            alert("Failed to create note. Please try again.");
            return;
        }

        // Redirect to the new note's editing page
        router.push(`/protected/${newNote.id}`);
    };

    const handleNoteClick = (noteId: string) => {
        router.push(`/protected/${noteId}`);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-screen-xl">
            <h1 className="text-3xl font-bold mb-8">
                {user.name?.charAt(0).toUpperCase() || "User"}&apos;s Notes
            </h1>

            {/* Search Bar */}
            <div className="flex items-center mb-8">
                <Input
                    type="text"
                    placeholder="Search notes..."
                    className="flex-grow mr-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button size="icon">
                    <Search className="h-4 w-4" />
                </Button>
            </div>

            {/* Error Handling for Initial Fetch */}
            {error && (
                <div className="text-red-500 mb-4">
                    Error loading notes: {error}. Please try again later.
                </div>
            )}

            {/* Notes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {/* Always show the "New Note" card */}
                <Card
                    onClick={handleNewNote}
                    className={`border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center h-[140px] cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 ${
                        isCreating ? "opacity-50 pointer-events-none" : ""
                    }`}
                >
                    <Button variant="ghost" size="icon" disabled={isCreating}>
                        {isCreating ? (
                            <span className="animate-spin h-6 w-6 border-2 border-t-transparent rounded-full" />
                        ) : (
                            <Plus className="h-6 w-6" />
                        )}
                    </Button>
                </Card>

                {/* Render filtered notes */}
                {filteredNotes.map((note) => (
                    <Card
                        key={note.id}
                        onClick={() => handleNoteClick(note.id)}
                        className="transition-transform duration-200 hover:scale-105 cursor-pointer"
                    >
                        <CardHeader>
                            <CardTitle>{note.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm truncate">{note.content}</p>
                            <p className="text-xs text-gray-500 mt-2">
                                {new Date(note.created_at).toLocaleDateString()}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}