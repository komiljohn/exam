"use client";

import sanitizeHtml from "sanitize-html";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Assessment } from "./queries";

export default function Content({
  assessment,
  contentCount,
}: {
  assessment: Assessment;
  contentCount: number;
}) {
  const [count, setCount] = useState(1);

  const content = assessment.ReadingAssessments?.[Number(count) - 1]?.Content;

  return (
    <div className="flex flex-col justify-between">
      <div className="lg:overflow-y-auto lg:max-h-[calc(100%-60px)]">
        {contentCount && (
          <p
            className="p-4 whitespace-pre-wrap grow"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
          />
        )}
      </div>
      <div className="flex gap-3 items-center border-t justify-center p-3">
        <span className="font-medium">Reading Passage: </span>
        <p className="flex justify-center gap-3">
          {Array.from({ length: contentCount }).map((_, idx) => (
            <Button
              key={idx}
              onClick={() => setCount(idx + 1)}
              size="sm"
              variant="outline"
              className={cn(
                "cursor-pointer",
                idx + 1 === count ? "border-blue-500" : ""
              )}
            >
              {idx + 1}
            </Button>
          ))}
        </p>
      </div>
    </div>
  );
}
