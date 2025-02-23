"use client";
import { createClient } from "@/utils/supabase/client";
import { ChevronLeft, Copy, Heart, MoonIcon, SunIcon, Trash } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

function useDebounce(callback: () => Promise<void>, wait: number) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedFunction = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback();
        }, wait);
    }, [callback, wait]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return debouncedFunction;
}

const Navbar = ({ onDelete }: { onDelete: () => void }) => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    return (
        <div className="fixed top-0 left-0 right-0 flex flex-row justify-between items-center px-4 py-4 bg-white dark:bg-black z-10">
            <button onClick={() => router.push("/protected")}>
                <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex flex-row justify-center items-center space-x-4">
                <Heart className="h-4 w-4" />
                <Copy className="h-4 w-4" />
                <button
                    aria-label="Toggle theme"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-0 bg-transparent border-none cursor-pointer"
                >
                    {theme === "light" ? (
                        <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 h-4 w-4" />
                    ) : (
                        <MoonIcon className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 h-4 w-4" />
                    )}
                </button>
                <button
                    aria-label="Delete note"
                    onClick={onDelete}
                    className="p-0 bg-transparent border-none cursor-pointer text-red-500 hover:text-red-700"
                >
                    <Trash className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default function EditNote({
    noteId,
    initialContent,
    initialTitle,
}: {
    noteId: string;
    initialContent: string;
    initialTitle: string;
}) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const router = useRouter();
    const supabase = createClient();

    const saveNote = useCallback(async () => {
        const { error } = await supabase
            .from("notes")
            .update({ title, content })
            .eq("id", noteId);

        if (error) {
            console.error("Error saving note:", error);
        }
    }, [noteId, title, content, supabase]);

    const debouncedSaveNote = useDebounce(saveNote, 1000);

    useEffect(() => {
        debouncedSaveNote();
    }, [title, content, debouncedSaveNote]);

    const deleteNote = async () => {
        const { error } = await supabase
            .from("notes")
            .delete()
            .eq("id", noteId);

        if (error) {
            console.error("Error deleting note:", error);
        } else {
            router.push("/protected");
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar onDelete={deleteNote} />
            <div className="flex-1 w-full px-4 py-4 mt-12 bg-white dark:bg-black text-black dark:text-white">
                <input
                    className="w-full text-xl font-bold outline-none bg-transparent mb-4"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <textarea
                    className="flex-1 w-full outline-none resize-none bg-transparent text-black dark:text-white"
                    placeholder="Start typing your note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
        </div>
    );
}