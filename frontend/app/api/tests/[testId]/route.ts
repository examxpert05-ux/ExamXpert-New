import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { testId: string } }
) {
    try {
        const { testId } = params;

        // Get the authorization header
        const authHeader = request.headers.get('authorization');

        // Forward the request to the backend
        const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/tests/${testId}`, {
            method: 'GET',
            headers: {
                ...(authHeader && { 'Authorization': authHeader }),
            },
        });

        const data = await backendResponse.json();

        return NextResponse.json(data, { status: backendResponse.status });
    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
