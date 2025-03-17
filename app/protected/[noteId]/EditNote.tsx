"use client";
import { createClient } from "@/utils/supabase/client";
import { ChevronLeft, MoonIcon, SunIcon, Trash2, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, CaseSensitive, Type } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

const Navbar = ({ onDelete, setIsNavigating }: { 
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

const EditorToolbar = ({ onFormat, activeFormats }: { 
    onFormat: (type: string, value?: string) => void,
    activeFormats: { [key: string]: boolean }
}) => {
    return (
        <Card className="fixed bottom-2 left-1/2 transform -translate-x-1/2 inline-flex items-center gap-2 px-4 py-3 z-10">            {/* Text Style Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2" title="Text Style">
                        <Type className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => onFormat('bold')}>
                        <Bold className="mr-2 h-4 w-4" /> Bold {activeFormats.bold && <span className="ml-2">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onFormat('italic')}>
                        <Italic className="mr-2 h-4 w-4" /> Italic {activeFormats.italic && <span className="ml-2">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onFormat('underline')}>
                        <Underline className="mr-2 h-4 w-4" /> Underline {activeFormats.underline && <span className="ml-2">✓</span>}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Alignment Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2" title="Alignment">
                        {activeFormats.justifyLeft ? <AlignLeft className="h-5 w-5" /> :
                         activeFormats.justifyCenter ? <AlignCenter className="h-5 w-5" /> :
                         activeFormats.justifyRight ? <AlignRight className="h-5 w-5" /> :
                         <AlignLeft className="h-5 w-5" />}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => onFormat('justifyLeft')}>
                        <AlignLeft className="mr-2 h-4 w-4" /> Left {activeFormats.justifyLeft && <span className="ml-2">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onFormat('justifyCenter')}>
                        <AlignCenter className="mr-2 h-4 w-4" /> Center {activeFormats.justifyCenter && <span className="ml-2">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onFormat('justifyRight')}>
                        <AlignRight className="mr-2 h-4 w-4" /> Right {activeFormats.justifyRight && <span className="ml-2">✓</span>}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* List Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2" title="Lists">
                        {activeFormats.insertUnorderedList ? <List className="h-5 w-5" /> :
                         activeFormats.insertOrderedList ? <ListOrdered className="h-5 w-5" /> :
                         <List className="h-5 w-5" />}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => onFormat('insertUnorderedList')}>
                        <List className="mr-2 h-4 w-4" /> Bullet List {activeFormats.insertUnorderedList && <span className="ml-2">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onFormat('insertOrderedList')}>
                        <ListOrdered className="mr-2 h-4 w-4" /> Numbered List {activeFormats.insertOrderedList && <span className="ml-2">✓</span>}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Text Size Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2" title="Text Size">
                        <CaseSensitive className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => onFormat('fontSize', '3')}>
                        Small
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onFormat('fontSize', '4')}>
                        Medium
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onFormat('fontSize', '5')}>
                        Large
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Card>
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [content, setContent] = useState(initialContent);
    const [isNavigating, setIsNavigating] = useState(false);
    const [activeFormats, setActiveFormats] = useState<{ [key: string]: boolean }>({
        bold: false,
        italic: false,
        underline: false,
        justifyLeft: true, // Default to left alignment
        justifyCenter: false,
        justifyRight: false,
        insertUnorderedList: false,
        insertOrderedList: false,
    });
    const contentRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        if (contentRef.current && initialContent) {
            contentRef.current.innerHTML = initialContent;
        }
    }, [initialContent]);

    const saveNote = useCallback(async () => {
        if (!contentRef.current) return;

        const currentContent = contentRef.current.innerHTML;
        const { error } = await supabase
            .from("notes")
            .update({ 
                title, 
                content: currentContent
            })
            .eq("id", noteId);

        if (error) {
            console.error("Error saving note:", error);
        } else {
            setContent(currentContent);
        }
    }, [noteId, title, supabase]);

    const debouncedSaveNote = useDebounce(saveNote, 1000);

    const deleteNote = async () => {
        setIsNavigating(true);
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

    const updateActiveFormats = () => {
        const newFormats = {
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
            justifyLeft: document.queryCommandState('justifyLeft'),
            justifyCenter: document.queryCommandState('justifyCenter'),
            justifyRight: document.queryCommandState('justifyRight'),
            insertUnorderedList: document.queryCommandState('insertUnorderedList'),
            insertOrderedList: document.queryCommandState('insertOrderedList'),
        };
        setActiveFormats(newFormats);
    };

    const toggleFormat = (type: string, value?: string) => {
        const isStyleFormat = ['bold', 'italic', 'underline'].includes(type);
        const isAlignment = ['justifyLeft', 'justifyCenter', 'justifyRight'].includes(type);
        const isList = ['insertUnorderedList', 'insertOrderedList'].includes(type);

        if (isStyleFormat) {
            const newState = !activeFormats[type];
            document.execCommand(type, false, undefined);
            setActiveFormats(prev => ({ ...prev, [type]: newState }));
        } else if (isAlignment) {
            document.execCommand(type, false, undefined);
            setActiveFormats(prev => ({
                ...prev,
                justifyLeft: type === 'justifyLeft',
                justifyCenter: type === 'justifyCenter',
                justifyRight: type === 'justifyRight',
                insertUnorderedList: false,
                insertOrderedList: false,
            }));
        } else if (isList) {
            document.execCommand(type, false, undefined);
            setActiveFormats(prev => ({
                ...prev,
                insertUnorderedList: type === 'insertUnorderedList' && !prev.insertUnorderedList,
                insertOrderedList: type === 'insertOrderedList' && !prev.insertOrderedList,
                justifyLeft: false,
                justifyCenter: false,
                justifyRight: false,
            }));
        } else if (type === 'fontSize' && value) {
            document.execCommand('fontSize', false, value);
        }

        if (contentRef.current) {
            const newContent = contentRef.current.innerHTML;
            setContent(newContent);
            debouncedSaveNote();
        }
        contentRef.current?.focus();
    };

    const handleInput = () => {
        if (contentRef.current) {
            const newContent = contentRef.current.innerHTML;
            setContent(newContent);
            debouncedSaveNote();
            updateActiveFormats();
        }
    };

    const handleSelectionChange = () => {
        if (document.activeElement === contentRef.current) {
            updateActiveFormats();
        }
    };

    useEffect(() => {
        document.addEventListener('selectionchange', handleSelectionChange);
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    });

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar 
                onDelete={deleteNote} 
                setIsNavigating={setIsNavigating}
            />
            <div className="flex-1 w-full px-4 py-4 mt-12 bg-white dark:bg-black text-black dark:text-white overflow-auto">
                <input
                    className="w-full text-xl font-bold outline-none bg-transparent mb-4"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        debouncedSaveNote();
                    }}
                    autoFocus
                />
                <div
                    ref={contentRef}
                    contentEditable
                    className="flex-1 w-full outline-none min-h-screen bg-transparent text-black dark:text-white editor-content"
                    onInput={handleInput}
                />
            </div>
            <EditorToolbar 
                onFormat={toggleFormat} 
                activeFormats={activeFormats}
            />
            {isNavigating && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}