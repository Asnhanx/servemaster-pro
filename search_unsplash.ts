async function searchUnsplash() {
  const res = await fetch('https://unsplash.com/napi/search/photos?query=tennis&per_page=20');
  const data = await res.json();
  data.results.forEach((r: any) => {
    console.log(`https://images.unsplash.com/photo-${r.id}?q=80&w=800&auto=format&fit=crop`);
  });
}
searchUnsplash();
