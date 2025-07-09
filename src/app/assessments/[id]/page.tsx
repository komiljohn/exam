import { cn } from "@/lib/utils";
import { getAssessment } from "./queries";

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const assessment = await getAssessment((await params).id);
  if (!assessment) {
    return <div>Assessment not found</div>;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between h-full",
        !assessment.readingAssessments?.id && "justify-center"
      )}
    >
      {assessment.readingAssessments?.id && <p>content ...</p>}
      <div className="border w-fit min-w-[640px] h-full">
        <iframe
          src={assessment[0].FormUrl}
          width="640"
          height="100%"
          className="w-full max-w-3xl border"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
