import { cn } from "@/lib/utils";
import { getAssessment } from "./queries";
import sanitizeHtml from "sanitize-html";

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const assessment = await getAssessment((await params).id);
  if (!assessment) {
    return <div>Assessment not found</div>;
  }

  const hasReadingContent = Boolean(
    assessment[0].ReadingAssessments?.length > 0
  );
  const content = assessment[0].ReadingAssessments?.[0]?.Content;

  return (
    <div
      className={cn(
        "flex justify-between h-full max-lg:flex-col",
        !hasReadingContent && "justify-center"
      )}
    >
      {hasReadingContent && (
        <p
          className="p-4 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
        ></p>
      )}

      <div className="border w-fit min-w-[50%] max-lg:min-w-full h-full">
        <iframe
          src={assessment[0].FormUrl}
          width="100%"
          height="100%"
          className="w-full border"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
