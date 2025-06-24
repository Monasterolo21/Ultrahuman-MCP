import {
	type CallToolResult,
	type Tool,
	ToolSchema,
} from "@modelcontextprotocol/sdk/types.js";
import type { z } from "zod";

const ToolInputSchema = ToolSchema.shape.inputSchema;
export type ToolInput = z.infer<typeof ToolInputSchema>;

export type ToolRegistration<T> = Tool & {
	handler: (args: T) => CallToolResult | Promise<CallToolResult>;
};
