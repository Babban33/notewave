"use client"
import { ChevronLeft, Copy, Heart, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = ()=>{
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    return(
        <div className="fixed top-0 left-0 right-0 flex flex-row justify-between items-center px-4 py-4 bg-white dark:bg-black z-10">
            <button onClick={() => router.push('/protected')}>
                <ChevronLeft/>
            </button>
            <div className="flex flex-row justify-center items-center space-x-4">
                <Heart/>
                <Copy/>
                <button
                    aria-label="Toggle theme"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-0 bg-transparent border-none cursor-pointer"
                >
                    {theme === "light"? (
                        <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    ) : (
                        <MoonIcon className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    )}
                </button>
            </div>
        </div>
    )
}

function CreateNote(){
    const [note, setNote] = useState("");

    return(
        <div className="flex flex-col h-screen">
            <Navbar/>
            <textarea 
                className="flex-1 w-full px-4 py-4 mt-12 outline-none resize-none bg-white dark:bg-black text-black dark:text-white"
                placeholder="Start typing your note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                autoFocus
            />
        </div>
    )
}
export default CreateNote;