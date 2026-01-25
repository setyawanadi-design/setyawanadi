import { getLogBySlug, getLogPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { DashedLine } from "@/components/ui/DashedLine";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ProjectHeader } from "@/components/modules/ProjectHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Progress } from "@/components/ui/Progress";

// Generate static params for all logs
export async function generateStaticParams() {
    const posts = getLogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getLogBySlug(slug);
    if (!post) return { title: "Log Not Found" };

    return {
        title: `${post.metadata.title} | Logs`,
        description: post.metadata.description,
    };
}

export default async function LogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getLogBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">

            {/* Header Block */}
            <div className="space-y-8">
                <div className="flex items-center gap-2">
                    <Link href="/logs" className="group flex items-center gap-2 font-mono text-xs text-meta hover:text-primary transition-colors uppercase tracking-wider">
                        <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                        Back to Logs
                    </Link>
                </div>

                <ProjectHeader
                    id={`PROJ_${post.slug.toUpperCase()}_01`}
                    date={post.metadata.date || "2026.Q3"}
                    location={post.metadata.category || "LAHAT, SUMATRA"}
                    completionPercentage={75}
                />

                {/* Hero Image - Conditional */}
                {post.metadata.hero_image && (
                    <div className="w-full aspect-[2/1] bg-neutral-200 overflow-hidden relative grayscale">
                        <div
                            className="absolute inset-0 bg-cover bg-center mix-blend-multiply"
                            style={{ backgroundImage: `url('${post.metadata.hero_image}')` }}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent opacity-20" />
                    </div>
                )}

                <div className="space-y-4 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-primary">
                        {post.metadata.title}
                    </h1>
                    <p className="text-xl text-meta/80 font-light leading-relaxed">
                        {post.metadata.description}
                    </p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">

                {/* Main Body Content */}
                <div className="prose prose-sm md:prose-base prose-neutral dark:prose-invert max-w-3xl">
                    <div className="whitespace-pre-wrap font-sans text-meta leading-relaxed">
                        {post.content}
                    </div>
                </div>

                {/* Architecture / Complexity Section - Conditional */}
                {post.metadata.arch_code && (
                    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        <DashedLine variant="tech" className="mb-8" />
                        <h2 className="text-2xl font-bold text-primary">System Architecture</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <CodeBlock
                                filename="ARCH_DUMP.LOG"
                                className="bg-neutral-50"
                                code={post.metadata.arch_code}
                            />
                            <div className="space-y-8 py-2">
                                <p className="text-meta leading-relaxed">
                                    The architecture snapshot represents the state at the time of this log entry.
                                    Variables indicate system load and protocol handshake status.
                                </p>
                                {post.metadata.progress_value && (
                                    <div className="space-y-2">
                                        <Progress value={Number(post.metadata.progress_value)} />
                                        <div className="flex justify-between font-mono text-xs text-meta/60 uppercase tracking-wider">
                                            <span>{post.metadata.progress_label || "Progress"}: {post.metadata.progress_value}%</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
