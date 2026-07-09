export async function fetchPortfolioData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001/api';
  const apiToken = process.env.CMS_API_TOKEN;

  try {
    const res = await fetch(`${apiUrl}/portfolio`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Accept': 'application/json',
      },
      next: { revalidate: 0 } // Disable caching to show instant updates
    });

    if (!res.ok) {
      console.error('Failed to fetch portfolio data', res.status);
      return null;
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return null;
  }
}

export function getImageUrl(path: string | null) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8001/storage';
  return `${storageUrl}/${path}`;
}

export function getResumeDownloadUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001/api';
  return `${apiUrl}/resume/download`;
}
