export default function getReadingPassageQuestions(part: number): number[] {
  const ranges = {
    1: [1, 13],
    2: [14, 26],
    3: [27, 40],
  };

  const [start, end] = ranges[part as keyof typeof ranges] ?? [1, 13];
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}
