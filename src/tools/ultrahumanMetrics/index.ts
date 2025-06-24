import type { ToolRegistration } from "@/types";
import { makeJsonSchema } from "@/utils/makeJsonSchema";
import {
  type UltrahumanMetricsSchema,
  ultrahumanMetricsSchema,
} from "./schema";

interface UltrahumanApiResponse {
  status: string;
  data?: Record<string, unknown>;
  error?: string;
}

export const fetchUltrahumanMetrics = async (
  args: UltrahumanMetricsSchema
): Promise<string> => {
  try {
    const authToken = process.env.ULTRAHUMAN_AUTH_TOKEN;
    const userEmail = process.env.ULTRAHUMAN_USER_EMAIL;
    const baseUrl = "https://partner.ultrahuman.com/api/v1";

    if (!authToken) {
      throw new Error("ULTRAHUMAN_AUTH_TOKEN environment variable is not set");
    }

    if (!userEmail) {
      throw new Error("ULTRAHUMAN_USER_EMAIL environment variable is not set");
    }

    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/metrics`);
    url.searchParams.append("email", userEmail);
    url.searchParams.append("date", args.date);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
    }

    const data: UltrahumanApiResponse = await response.json();

    if (data.error) {
      throw new Error(`API error: ${data.error}`);
    }

    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Error in fetchUltrahumanMetrics:", error);
    throw new Error(
      `Failed to fetch Ultrahuman metrics: ${(error as Error).message}`
    );
  }
};

export const ultrahumanMetricsTool: ToolRegistration<UltrahumanMetricsSchema> =
  {
    name: "ultrahuman_metrics",
    description:
      "Fetch health and fitness metrics from Ultrahuman API for a specific date. The user email is configured via environment variable, so you only need to specify the date to retrieve health data including heart rate, sleep, steps, temperature, and other biometric measurements.",
    inputSchema: makeJsonSchema(ultrahumanMetricsSchema),
    handler: async (args: UltrahumanMetricsSchema) => {
      try {
        const parsedArgs = ultrahumanMetricsSchema.parse(args);
        const result = await fetchUltrahumanMetrics(parsedArgs);
        return {
          content: [
            {
              type: "text",
              text: result,
            },
          ],
        };
      } catch (error) {
        console.error("Error in ultrahumanMetricsTool handler:", error);
        return {
          content: [
            {
              type: "text",
              text: `Error: ${(error as Error).message}`,
            },
          ],
          isError: true,
        };
      }
    },
  };
