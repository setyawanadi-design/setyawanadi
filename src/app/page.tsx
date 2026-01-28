
import { HeroModule } from "@/components/modules/HeroModule";
import { VisualLog } from "@/components/modules/VisualLog";
import { ProjectCard } from "@/components/modules/ProjectCard";
import { StackModule } from "@/components/modules/StackModule";
import { ContactCard } from "@/components/modules/ContactCard";
import { ActivityFeed } from "@/components/modules/ActivityFeed";
import { getLogPosts, getHomeData, getPinnedLogs } from "@/lib/mdx";
import { PinnedLogs } from "@/components/modules/PinnedLogs";

export default function Home() {
  const recentLogs = getLogPosts().slice(0, 4);
  const pinnedLogs = getPinnedLogs();
  const data = getHomeData();
  const activityItems = recentLogs.map((log) => ({
    id: log.slug,
    text: `New Log: ${log.metadata.title}`,
    href: `/logs/${log.slug}`
  }));

  return (
    <div className="space-y-2 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <HeroModule
        title="Setyawanadi"
        subtitle="Digital Workspace & Design System"
        badgeText="SYSTEM ONLINE"
      />

      {/* MOBILE ONLY: Dashboard Widgets (Contact + Activity) */}
      <div className="block lg:hidden space-y-2">
        <ContactCard />
        <ActivityFeed
          className="min-h-auto"
          items={activityItems}
        />
      </div>

      {/* ROW 2: Focus & Project Merged (Full Width) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
        <ProjectCard
          title={data?.project.title || "Project"}
          slug={data?.project.id}
          description={data?.project.description || ""}
          progress={data?.project.progress}
          status={data?.project.status}
          category={data?.project.category}
          // Focus Props
          focusStatus={data?.focus.status}
          focusDescription={data?.focus.description}
          checklist={data?.project.checklist}
          className="md:col-span-3 h-full"
        />
      </div>

      {/* ROW 3: Visual Log (2/3) + Stack (1/3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
        <VisualLog
          id={data?.visualLog.id || "LOG_ERR"}
          year={data?.visualLog.year || "2026"}
          imageSrc={data?.visualLog.imageSrc}
          label={data?.visualLog.label}
          className="md:col-span-2 h-full"
        />
        <StackModule
          title={data?.stack.title}
          subtitle={data?.stack.subtitle}
          tags={data?.stack.tags || []}
          className="md:col-span-1 h-full"
        />
      </div>

      {/* ROW 4: Pinned Logs (Full Width) */}
      <div className="md:col-span-3">
        <PinnedLogs items={pinnedLogs} showHeader={false} />
      </div>

    </div>
  );
}
