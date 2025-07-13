"use client";

import { useState } from "react";
import { Assessment } from "./queries";
import { cn } from "@/lib/utils";
import Content from "./Content";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface ExamInterfaceProps {
  assessment: Assessment;
  contentCount: number;
}

export default function ExamInterface({
  assessment,
  contentCount,
}: ExamInterfaceProps) {
  const [count, setCount] = useState(1);
  const content = assessment.ReadingAssessments?.[Number(count) - 1]?.Content;

  return (
    <>
      <div className="h-[80%]">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="flex-1">
            <Content contentCount={contentCount} content={content} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="border w-fit min-w-[100%] max-lg:min-w-full h-full">
              <iframe
                src={assessment.FormUrl}
                width="100%"
                height="100%"
                className="w-full border max-lg:h-[700px]"
              >
                Loading…
              </iframe>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-1 gap-3 items-center border-t justify-center h-10 w-full">
        {/* <span className="font-medium">Reading Passage: </span> */}
        <p className="flex justify-center items-center gap-3 w-full h-full">
          {Array.from({ length: contentCount }).map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCount(idx + 1)}
              className={cn(
                "cursor-pointer w-1/3 text-center flex items-center justify-center  hover:bg-gray-300 h-full transition-all",

                idx + 1 === count ? "border-blue-500" : ""
              )}
            >
              Part {idx + 1}
            </div>
          ))}
        </p>
      </div>
    </>
  );
}
