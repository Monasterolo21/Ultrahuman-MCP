import { describe, expect, test } from "bun:test";
import { fetchUltrahumanMetrics } from "./index";

describe("ultrahumanMetrics", () => {
  test("should validate required parameters", () => {
    expect(() =>
      fetchUltrahumanMetrics({
        date: "2025-06-19",
      })
    ).not.toThrow();
  });

  test("should throw error if environment variables are not set", async () => {
    // Save original env vars
    const originalAuthToken = process.env.ULTRAHUMAN_AUTH_TOKEN;

    // Remove env var
    delete process.env.ULTRAHUMAN_AUTH_TOKEN;

    try {
      await expect(
        fetchUltrahumanMetrics({
          date: "2025-06-19",
        })
      ).rejects.toThrow(
        "ULTRAHUMAN_AUTH_TOKEN environment variable is not set"
      );
    } finally {
      // Restore env var
      if (originalAuthToken) {
        process.env.ULTRAHUMAN_AUTH_TOKEN = originalAuthToken;
      }
    }
  });

  test("should throw error if email environment variable is not set", async () => {
    // Save original env vars
    const originalUserEmail = process.env.ULTRAHUMAN_USER_EMAIL;

    // Remove env var
    delete process.env.ULTRAHUMAN_USER_EMAIL;

    try {
      await expect(
        fetchUltrahumanMetrics({
          date: "2025-06-19",
        })
      ).rejects.toThrow(
        "ULTRAHUMAN_USER_EMAIL environment variable is not set"
      );
    } finally {
      // Restore env var
      if (originalUserEmail) {
        process.env.ULTRAHUMAN_USER_EMAIL = originalUserEmail;
      }
    }
  });
});
