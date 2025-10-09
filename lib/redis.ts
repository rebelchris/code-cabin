import { createClient } from 'redis';

// Use the REDIS_URL environment variable (e.g., redis://:<password>@<host>:<port>)
// Vercel/Next.js will automatically pick this up.
const client = createClient({
    url: process.env.REDIS_URL,
});

// Since the `redis` client is connection-based, we connect it once.
// In a serverless environment, this means the connection will be established
// when the function "cold starts" and should be reused.
client.on('error', (err) => console.error('Redis Client Error', err));

// It's crucial to connect the client.
// We only export the client once it's connected or attempting to connect.
// The Route Handler will await this connection promise.
const redisConnection = client.connect();

export const redis = {
    // We export a function that ensures the client is ready before use.
    async use() {
        await redisConnection;
        return client;
    }
};
