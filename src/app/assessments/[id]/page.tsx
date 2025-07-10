import { cn } from "@/lib/utils";
import { getAssessment } from "./queries";

import Content from "./Content";

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const assessmentId = (await params).id;
  const assessment = await getAssessment(assessmentId);
  if (!assessment) {
    return <div>Assessment not found</div>;
  }

  const contentCount = assessment[0].ReadingAssessments?.length ?? 0;

  return (
    <div
      className={cn(
        "flex justify-between h-full max-lg:flex-col",
        !contentCount && "justify-center"
      )}
    >
      <Content assessment={assessment[0]} contentCount={contentCount} />
      <div className="border w-fit min-w-[50%] max-lg:min-w-full h-full">
        <iframe
          src={assessment[0].FormUrl}
          width="100%"
          height="100%"
          className="w-full border max-lg:h-[700px]"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
