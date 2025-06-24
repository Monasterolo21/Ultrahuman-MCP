import { describe, expect, it } from "bun:test";
import { someFunction } from "./index";

describe("someFunction", () => {
	it("should return expected output", async () => {
		const result = await someFunction({ name: "Test" });
		expect(result).toBe("Hello Test");
	});

	it("should handle errors", async () => {
		// biome-ignore lint/suspicious/noExplicitAny: For testing purposes
		await expect(someFunction({} as any)).rejects.toThrow();
	});

	// Add more test cases as needed
});
