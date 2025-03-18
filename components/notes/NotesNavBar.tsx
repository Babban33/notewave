"use client";

import { ChevronLeft, SunIcon, MoonIcon, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const NotesNavBar = ({ onDelete, setIsNavigating }: { 
    onDelete: () => void, 
    setIsNavigating: (value: boolean) => void 
}) => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    
    const backButtonClick = () => {
        setIsNavigating(true);
        router.push("/protected");
    };

    return (
        <div className="fixed top-0 left-0 right-0 flex flex-row justify-between items-center px-4 py-4 bg-white dark:bg-black z-10">
            <button onClick={backButtonClick}>
                <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex flex-row justify-center items-center space-x-4">
                <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "light" ? (
                        <SunIcon className="h-4 w-4" />
                    ) : (
                        <MoonIcon className="h-4 w-4" />
                    )}
                </button>
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default NotesNavBar;