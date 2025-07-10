export interface Assessment {
  id: string;
  FormUrl: string;
  ReadingAssessments: {
    id: string;
    Content: string;
  }[];
}

export async function getAssessment(id: string): Promise<Assessment[]> {
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
