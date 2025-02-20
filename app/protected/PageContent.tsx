"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";

export default function PageContent({
    user,
    notes,
}: {
    user: { id: string; name?: string };
    notes: { id: string; title: string; content: string; created_at: string }[];
}) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-screen-xl">
            <h1 className="text-3xl font-bold mb-8">{user.name?.charAt(0).toUpperCase()}&apos;s Notes</h1>

            <div className="flex items-center mb-8">
                <Input type="text" placeholder="Search notes..." className="flex-grow mr-2" />
                <Button size="icon">
                    <Search className="h-4 w-4" />
                </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {notes.length === 0 ? (
                    <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center h-[140px] cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                        <Button variant="ghost" size="icon">
                            <Plus className="h-6 w-6" />
                        </Button>
                    </Card>
                ) : (
                    notes.map((note) => (
                        <Card key={note.id} className="transition-transform duration-200 hover:scale-105">
                            <CardHeader>
                                <CardTitle>{note.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">{note.content}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {new Date(note.created_at).toLocaleDateString()}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}