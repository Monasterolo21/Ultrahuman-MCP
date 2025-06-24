import * as z from "zod";

export const ultrahumanMetricsSchema = z.object({
  date: z
    .string()
    .describe(
      "Date in YYYY-MM-DD format to fetch metrics for (e.g., '2025-06-19')"
    ),
});

export type UltrahumanMetricsSchema = z.infer<typeof ultrahumanMetricsSchema>;
