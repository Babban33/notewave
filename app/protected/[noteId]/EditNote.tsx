"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import NotesNavBar from "@/components/notes/NotesNavBar";
import EditorToolbar from "@/components/notes/EditorToolBar";

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
        if (contentRef.current) {
            contentRef.current.focus();
        } else {
            console.warn("Editor reference is not available.");
            return;
        }

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
            const isCurrentlyActive = activeFormats[type];
            document.execCommand(type, false, undefined);
            setActiveFormats(prev => ({
                ...prev,
                insertUnorderedList: type === 'insertUnorderedList' && !isCurrentlyActive,
                insertOrderedList: type === 'insertOrderedList' && !isCurrentlyActive,
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

        updateActiveFormats();
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

    // New useEffect for nesting and exiting lists
    useEffect(() => {
        let lastKeyWasEnter = false;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Tab' && contentRef.current) {
                e.preventDefault();
                if (e.shiftKey) {
                    document.execCommand('outdent', false, undefined);
                } else {
                    document.execCommand('indent', false, undefined);
                }
                updateActiveFormats();
            } else if (e.key === 'Enter') {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const currentNode = range.startContainer;
                    if (currentNode.nodeType === Node.TEXT_NODE && currentNode.textContent?.trim() === '') {
                        if (lastKeyWasEnter) {
                            e.preventDefault();
                            document.execCommand('insertParagraph', false, undefined);
                            lastKeyWasEnter = false;
                        } else {
                            lastKeyWasEnter = true;
                        }
                    } else {
                        lastKeyWasEnter = false;
                    }
                }
            } else if (e.key === 'Backspace') {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const currentNode = range.startContainer;
                    if (currentNode.nodeType === Node.TEXT_NODE && 
                        currentNode.textContent?.trim() === '' && 
                        currentNode.parentElement?.tagName === 'LI') {
                        e.preventDefault();
                        document.execCommand('outdent', false, undefined);
                    }
                }
            }
        };

        const editor = contentRef.current;
        if (editor) {
            editor.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (editor) {
                editor.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [contentRef]);

    useEffect(() => {
        document.addEventListener('selectionchange', handleSelectionChange);
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    },);

    return (
        <div className="flex flex-col min-h-screen">
            <NotesNavBar 
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
                    className="flex-1 w-full outline-none min-h-[calc(100vh-8rem)] bg-transparent text-black dark:text-white editor-content"
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
            <style jsx global>{`
                .editor-content ul {
                    list-style-type: disc !important;
                    padding-left: 2rem !important;
                    margin: 0.5rem 0 !important;
                }
                .editor-content ol {
                    list-style-type: decimal !important;
                    padding-left: 2rem !important;
                    margin: 0.5rem 0 !important;
                }
                .editor-content li {
                    margin: 0.25rem 0 !important;
                }
            `}</style>
        </div>
    );
}