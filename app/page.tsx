import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen px-4">
            <Image
                className="-mt-16 mb-12 w-auto h-auto"
                src="/home1.png"
                width={240}
                height={240}
                alt=""
            />
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center mb-6 max-w-2xl">
                World&apos;s Safest And Largest Digital Notebook
            </h2>

            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl text-center">
                Notewave is the safest, largest and intelligent digital notebook. Join
                over 10M+ users already using Notely.
            </p>

            <div className="flex flex-col gap-2 w-full max-w-md text-center">
                <Button size="lg" className="w-full h-14 text-lg rounded-xl">
                GET STARTED
                </Button>
                <p className="text-zinc-600 dark:text-zinc-400">
                Already have an account?
                </p>
            </div>
        </div>
    );
}