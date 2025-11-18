export async function GET() {
  const body = 'google.com, pub-5334706525054343, DIRECT, f08c47fec0942fa0';
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}


