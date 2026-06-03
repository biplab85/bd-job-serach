import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { JobCard } from "@/components/JobCard";
import { getJob, savedJobIds } from "@/lib/data";
import { FiBookmark } from "react-icons/fi";

export default function SavedPage() {
  const saved = savedJobIds.map(getJob).filter(Boolean);

  return (
    <AppScreen
      header={<TopBar title="Saved jobs" subtitle={`${saved.length} bookmarked`} />}
      contentClassName="px-5 py-5"
    >
      {saved.length ? (
        <div className="stagger space-y-3">
          {saved.map((j, idx) =>
            j ? (
              <div key={j.id} style={{ ["--i" as string]: idx }}>
                <JobCard job={j} saved />
              </div>
            ) : null
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center py-24 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-paper-2 text-muted">
            <FiBookmark className="text-2xl" />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">No saved jobs yet</p>
          <p className="mt-1 text-[13.5px] text-muted">
            Tap the bookmark on any job to save it here.
          </p>
        </div>
      )}
    </AppScreen>
  );
}
