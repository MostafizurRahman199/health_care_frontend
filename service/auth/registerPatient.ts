"use server";

import { buildUrl, apiEndpoints } from "@/lib/build-url";
import { registerSchema } from "@/lib/validation/auth";

export interface RegisterState {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
  inputs?: Record<string, string>;
}

export async function registerPatient(prevState: unknown, formData: FormData): Promise<RegisterState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const contactNumber = formData.get("contactNumber");
  const password = formData.get("password");
  const address = formData.get("address");
  const terms = formData.get("terms");

  // Validate the inputs
  const validation = registerSchema.safeParse({
    name,
    email,
    contactNumber,
    password,
    address,
    terms,
  });

  const inputs = {
    name: String(name || ""),
    email: String(email || ""),
    contactNumber: String(contactNumber || ""),
    address: String(address || ""),
  };

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: "Please fix the validation errors below.",
      inputs,
    };
  }

  try {
    const response = await fetch(buildUrl(apiEndpoints.auth.registerPatient), {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        message: errorData?.message || "Failed to register patient",
        inputs,
      };
    }

    await response.json();
    return {
      success: true,
      message: "Patient registered successfully!",
    };
  } catch (error) {
    console.error("Error registering patient:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
      inputs,
    };
  }
}
