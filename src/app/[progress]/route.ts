import { generateProgressBarSVG } from '@/lib/progressBar';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const context = request.nextUrl;
    const progress = context.pathname.slice(1);


    const progressNumber = parseInt( progress, 10);
    
    if (isNaN(progressNumber)) {
      return new NextResponse('Invalid progress', { status: 400 });
    }

    const searchParams = request.nextUrl.searchParams;
    const svgParams = {
      progress: progressNumber,
      scale: searchParams.has('scale') 
        ? parseInt(searchParams.get('scale') || '100', 10) 
        : 100,
      title: searchParams.get('title') || undefined,
      suffix: searchParams.get('suffix') || undefined,
      width: searchParams.has('width') 
        ? parseInt(searchParams.get('width') || '180', 10)
        : undefined,
      color: searchParams.get('color') || undefined
    };

    const svg = generateProgressBarSVG(svgParams);

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=0, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}