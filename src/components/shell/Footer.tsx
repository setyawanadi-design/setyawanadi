import { getLogPosts } from "@/lib/mdx";
import { DashedLine } from "@/components/ui/DashedLine";

export async function Footer() {
    const posts = getLogPosts();
    const latestDate = posts.length > 0 ? posts[0].metadata.date : "INIT";

    return (
        <footer
            className="sticky bottom-0 w-full h-10 bg-background flex items-center justify-between px-6 z-40"
        >
            {/* Top Border */}
            <DashedLine className="absolute top-0 left-0 w-full" variant="receipt" />
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-micro tracking-wider text-meta uppercase">
                    LAST UPDATED: {latestDate}
                </span>
            </div>
            <div className="font-mono text-micro tracking-wider text-meta uppercase">
                setyawanadi
            </div>
        </footer >
    );
}
