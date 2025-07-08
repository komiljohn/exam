export async function getAssessment(id: string) {
  const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/assessments`;

  try {
    return await fetch(
      `${url}?$filter=Id eq ${id}&$expand=ReadingAssessments`
    ).then((res) => res.json());
  } catch (error) {
    console.error("Failed to fetch assessment:", error);
    throw error;
  }
}
