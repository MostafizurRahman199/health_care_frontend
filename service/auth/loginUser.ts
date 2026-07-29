"use server";

import { buildUrl, apiEndpoints } from "@/lib/build-url";
import { setCookiesFromResponse } from "@/lib/cookies";
import { loginSchema } from "@/lib/validation/auth";

export interface LoginState {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
  inputs?: Record<string, string>;
}

export async function loginUser(prevState: unknown, formData: FormData): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  // Validate the inputs
  const validation = loginSchema.safeParse({
    email,
    password,
  });

  const inputs = {
    email: String(email || ""),
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
    const response = await fetch(buildUrl(apiEndpoints.auth.userLogin), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        message: errorData?.message || "Failed to login",
        inputs,
      };
    }

    // Forward the cookies from the backend response to the client browser
    await setCookiesFromResponse(response);

    // Consume response json
    await response.json();

    return {
      success: true,
      message: "Logged in successfully!",
    };
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
      inputs,
    };
  }
}

