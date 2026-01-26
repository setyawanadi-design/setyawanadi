
import { HeroModule } from "@/components/modules/HeroModule";
import { FocusCard } from "@/components/modules/FocusCard";
import { VisualLog } from "@/components/modules/VisualLog";
import { ProjectCard } from "@/components/modules/ProjectCard";
import { StackModule } from "@/components/modules/StackModule";
import { ContactCard } from "@/components/modules/ContactCard";
import { ActivityFeed } from "@/components/modules/ActivityFeed";
import { getLogPosts } from "@/lib/mdx";

export default function Home() {
  const recentLogs = getLogPosts().slice(0, 4);
  const activityItems = recentLogs.map((log) => ({
    id: log.slug,
    text: `New Log: ${log.metadata.title}`,
    href: `/logs/${log.slug}`
  }));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <HeroModule
        title="Setyawanadi"
        subtitle="Digital Workspace & Design System"
        badgeText="SYSTEM ONLINE"
      />

      {/* MOBILE ONLY: Dashboard Widgets (Contact + Activity) */}
      <div className="block lg:hidden space-y-6">
        <ContactCard />
        <ActivityFeed
          className="min-h-auto"
          items={activityItems}
        />
      </div>

      {/* ROW 2: Focus (1/3) + Tracker (2/3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FocusCard
          title="Current Focus"
          status="Active"
          description="Assembling the Core Home Grid and verifying Component Architecture."
          className="md:col-span-1 h-full"
        />
        <ProjectCard
          title="Project Stabilization"
          description="Ensuring all modules match the strict 'Zero-Clutter' design philosophy."
          progress={80}
          status="80%"
          category="[logs] TRACKER // ARCHITECTURE"
          className="md:col-span-2 h-full"
        />
      </div>

      {/* ROW 3: Stack (1/3) + Visual Log (2/3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StackModule
          tags={["Next.js 14", "Tailwind CSS", "TypeScript", "Framer Motion"]}
          className="md:col-span-1 h-full"
        />
        <VisualLog
          id="LOG_IMG_01"
          year="2026"
          imageSrc="" // Placeholder logic will handle this
          className="md:col-span-2 h-full"
        />
      </div>

    </div>
  );
}
