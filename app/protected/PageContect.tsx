"use client"
import { signout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";

export default function PageContent({ user }: { user: { email?: string } }) {
    const notes = [
        { id: 1, title: "Meeting Notes", content: "Discuss project timeline", date: "2024-02-04", color: "bg-blue-100 dark:bg-blue-900" },
        { id: 2, title: "Shopping List", content: "Milk, eggs, bread", date: "2024-02-03", color: "bg-green-100 dark:bg-green-900" },
        { id: 3, title: "Ideas", content: "New app features", date: "2024-02-02", color: "bg-yellow-100 dark:bg-yellow-900" },
        { id: 4, title: "To-Do", content: "Call dentist, pay bills", date: "2024-02-01", color: "bg-pink-100 dark:bg-pink-900" },
        { id: 5, title: "Recipes", content: "Grandma's apple pie", date: "2024-01-31", color: "bg-purple-100 dark:bg-purple-900" },
        { id: 6, title: "Quotes", content: "Stay hungry, stay foolish", date: "2024-01-30", color: "bg-orange-100 dark:bg-orange-900" },
    ]
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{user.email} Notes</h1>
            <div className="flex items-center mb-8">
                <Input type="text" placeholder="Search notes..." className="flex-grow mr-2" />
                <Button size="icon">
                <Search className="h-4 w-4" />
                </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center h-[140px] cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                <Button variant="ghost" size="icon">
                    <Plus className="h-6 w-6" />
                </Button>
                </Card>
                {notes.map((note) => (
                <Card key={note.id} className={`${note.color} transition-transform duration-200 hover:scale-105`}>
                    <CardHeader>
                    <CardTitle>{note.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-sm">{note.content}</p>
                    <p className="text-xs text-gray-500 mt-2">{note.date}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
            <div>
                <Button onClick={signout}>SignOut</Button>
            </div>
        </div>
    );
}