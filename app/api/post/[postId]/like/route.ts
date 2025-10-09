import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { hashIp } from '@/lib/utils';

// Helper to get hashed IP
const getHashedIp = (req: NextRequest) => {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    return hashIp(ip);
};

// Helper to get Redis keys
const getKeys = (postId: string) => ({
    likes: `post:${postId}:likes`,
    ips: `post:${postId}:liked_by_ips`
});

export async function POST(
    req: NextRequest,
    { params }: { params: { postId: string } }
) {
    const client = await redis.use();
    const { likes, ips } = getKeys(params.postId);
    const hashedIp = getHashedIp(req);

    try {
        // Check if already liked and get current count in one go
        const results = await client
            .multi()
            .sIsMember(ips, hashedIp)
            .get(likes)
            .exec();

        const hasLiked = results[0] as unknown as number;
        const currentLikes = results[1] as unknown as string | null;

        if (hasLiked === 1) {
            return NextResponse.json({
                message: 'Already liked',
                likes: parseInt(currentLikes || '0', 10)
            }, { status: 409 });
        }

        // Add like atomically
        const likeResults = await client
            .multi()
            .sAdd(ips, hashedIp)
            .incr(likes)
            .exec();

        const newLikes = likeResults[1] as unknown as number;

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
    const client = await redis.use();
    const { likes, ips } = getKeys(params.postId);
    const checkStatus = req.nextUrl.searchParams.get('checkStatus') === 'true';

    try {
        const multi = client.multi().get(likes);

        if (checkStatus) {
            multi.sIsMember(ips, getHashedIp(req));
        }

        const results = await multi.exec();
        const count = parseInt((results[0] as unknown as string | null) || '0', 10);
        const hasLiked = checkStatus ? (results[1] as unknown as number) === 1 : false;

        return NextResponse.json({ likes: count, hasLiked });
    } catch (error) {
        console.error('Redis Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
