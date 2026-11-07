import { defaultPortfolioData } from "./defaultData";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isLocalhost(url: string): boolean {
  return url.includes('127.0.0.1') || url.includes('localhost');
}

export async function fetchPortfolioData(retries = 2) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001/api';
  const apiToken = process.env.CMS_API_TOKEN;
  const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

  // On Vercel / Production: if NEXT_PUBLIC_API_URL is still pointing to localhost,
  // do not hang the serverless function retrying an unreachable local address.
  if (isProd && isLocalhost(apiUrl)) {
    console.warn(
      `[API] NEXT_PUBLIC_API_URL is set to local address "${apiUrl}" in production/Vercel. Serving complete fallback portfolio data.`
    );
    return defaultPortfolioData;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };
      if (apiToken) {
        headers['Authorization'] = `Bearer ${apiToken}`;
      }

      const res = await fetch(`${apiUrl}/portfolio`, {
        headers,
        signal: controller.signal,
        next: { revalidate: 60 }, // ISR: refresh in background every 60s
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        console.warn(`[API] Attempt ${attempt}: HTTP ${res.status}`);
        if (attempt < retries) { await sleep(800); continue; }
        return defaultPortfolioData;
      }

      const json = await res.json();
      if (json && json.data) {
        // Merge with default data to guarantee all required sections exist
        return {
          home: json.data.home || defaultPortfolioData.home,
          about: json.data.about || defaultPortfolioData.about,
          skills: json.data.skills?.length ? json.data.skills : defaultPortfolioData.skills,
          skill_section: json.data.skill_section || defaultPortfolioData.skill_section,
          experience_section: json.data.experience_section || defaultPortfolioData.experience_section,
          project_section: json.data.project_section || defaultPortfolioData.project_section,
          projects: json.data.projects?.length ? json.data.projects : defaultPortfolioData.projects,
          services: json.data.services?.length ? json.data.services : defaultPortfolioData.services,
          achievements: json.data.achievements?.length ? json.data.achievements : defaultPortfolioData.achievements,
          settings: json.data.settings || defaultPortfolioData.settings,
          social_media: json.data.social_media?.length ? json.data.social_media : defaultPortfolioData.social_media,
        };
      }
      return defaultPortfolioData;
    } catch (error) {
      console.warn(`[API] Attempt ${attempt}: Failed to reach API at ${apiUrl}`);
      if (attempt < retries) { await sleep(800); continue; }
      return defaultPortfolioData;
    }
  }
  return defaultPortfolioData;
}

export function getImageUrl(path: string | null) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8001/storage';
  return `${storageUrl}/${path}`;
}

export function getResumeDownloadUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl || isLocalhost(apiUrl)) {
    return "/resume.pdf";
  }
  return `${apiUrl}/resume/download`;
}

export async function submitInquiry(data: { name: string; email: string; subject: string; message: string }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001/api';

  if (typeof window !== 'undefined' && isLocalhost(apiUrl) && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // If running in production browser but API URL is localhost, fall back to email link
    const mailtoUrl = `mailto:contact@devbhavsar.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.name} (${data.email})\n\n${data.message}`)}`;
    window.open(mailtoUrl, '_blank');
    return { success: true, message: "Opened email client with your message." };
  }
  
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
