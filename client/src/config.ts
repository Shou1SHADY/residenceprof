// API base URL configuration
export const API_BASE_URL = 
  typeof window !== 'undefined' 
    ? '/api' // Use relative path in browser
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Helper function to create full API URLs
export function apiUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
}
