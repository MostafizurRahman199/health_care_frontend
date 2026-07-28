"use server";

import { buildUrl, apiEndpoints } from "@/lib/build-url";

export async function registerPatient(formData: FormData) {
  try {
    const response = await fetch(buildUrl(apiEndpoints.auth.registerPatient), {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to register patient");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering patient:", error);
    throw new Error(error instanceof Error ? error.message : "An unexpected error occurred");
  }
}
