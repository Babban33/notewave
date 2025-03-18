"use client";

import { Type, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, CaseSensitive } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";


const EditorToolbar = ({ onFormat, activeFormats }: { 
    onFormat: (type: string, value?: string) => void,
    activeFormats: { [key: string]: boolean }
}) => {
    return (
        <Card className="fixed bottom-2 left-1/2 transform -translate-x-1/2 inline-flex items-center gap-2 px-4 py-3 z-10">
            {/* Text Style Dropdown */}
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


export default EditorToolbar;