
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";

// Modules
import { HeroModule } from "@/components/modules/HeroModule";
import { ProjectCard } from "@/components/modules/ProjectCard";
import { StackModule } from "@/components/modules/StackModule";
import { ActivityFeed } from "@/components/modules/ActivityFeed";
import { VisualLog } from "@/components/modules/VisualLog";
import { ContactCard } from "@/components/modules/ContactCard";
import { ProjectHeader } from "@/components/modules/ProjectHeader";
import { LogSearch } from "@/components/modules/LogSearch";
import { LogCard } from "@/components/modules/LogCard";
import { LogCategories } from "@/components/modules/LogCategories";
import { LogStats } from "@/components/modules/LogStats";
import { PinnedLogs } from "@/components/modules/PinnedLogs";
import { FocusCard } from "@/components/modules/FocusCard";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DashedLine } from "@/components/ui/DashedLine";


export const metadata = {
    title: "Design System | setyawanadi",
    description: "UI Kit & Style Guide",
};

export default function DesignPage() {
    return (
        <div className="max-w-7xl mx-auto pb-24 px-4 md:px-0">
            {/* Header */}
            <div className="pb-8 mb-16 pt-8 relative">
                <DashedLine className="absolute bottom-0 left-0 w-full" variant="tech" />
                <Badge variant="outline" className="mb-4">System Design</Badge>
                <h1 className="text-5xl font-display font-bold mb-4">Design DNA</h1>
                <p className="text-xl text-meta max-w-2xl">
                    The single source of truth for the Setyawanadi digital workspace.
                    Adhering to the &quot;Zero-Clutter&quot; philosophy.
                </p>
            </div>

            <div className="space-y-24">
                {/* SECTION 01: TOKENS */}
                <section id="tokens" className="scroll-mt-24 space-y-8">
                    <div className="flex items-center gap-3 pb-2 relative">
                        <DashedLine className="absolute bottom-0 left-0 w-full" variant="receipt" />
                        <span className="font-mono text-accent">01.</span>
                        <h2 className="text-xl font-bold uppercase tracking-widest">Tokens</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Typography */}
                        {/* Typography */}
                        <div className="space-y-8">
                            <h3 className="text-sm font-mono text-meta uppercase">Type Scale</h3>

                            {/* Headings */}
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <h1 className="text-5xl font-display font-bold">H1. System Design</h1>
                                    <div className="flex items-center gap-2 text-xs font-mono text-meta">
                                        <span className="text-primary">Space Grotesk</span>
                                        <span>•</span>
                                        <span>text-5xl</span>
                                        <span>•</span>
                                        <span>font-bold</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-display font-bold">H2. Feature Module</h2>
                                    <div className="flex items-center gap-2 text-xs font-mono text-meta">
                                        <span className="text-primary">Space Grotesk</span>
                                        <span>•</span>
                                        <span>text-3xl</span>
                                        <span>•</span>
                                        <span>font-bold</span>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="space-y-1">
                                <p className="text-base text-primary/80 font-sans leading-relaxed max-w-md">
                                    P (Body). The quick brown fox jumps over the lazy dog. Used for specific component descriptions and general reading text.
                                </p>
                                <div className="flex items-center gap-2 text-xs font-mono text-meta">
                                    <span className="text-primary">Inter</span>
                                    <span>•</span>
                                    <span>text-base</span>
                                    <span>•</span>
                                    <span>font-normal</span>
                                </div>
                            </div>

                            {/* Mono */}
                            <div className="space-y-1">
                                <div className="text-sm font-mono bg-meta/5 p-3 rounded w-fit text-accent">
                                    const system = &quot;zero-clutter&quot;;
                                </div>
                                <div className="flex items-center gap-2 text-xs font-mono text-meta">
                                    <span className="text-primary">IBM Plex Mono</span>
                                    <span>•</span>
                                    <span>text-sm</span>
                                </div>
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-mono text-meta uppercase">Color Palette</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="h-12 w-full rounded-md bg-background border border-border"></div>
                                    <div className="flex justify-between text-xs font-mono">
                                        <span>Background</span>
                                        <span className="text-meta">#F2F2F2</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-12 w-full rounded-md bg-card border border-border"></div>
                                    <div className="flex justify-between text-xs font-mono">
                                        <span>Card</span>
                                        <span className="text-meta">#FFFFFF</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-12 w-full rounded-md bg-primary"></div>
                                    <div className="flex justify-between text-xs font-mono">
                                        <span>Primary</span>
                                        <span className="text-meta">#111111</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-12 w-full rounded-md bg-accent"></div>
                                    <div className="flex justify-between text-xs font-mono">
                                        <span>Accent</span>
                                        <span className="text-meta">#3B82F6</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Borders & Lines */}
                    <div className="space-y-6 md:col-span-2">
                        <h3 className="text-sm font-mono text-meta uppercase">Borders & Lines</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <div className="h-12 w-full flex items-center justify-center bg-card border border-dashed border-border rounded-md">
                                    <span className="text-xs text-meta font-mono">Standard (Browser Default)</span>
                                </div>
                                <div className="flex justify-between text-xs font-mono">
                                    <span>Border Dashed</span>
                                    <span className="text-meta">0.8px</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <DashedLine variant="receipt" />
                                <div className="flex justify-between text-xs font-mono">
                                    <span>Receipt Border</span>
                                    <span className="text-meta">Wider / Darker</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 02: ELEMENTS */}
                <section id="elements" className="scroll-mt-24 space-y-8">
                    <div className="flex items-center gap-3 pb-2 relative">
                        <DashedLine className="absolute bottom-0 left-0 w-full" variant="receipt" />
                        <span className="font-mono text-accent">02.</span>
                        <h2 className="text-xl font-bold uppercase tracking-widest">Elements</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <h3 className="text-sm font-mono text-meta uppercase">Buttons</h3>
                            <div className="flex flex-col items-start gap-4">
                                <Button variant="solid">Primary Action</Button>
                                <Button variant="ghost">Secondary / Ghost</Button>
                                <Button variant="link">Link Style</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-mono text-meta uppercase">Badges / Status</h3>
                            <div className="flex flex-wrap gap-3">
                                <Badge variant="pill">Pill</Badge>
                                <Badge variant="outline">Outline</Badge>
                                <Badge variant="dot" statusColor="active">Active</Badge>
                                <Badge variant="dot" statusColor="warning">Warning</Badge>
                                <Badge variant="dot" statusColor="accent">Accent</Badge>
                            </div>
                        </div>

                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-sm font-mono text-meta uppercase">Progress</h3>
                            <div className="max-w-md space-y-2">
                                <Progress value={25} />
                                <Progress value={60} />
                                <Progress value={90} />
                            </div>
                        </div>
                    </div>
                </section >

                {/* SECTION 03: COMPONENTS */}
                <section id="components" className="scroll-mt-24 space-y-8" >
                    <div className="flex items-center gap-3 pb-2 relative">
                        <DashedLine className="absolute bottom-0 left-0 w-full" variant="receipt" />
                        <span className="font-mono text-accent">03.</span>
                        <h2 className="text-xl font-bold uppercase tracking-widest">Components</h2>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-mono text-meta uppercase">The Card (Master Atom)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <Badge variant="dot" statusColor="inactive" className="mb-4">Default</Badge>
                                <p className="text-meta">Standard container. Used for 80% of content.</p>
                            </Card>
                            <Card variant="glass">
                                <Badge variant="dot" statusColor="accent" className="mb-4">Glass</Badge>
                                <p className="text-meta">Frosted overlay.</p>
                            </Card>
                            <Card variant="interactive">
                                <Badge variant="dot" statusColor="active" className="mb-4">Interactive</Badge>
                                <p className="text-meta">Hover physics enabled.</p>
                            </Card>
                        </div>
                    </div>
                </section >

                {/* SECTION 04: MODULES */}
                <section id="modules" className="scroll-mt-24 space-y-8" >
                    <div className="flex items-center gap-3 pb-2 relative">
                        <DashedLine className="absolute bottom-0 left-0 w-full" variant="receipt" />
                        <span className="font-mono text-accent">04.</span>
                        <h2 className="text-xl font-bold uppercase tracking-widest">Modules</h2>
                    </div>

                    {/* Hero Group */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-mono text-meta uppercase">Hero</h3>
                        <HeroModule />
                    </div>

                    {/* Content Group */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-mono text-meta uppercase">Content & Projects</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <StackModule
                                tags={['React', 'Tailwind', 'Next.js']}
                                className="col-span-1 h-full"
                            />
                            <ProjectCard
                                title="Project Stabilization"
                                description="This represents a complex feature module. It consumes columns dynamically."
                                progress={75}
                                status="75%"
                                className="col-span-1 lg:col-span-2"
                            />
                        </div>

                        {/* New Focus Card Demo */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-mono text-meta uppercase">Status & Focus</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FocusCard
                                    title="Current Focus"
                                    status="Active"
                                    description="Developing the new Home Page Grid Layout and finalizing Component Architecture."
                                />
                                <FocusCard
                                    title="Paused Task"
                                    status="Paused"
                                    description="Legacy system migration pending audit results."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Data & Log Group */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-mono text-meta uppercase">Data & Logs</h3>

                        {/* NEW: Log Card Variants */}
                        <div className="space-y-6">
                            <h4 className="text-micro font-mono text-meta uppercase tracking-widest mb-3">Log Cards</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <LogCard
                                    variant="standard"
                                    title="Standard Log Entry"
                                    date="2026.08.14"
                                    meta={{ status: "ACTIVE", loc: "REMOTE" }}
                                    description="The standard card used for the main log feed."
                                />
                                <LogCard
                                    variant="compact"
                                    title="Compact / Pinned"
                                    date="2026.08.14"
                                    id="ID-001"
                                    description="Used in sidebars for quick access."
                                />
                            </div>
                            <LogCard
                                variant="featured"
                                title="Featured Log Entry"
                                date="2026.08.14"
                                meta={{ status: "RESOLVED", loc: "SUMATRA" }}
                                description="Full width variant for hero log items."
                                imageSrc="/placeholder"
                            />
                        </div>

                        {/* NEW: Log Sidebar Widgets */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <h4 className="text-micro font-mono text-meta uppercase tracking-widest mb-3">Sidebar: Categories</h4>
                                <LogCategories items={[
                                    { label: "DEMO_CATEGORY", count: 42, isActive: true },
                                    { label: "INACTIVE_TAG", count: 12 },
                                ]} />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-micro font-mono text-meta uppercase tracking-widest mb-3">Sidebar: Stats</h4>
                                <LogStats stats={[
                                    { label: "UPTIME", value: "99.99%", isGood: true },
                                    { label: "ERRORS", value: "0" },
                                ]} />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-micro font-mono text-meta uppercase tracking-widest mb-3">Sidebar: Pinned</h4>
                                <PinnedLogs />
                            </div>
                        </div>

                        {/* Extracted Components Demo */}
                        <div className="space-y-6 border-2 border-dashed border-border/60 p-6 rounded-xl">
                            <h4 className="text-micro font-mono text-meta uppercase tracking-widest mb-3">Extracted Components</h4>

                            <ProjectHeader
                                id="PROJ_STAB_01"
                                date="Q3 2026"
                                location="LAHAT, SUMATRA"
                                completionPercentage={75}
                            />

                            <CodeBlock
                                filename="DATA_PIPELINE.LOG"
                                code={`{
  "node_id": "SUM_LAT_04",
  "status": "active",
  "latency": "14ms",
  "packets": "7,402",
  "protocol": "MESH_NET_V2"
}`}
                            />
                        </div>

                        {/* Log Search Demo */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-mono text-meta uppercase">Log Interaction</h3>
                            <LogSearch />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Feed */}
                            <div className="h-full">
                                <ActivityFeed
                                    className="h-full"
                                    items={[
                                        { id: '1', text: 'Commit: Updated routing logic for global mesh network.' },
                                        { id: '2', text: 'Deploy: Hotfix for handshake timeout issue deployed to US-East.' },
                                        { id: '3', text: 'System: Initial mesh calibration complete.' },
                                        { id: '4', text: 'Log: System cold boot sequence initiated.' },
                                    ]}
                                />
                            </div>

                            {/* Visuals */}
                            <div className="lg:col-span-2 space-y-6">
                                <VisualLog
                                    id="TREK_026"
                                    year="2026"
                                    className="h-[280px]"
                                />
                                <ContactCard />
                            </div>
                        </div>
                    </div>
                </section >


            </div >
        </div >
    );
}
