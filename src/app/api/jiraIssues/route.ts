import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10); // Default page to 1
    const status = searchParams.get('status'); // Optional status filter
    const startAt = (page - 1) * 1; // One result per page, so startAt is based on page

    let jql = 'project = "TEST" ORDER BY created DESC';
    if (status) {
        jql = `project = "TEST" AND status = "${status}" ORDER BY created DESC`;
    }

    console.log(`API called with params - page: ${process.env.NEXT_PUBLIC_DOMAINe}, status: ${status}, jql: ${jql}, startAt: ${startAt}`);

    try {
        const response = await axios.get(
            `https://${process.env.NEXT_PUBLIC_DOMAIN}/rest/api/3/search/`,
            {
                params: { jql, startAt, maxResults: 1 }, // Only one result per page
                headers: {
                    'Authorization': `Basic ${Buffer.from(
                        `${process.env.NEXT_PUBLIC_DOMAIN}:${process.env.NEXT_PUBLIC_JIRA_TOKEN}`
                    ).toString('base64')}`,
                    'Accept': 'application/json'
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        if (error.response) {
            return new NextResponse(JSON.stringify(error.response.data), { status: error.response.status });
        } else if (error.request) {
            // console.error('Request data:', error.request);
            return new NextResponse(JSON.stringify({ message: 'No response received from Jira API' }), { status: 500 });
        } else {
            // console.error('Error message:', error.message);
            return new NextResponse(JSON.stringify({ message: 'Unexpected error occurred' }), { status: 500 });
        }
    }
}
