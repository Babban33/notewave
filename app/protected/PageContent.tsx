"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, Trash2 } from "lucide-react";
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
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isNavigating, setIsNavigating] = useState(false);
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
        router.push(`/protected/${newNote.id}`);
    };

    const handleNoteClick = (noteId: string) => {
        setIsNavigating(true);
        router.push(`/protected/${noteId}`);
    };

    const handleDeleteNote = async (noteId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (isDeleting) return;

        setIsDeleting(noteId);
        const { error: deleteError } = await supabase
            .from("notes")
            .delete()
            .eq("id", noteId)
            .eq("user_id", user.id);
        
        if (deleteError) {
            console.error("Error deleting note:", deleteError);
            alert("Failed to delete note. Please try again.");
            return;
        }
        router.refresh();
        setIsDeleting(null);
    };

    return (
        <div className="container mx-auto px-2 md:px-8 py-4 max-w-screen-xl min-h-svh">
            <h1 className="text-3xl font-bold md:mb-8 mb-4">
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
                            <span className="animate-spin h-10 w-10 border-6 border-gray-500 border-t-transparent rounded-full" />
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
                        className="relative transition-transform duration-200 hover:scale-105 cursor-pointer"
                    >
                        {isDeleting === note.id?(
                            <div className="p-4 space-y-2">
                                <Skeleton className="h-6 w-3/4" /> {/* Title Skeleton */}
                                <Skeleton className="h-4 w-full" /> {/* Content Skeleton */}
                                <Skeleton className="h-4 w-1/2" /> {/* Date Skeleton */}
                            </div>
                        ) : (
                            <>    
                                <CardHeader>
                                    <CardTitle>{note.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm truncate">{note.content}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {new Date(note.created_at).toLocaleDateString()}
                                    </p>
                                </CardContent>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 opacity-100"
                                    onClick={(e) => handleDeleteNote(note.id, e)}
                                    disabled={isDeleting === note.id}
                                >
                                    {isDeleting === note.id ? (
                                        <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" />
                                    ) : (
                                        <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                                    )}
                                </Button>
                            </>
                        )}
                    </Card>
                ))}
            </div>
            {isNavigating && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}