const FALLBACK_API_BASE_URL = 'http://localhost:5000';

export const getApiBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || FALLBACK_API_BASE_URL;
};

export const fetchJson = async <T>(endpoint: string, init?: RequestInit): Promise<T> => {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}${endpoint}`, init);

  if (!response.ok) {
    throw new Error(`API request failed (${response.status}) for ${endpoint}`);
  }

  return (await response.json()) as T;
};
