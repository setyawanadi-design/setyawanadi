
import { HeroModule } from "@/components/modules/HeroModule";
import { VisualLog } from "@/components/modules/VisualLog";
import { LogCard } from "@/components/modules/LogCard";
// import { StackModule } from "@/components/modules/StackModule";
import { ContactCard } from "@/components/modules/ContactCard";
import { ActivityFeed } from "@/components/modules/ActivityFeed";
import { getLogPosts, getHomeData, getPinnedLogs, getFocusedLogs } from "@/lib/mdx";
import { PinnedLogs } from "@/components/modules/PinnedLogs";

export default function Home() {
  const recentLogs = getLogPosts().slice(0, 4);
  const focusedLogs = getFocusedLogs();
  // Show ALL logs that are not focused (Main Feed)
  const allOtherLogs = getLogPosts().filter(log => !focusedLogs.some(f => f.slug === log.slug));
  const data = getHomeData();
  const focusedCount = focusedLogs.length;

  const activityItems = recentLogs.map((log) => ({
    id: log.slug,
    text: `New Log: ${log.metadata.title}`,
    href: `/${log.slug}`
  }));

  return (
    <div className="space-y-2 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <HeroModule
        title={data?.hero.title || "Setyawanadi"}
        subtitle={data?.hero.subtitle || "Digital Workspace & Design System"}
        badgeText={data?.hero.badgeText || "SYSTEM ONLINE"}
      />

      {/* MOBILE ONLY: Dashboard Widgets (Contact + Activity) */}
      <div className="block lg:hidden space-y-2">
        <ContactCard />
        <ActivityFeed
          className="min-h-auto"
          items={activityItems}
        />
      </div>

      {/* FLUID ROW: Focused Logs + Widgets (Dense Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 grid-flow-dense">
        {/* 1. Focused Logs (Dynamic) */}
        {focusedLogs.map(log => (
          <LogCard
            key={log.slug}
            variant="standard"
            title={log.metadata.title}
            date={log.metadata.date}
            id={log.slug}
            description={log.metadata.description}
            tags={log.metadata.tags}
            meta={{
              status: log.metadata.status,
              progress: log.metadata.progress,
              checklist: log.metadata.checklist
            }}
            className="h-full md:col-span-1"
          />
        ))}

        {/* 2. Visual Log (Fixed Size) */}
        <VisualLog
          key="visual"
          id={data?.visualLog.id || "LOG_ERR"}
          year={data?.visualLog.year || "2026"}
          imageSrc={data?.visualLog.imageSrc}
          label={data?.visualLog.label}
          className="h-full md:col-span-2"
        />

        {/* 3. All Other Logs (Flow into remaining gaps) */}
        {allOtherLogs.map(log => (
          <LogCard
            key={log.slug}
            variant="standard"
            title={log.metadata.title}
            date={log.metadata.date}
            id={log.slug}
            description={log.metadata.description}
            tags={log.metadata.tags}
            meta={{
              status: log.metadata.status,
              progress: log.metadata.progress,
              checklist: log.metadata.checklist
            }}
            className="h-full md:col-span-1"
          />
        ))}
      </div>

    </div>
  );
}
