#!/usr/bin/env node

// Load environment variables
import "dotenv/config";

async function testApiCall() {
  try {
    console.log("Testing Ultrahuman API...");
    console.log(
      "Auth token:",
      process.env.ULTRAHUMAN_AUTH_TOKEN ? "Set" : "Not set"
    );
    console.log("API Base URL:", process.env.ULTRAHUMAN_API_BASE_URL);

    const authToken = process.env.ULTRAHUMAN_AUTH_TOKEN;
    const baseUrl =
      process.env.ULTRAHUMAN_API_BASE_URL ||
      "https://partner.ultrahuman.com/api/v1";

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

    console.log("API Response:");
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error testing API:", error.message);
  }
}

testApiCall();
