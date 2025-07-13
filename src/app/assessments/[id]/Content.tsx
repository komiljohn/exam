"use client";

import sanitizeHtml from "sanitize-html";
import React from "react";
import { cn } from "@/lib/utils";

export default function Content({
  contentCount,
  content,
}: {
  contentCount: number;
  content: string;
}) {
  return (
    <div
      className={cn(
        "flex justify-between h-full max-lg:flex-col",
        !contentCount && "justify-center"
      )}
    >
      <div className="flex flex-col justify-between">
        <div className="lg:overflow-y-auto lg:max-h-[calc(100%-60px)]">
          {contentCount && (
            <p
              className="p-4 whitespace-pre-wrap grow"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
