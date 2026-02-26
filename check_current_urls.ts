import { readFileSync } from 'fs';
import { execSync } from 'child_process';

async function checkUrl(url: string) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, { 
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    clearTimeout(timeoutId);
    return { url, status: res.status, ok: res.ok };
  } catch (e: any) {
    return { url, status: 'error', message: e.message };
  }
}

async function run() {
  const output = execSync('grep -rI "img src=" src/').toString();
  const urls = output.match(/https:\/\/[^"]+/g) || [];
  const uniqueUrls = [...new Set(urls)];
  
  for (const url of uniqueUrls) {
    const result = await checkUrl(url);
    console.log(`${result.status} - ${result.url}`);
  }
}

run();
