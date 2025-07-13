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
import getReadingPassageQuestions from "@/lib/getReadingPassageQuestions";
import { GripVertical } from "lucide-react";

interface ExamInterfaceProps {
  assessment: Assessment;
  contentCount: number;
}

export default function ExamInterface({
  assessment,
  contentCount,
}: ExamInterfaceProps) {
  const [count, setCount] = useState(1);
  const content = assessment.ReadingAssessments?.[count - 1]?.Content;

  return (
    <>
      <div className="h-[80%]">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="flex-1">
            <Content contentCount={contentCount} content={content} />
          </ResizablePanel>
          <ResizableHandle withHandle className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
          </ResizableHandle>
          <ResizablePanel>
            <div className="border w-fit min-w-[100%] max-lg:min-w-full h-full">
              <iframe
                src={assessment.FormUrl}
                width="100%"
                height="100%"
                className="w-full border max-lg:h-[700px]"
              >
                Loading...
              </iframe>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-1 items-center border-t justify-center h-12 w-full">
        <p className="flex justify-center items-center w-full h-full">
          {Array.from({ length: contentCount }).map((_, idx) => {
            const isActive = idx + 1 === count;
            return (
              <div
                key={idx}
                onClick={() => setCount(idx + 1)}
                className={cn(
                  "cursor-pointer w-1/3 text-center flex items-center justify-center hover:bg-gray-100 h-full transition-all",
                  isActive ? "bg-gray-300 hover:bg-gray-300 font-semibold" : ""
                )}
              >
                Part {idx + 1}
                {isActive && (
                  <div className="flex items-center gap-2 ml-4">
                    {getReadingPassageQuestions(idx + 1).map((el) => (
                      <p
                        key={el}
                        className="border-b border-b-gray-400 font-normal text-[12px]"
                      >
                        {el}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </p>
      </div>
    </>
  );
}
