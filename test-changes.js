#!/usr/bin/env node

// Load environment variables
import "dotenv/config";

async function testApiCall() {
  try {
    console.log("Testing Ultrahuman API with hardcoded base URL...");
    console.log(
      "Auth token:",
      process.env.ULTRAHUMAN_AUTH_TOKEN ? "Set" : "Not set"
    );

    const authToken = process.env.ULTRAHUMAN_AUTH_TOKEN;
    const baseUrl = "https://partner.ultrahuman.com/api/v1";

    if (!authToken) {
      throw new Error("ULTRAHUMAN_AUTH_TOKEN environment variable is not set");
    }

    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/metrics`);
    url.searchParams.append("email", "smonasterolo2@gmail.com");
    url.searchParams.append("date", "2025-06-19");

    console.log("Making request to:", url.toString());

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

    const data = await response.json();

    if (data.error) {
      throw new Error(`API error: ${data.error}`);
    }

    console.log("✅ API call successful!");
    console.log(
      `Retrieved ${data.data?.metric_data?.length || 0} metric types`
    );
    console.log(
      "Available metrics:",
      data.data?.metric_data?.map((m) => m.type).join(", ")
    );
  } catch (error) {
    console.error("❌ Error testing API:", error.message);
  }
}

testApiCall();
