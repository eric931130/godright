import { SectionTitle } from "@/components/common/section-title";
import { TimelineView } from "@/components/lore/timeline-view";

export default function TimelinePage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle
        eyebrow="Chronicle"
        title="神權編年史"
        description="從上古創世、三殿九尊形成，到神權崩壞與天命之子登場。"
      />
      <TimelineView />
    </div>
  );
}
