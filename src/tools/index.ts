/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ToolRegistration } from "@/types";
import { ultrahumanMetricsTool } from "./ultrahumanMetrics";

// Any is fine here because all tools validate their input schemas.
export const createTools = (): ToolRegistration<any>[] => {
  return [
    {
      ...ultrahumanMetricsTool,
      // All tools validate their input schemas, so any is fine.
      handler: (args: any) => ultrahumanMetricsTool.handler(args),
    },
  ];
};
