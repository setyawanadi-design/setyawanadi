import { getLogPosts } from "@/lib/mdx";
import { DashedLine } from "@/components/ui/DashedLine";

export async function Footer() {
    const posts = getLogPosts();
    const latestDate = posts.length > 0 ? posts[0].metadata.date : "INIT";

    return (
        <footer
            className="sticky bottom-0 w-full h-10 bg-background flex items-center justify-between px-6 z-40 border-t border-border"
        >
            {/* Top Border (Replaced with standard border-t) */}
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-micro tracking-wider text-meta uppercase">
                    LAST UPDATED: {latestDate}
                </span>
            </div>
            <div className="flex gap-4 font-mono text-micro tracking-wider text-meta uppercase">
                <a href="https://github.com/setyawanadi-design" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    GitHub
                </a>
                <a href="https://instagram.com/doovries" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    Instagram
                </a>
            </div>
        </footer >
    );
}
