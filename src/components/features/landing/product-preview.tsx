import { MOCK_JOBS, MOCK_JOB_MATCHES } from "@/mocks";
import { cn } from "@/utils";

const PREVIEW_JOBS = MOCK_JOB_MATCHES.slice()
  .sort((a, b) => b.score - a.score)
  .slice(0, 4)
  .map((match) => ({ ...MOCK_JOBS.find((job) => job.id === match.jobId)!, score: match.score }));

function scoreColor(score: number) {
  if (score >= 75) return "bg-emerald-600";
  if (score >= 50) return "bg-amber-500";
  return "bg-rose-500";
}

/** Static product preview: a job-matches table as it appears inside the app. */
export function ProductPreview() {
  return (
    <div
      className="w-full overflow-hidden rounded-lg border border-line bg-white shadow-[0_1px_2px_rgb(15_23_42/0.04),0_12px_32px_-8px_rgb(15_23_42/0.16)]"
      aria-label="Preview of recommended jobs in ApplyWise"
      role="img"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div>
          <p className="text-sm font-semibold text-ink">Recommended jobs</p>
          <p className="text-xs text-muted">Based on your resume</p>
        </div>
        <span className="rounded border border-line px-2 py-1 text-xs font-medium text-body">Sort: Best match</span>
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-line bg-canvas px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
        <span>Role</span>
        <span className="w-28 text-right sm:w-36">Match</span>
      </div>

      <ul>
        {PREVIEW_JOBS.map((job) => (
          <li key={job.id} className="grid grid-cols-[1fr_auto] items-center gap-x-6 border-b border-line px-5 py-3 last:border-b-0">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{job.title}</p>
              <p className="truncate text-xs text-muted">
                {job.company} · {job.location}
              </p>
            </div>
            <div className="flex w-28 items-center gap-2.5 sm:w-36">
              <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                <div className={cn("h-full rounded-full", scoreColor(job.score))} style={{ width: `${job.score}%` }} />
              </div>
              <span className="w-9 text-right text-sm font-semibold tabular-nums text-ink">{job.score}%</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
