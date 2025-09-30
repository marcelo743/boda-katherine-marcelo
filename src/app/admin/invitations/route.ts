import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
    return NextResponse.json({ message: 'GET request received' });
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    return NextResponse.json({ message: 'POST request received', data });
}