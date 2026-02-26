const urls = [
  'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1530915365347-230c6b1d4f26?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1574270981935-82e185e49216?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1554068865-24cecd4e34d8?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560012057-4372e14c5085?q=80&w=60&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=60&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522778147829-047360bdc7f6?q=80&w=800&auto=format&fit=crop',
  'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://servemaster.pro',
  'https://images.unsplash.com/photo-1554068865-24cecd4e34d8?q=80&w=1080&auto=format&fit=crop',
  'https://www.svgrepo.com/show/475656/google-color.svg',
  'https://www.svgrepo.com/show/475633/apple-color.svg'
];

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
  for (const url of urls) {
    const result = await checkUrl(url);
    console.log(`${result.status} - ${result.url}`);
  }
}

run();
