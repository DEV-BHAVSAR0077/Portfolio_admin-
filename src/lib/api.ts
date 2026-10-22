async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchPortfolioData(retries = 3) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001/api';
  const apiToken = process.env.CMS_API_TOKEN;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`${apiUrl}/portfolio`, {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Accept': 'application/json',
        },
        next: { revalidate: 0 }, // Disable caching to show instant updates
      });

      if (!res.ok) {
        console.error(`[API] Attempt ${attempt}: HTTP ${res.status}`);
        if (attempt < retries) { await sleep(1000); continue; }
        return null;
      }

      const json = await res.json();
      return json.data;
    } catch (error) {
      console.error(`[API] Attempt ${attempt}: Connection error`, error);
      if (attempt < retries) { await sleep(1000); continue; }
      return null;
    }
  }
  return null;
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

export async function submitInquiry(data: { name: string; email: string; subject: string; message: string }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001/api';
  
  const res = await fetch(`${apiUrl}/inquiry`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to submit inquiry');
  }

  const json = await res.json();
  return json.data;
}
