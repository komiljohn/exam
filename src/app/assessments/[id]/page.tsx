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
    <div className="flex items-center justify-between h-full">
      <p>content ...</p>
      <div className="border rounded-md w-fit min-w-[640px] h-full">
        <iframe
          src={assessment[0].FormUrl}
          width="640"
          height="100%"
          className="w-full max-w-3xl border rounded"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
