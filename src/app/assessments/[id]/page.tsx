import { getAssessment } from "./queries";
import ExamInterface from "./ExamInterface";

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
    <ExamInterface assessment={assessment[0]} contentCount={contentCount} />
  );
}
