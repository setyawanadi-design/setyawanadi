import { getLogBySlug, getLogPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { DashedLine } from "@/components/ui/DashedLine";
import { Badge } from "@/components/ui/Badge";
import remarkGfm from "remark-gfm";
import { Card } from "@/components/ui/Card";
import { ProjectHeader } from "@/components/modules/ProjectHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/utils";
import { BrutalistCheckbox } from "@/components/ui/BrutalistCheckbox";
import { Gallery } from "@/components/ui/Gallery";

// MDX Component Map
const components = {
    CodeBlock: (props: React.ComponentProps<typeof CodeBlock>) => <CodeBlock {...props} className="mb-8" />,
    Progress,
    Badge,
    DashedLine,
    Card,
    ProjectHeader,
    Gallery, // [NEW]
    // Custom wrappers
    Callout: ({ children, className }: { children: React.ReactNode, className?: string }) => (
        <div className={`p-4 border border-l-4 border-l-primary/50 bg-neutral-50 rounded-sm my-8 ${className || ""}`}>
            {children}
        </div>
    ),
    Grid: ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
        <div className={`grid ${className || "grid-cols-1 md:grid-cols-2 gap-4"}`} style={style}>
            {children}
        </div>
    ),
    Box: ({ children, className, style }: { children?: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
        <div className={className} style={style}>
            {children}
        </div>
    ),

    // Map checkbox input
    input: (props: React.InputHTMLAttributes<HTMLInputElement>) => {
        if (props.type === "checkbox") {
            return <BrutalistCheckbox {...props} />;
        }
        return <input {...props} />;
    },
    // Map standard markdown code blocks (pre) to CodeBlock component
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
        <CodeBlock {...props} className="mb-8">{children}</CodeBlock>
    ),
};

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
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24 pt-0">



            {/* Main Content Card - p-0 to override default Card padding */}
            <Card className="rounded-[12px] shadow-sm border border-border overflow-hidden p-0">
                {/* 1. Header Section (Full Width, No Vertical Padding) */}
                <div className="">
                    <ProjectHeader
                        id={`PROJ_${post.slug.toUpperCase()}_01`}
                        date={post.metadata.date || "2026.Q3"}
                        location={post.metadata.location}
                        category={post.metadata.category}
                        tags={post.metadata.tags}
                    />
                </div>

                {/* 2. Hero Image Section (Full Bleed) */}
                {post.metadata.hero_image && (
                    <div className="w-full aspect-[2/1] bg-neutral-200 overflow-hidden relative grayscale border-y border-border/40">
                        <div
                            className="absolute inset-0 bg-cover bg-center mix-blend-multiply"
                            style={{ backgroundImage: `url('${post.metadata.hero_image}')` }}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent opacity-20" />
                    </div>
                )}

                {/* 3. Content Section (Padded) */}
                <div className="px-4 pb-5 md:px-6 md:pb-12 pt-8 space-y-12">
                    <div className="space-y-4 max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-primary">
                            {post.metadata.title}
                        </h1>
                        <p className="text-xl text-meta/80 font-light leading-relaxed">
                            {post.metadata.description}
                        </p>
                    </div>

                    {/* Main MDX Content */}
                    <div className="prose prose-sm md:prose-base prose-neutral dark:prose-invert max-w-none">
                        <div className="font-sans text-meta leading-relaxed">
                            <MDXRemote
                                source={post.content}
                                components={components}
                                options={{
                                    parseFrontmatter: true,
                                    mdxOptions: {
                                        remarkPlugins: [remarkGfm],
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}