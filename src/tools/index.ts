import type { ToolRegistration } from "@/types";
import { someFunctionTool } from "./exampleTool";
import { ultrahumanMetricsTool } from "./ultrahumanMetrics";

// biome-ignore lint/suspicious/noExplicitAny: Any is fine here because all tools validate their input schemas.
export const createTools = (): ToolRegistration<any>[] => {
  return [
    {
      ...someFunctionTool,
      // biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
      handler: (args: any) => someFunctionTool.handler(args),
    },
    {
      ...ultrahumanMetricsTool,
      // biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
      handler: (args: any) => ultrahumanMetricsTool.handler(args),
    },
  ];
};
