/**
 * Centralized API endpoint paths for the application.
 * Use these constants with the buildUrl function to ensure consistency.
 */
export const apiEndpoints = {
  auth: {
    registerPatient: "/user/create-patient",
    // Add other auth-related endpoints here (e.g., login, resetPassword)
  },
  // Add other feature domains here as the project grows
} as const;

/**
 * Utility function to build a full URL for backend API requests.
 * It safely concatenates the base URL from environment variables with the provided path.
 * 
 * @param path - The API route path (e.g., apiEndpoints.auth.registerPatient)
 * @returns The fully qualified URL string
 */
export const buildUrl = (path: string): string => {
  const backendBaseUrl = process.env.backend_base_url || "";
  
  // Ensure we don't have double slashes by removing trailing slashes from the base
  // and leading slashes from the path before joining them.
  const baseUrl = backendBaseUrl.replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+/, "");
  
  return `${baseUrl}/${normalizedPath}`;
};
