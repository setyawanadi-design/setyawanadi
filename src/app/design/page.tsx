
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

export const metadata = {
    title: "Design System | setyawanadi",
    description: "UI Kit & Style Guide",
};

export default function DesignPage() {
    return (
        <div className="space-y-24 animate-in fade-in duration-500 max-w-5xl mx-auto pb-24">

            {/* Header */}
            <div className="border-b border-dashed border-border pb-8">
                <Badge variant="outline" className="mb-4">System Design</Badge>
                <h1 className="text-5xl font-bold font-serif mb-4">Design DNA</h1>
                <p className="text-xl text-meta max-w-2xl">
                    The single source of truth for the Setyawanadi digital workspace.
                    Adhering to the "Zero-Clutter" philosophy.
                </p>
            </div>

            {/* SECTION 01: TOKENS */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-border pb-2">
                    <span className="font-mono text-accent">01.</span>
                    <h2 className="text-xl font-bold uppercase tracking-widest">Design Tokens</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Typography */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-mono text-meta uppercase">Typography</h3>
                        <div>
                            <p className="text-xs text-meta mb-1">Font Family: Inter (Sans)</p>
                            <div className="text-4xl font-bold">The quick brown fox.</div>
                        </div>
                        <div>
                            <p className="text-xs text-meta mb-1">Font Family: IBM Plex Mono (Mono)</p>
                            <div className="text-sm font-mono bg-meta/5 p-2 rounded w-fit">
                                const physics = "high-fidelity";
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
            </section>

            {/* SECTION 02: ELEMENTS */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-border pb-2">
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
            </section>

            {/* SECTION 03: COMPONENTS */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-border pb-2">
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

                <div className="space-y-4">
                    <h3 className="text-sm font-mono text-meta uppercase">Hero Module (Derived)</h3>
                    <HeroModule />
                </div>
            </section>

            {/* SECTION 04: MODULES & FEATURES */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-border pb-2">
                    <span className="font-mono text-accent">04.</span>
                    <h2 className="text-xl font-bold uppercase tracking-widest">Modules & Features</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Feature 1: The Stack Module */}
                    <StackModule
                        tags={['React', 'Tailwind', 'Next.js']}
                        className="col-span-1 h-full"
                    />

                    {/* Feature 2: Project Tracker */}
                    <ProjectCard
                        title="Project Stabilization"
                        description="This represents a complex feature module. It consumes 2 columns of the grid and contains nested elements."
                        progress={75}
                        status="75%"
                        className="col-span-1 lg:col-span-2"
                    />
                </div>
            </section>
            {/* SECTION 05: PHASE 3 COMPOSITION */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-border pb-2">
                    <span className="font-mono text-accent">05.</span>
                    <h2 className="text-xl font-bold uppercase tracking-widest">Phase 3: Organisms</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Column 1: Activity Feed (Right Panel Mockup) */}
                    <div className="h-full">
                        <p className="text-xs font-mono text-meta mb-2 uppercase">[Module] Activity Feed</p>
                        <ActivityFeed
                            className="h-[400px]"
                            items={[
                                { id: '1', text: 'Refactored site attendance logic for Q4 reporting', type: 'commit' },
                                { id: '2', text: 'Deployed build 44a to staging environment', type: 'deploy' },
                                { id: '3', text: 'Updated stack documentation: Added Astro', type: 'commit' },
                                { id: '4', text: 'Optimized image assets for hero section', type: 'commit' },
                            ]}
                        />
                    </div>

                    {/* Column 2 & 3: Visuals & CTA */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <p className="text-xs font-mono text-meta mb-2 uppercase">[Module] Visual Log</p>
                            <VisualLog
                                id="TREK_026"
                                year="2026"
                                className="h-[280px]"
                            />
                        </div>

                        <div>
                            <p className="text-xs font-mono text-meta mb-2 uppercase">[Module] Contact Interaction</p>
                            <ContactCard />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
