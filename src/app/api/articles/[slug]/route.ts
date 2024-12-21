import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'articles', `${params.slug}.md`);
    const content = await fs.readFile(filePath, 'utf-8');
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown',
      },
    });
  } catch (error) {
    return new NextResponse('Article not found', { status: 404 });
  }
} 