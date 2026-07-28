"use server";

import { buildUrl, apiEndpoints } from "@/lib/build-url";
import { setCookiesFromResponse } from "@/lib/cookies";

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(buildUrl(apiEndpoints.auth.userLogin), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to login");
    }

    // Forward the cookies from the backend response to the client browser
    await setCookiesFromResponse(response);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error(error instanceof Error ? error.message : "An unexpected error occurred");
  }
}
