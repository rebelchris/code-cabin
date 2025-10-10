import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { hashIp } from '@/lib/utils';

const IP_TTL = 60 * 60 * 24 * 90; // 90 days in seconds

// Helper to get hashed IP
const getHashedIp = (req: NextRequest) => {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    return hashIp(ip);
};

// Helper to get Redis keys
const getKeys = (postId: string, hashedIp?: string) => ({
    likes: `post:${postId}:likes`,
    ip: hashedIp ? `post:${postId}:${hashedIp}` : undefined
});

export async function POST(
    req: NextRequest,
    { params }: { params: { postId: string } }
) {
    const client = await redis.use();
    const hashedIp = getHashedIp(req);
    const { likes, ip } = getKeys(params.postId, hashedIp);

    try {
        // Check if this IP has already liked
        const hasLiked = await client.exists(ip!);

        if (hasLiked) {
            const currentLikes = await client.get(likes);
            return NextResponse.json({
                message: 'Already liked',
                likes: parseInt(currentLikes || '0', 10)
            }, { status: 409 });
        }

        // Add like: set IP flag with TTL and increment counter
        const results = await client
            .multi()
            .set(ip!, '1', { EX: IP_TTL })
            .incr(likes)
            .exec();

        const newLikes = results[1] as number;

        return NextResponse.json({ message: 'Like added', likes: newLikes });
    } catch (error) {
        console.error('Redis Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: { postId: string } }
) {
    const { postId } = await params;
    const client = await redis.use();
    const checkStatus = req.nextUrl.searchParams.get('checkStatus') === 'true';
    const hashedIp = checkStatus ? getHashedIp(req) : undefined;
    const { likes, ip } = getKeys(postId, hashedIp);

    try {
        const multi = client.multi().get(likes);

        if (checkStatus && ip) {
            multi.exists(ip);
        }

        const results = await multi.exec();
        const count = parseInt((results[0] as string | null) || '0', 10);
        const hasLiked = checkStatus ? (results[1] as number) === 1 : false;

        return NextResponse.json({ likes: count, hasLiked });
    } catch (error) {
        console.error('Redis Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
