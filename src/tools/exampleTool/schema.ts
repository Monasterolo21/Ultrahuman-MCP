import * as z from "zod";

export const someFunctionSchema = z.object({
	name: z.string().describe("Name of the person"),
	address: z.object({
		street: z.string().describe("Street address"),
		zip: z.string().describe("Zip code"),
	}).describe("Address object"),
});

export type SomeFunctionSchema = z.infer<typeof someFunctionSchema>;
