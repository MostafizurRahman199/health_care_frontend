"use server";

import { apiEndpoints } from "@/lib/build-url";
import { proxy } from "@/lib/proxy-fetch";
import { loginSchema } from "@/lib/validation/auth";

import { decodeJwt } from "@/lib/jwt";

export interface LoginState {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
  inputs?: Record<string, string>;
  role?: string;
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
    const response = await proxy.post(apiEndpoints.auth.userLogin, { email, password });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        message: errorData?.message || "Failed to login",
        inputs,
      };
    }

    // Consume response json
    await response.json();

    // Extract the accessToken cookie to retrieve the user's role
    let role = "PATIENT";
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const token = cookieStore.get("accessToken")?.value;
      if (token) {
        const decoded = decodeJwt(token);
        if (decoded?.role) {
          role = decoded.role;
        }
      }
    } catch (cookieErr) {
      console.warn("[loginUser] Warning: could not access cookies to extract role:", cookieErr);
    }

    return {
      success: true,
      message: "Logged in successfully!",
      role,
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

