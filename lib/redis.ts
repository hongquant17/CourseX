import { error } from 'console';
import Redis, {RedisOptions} from 'ioredis';
import { options } from './auth';

export function createRedisInstance(
    config = {
        port: process.env.REDIS_PORT,
        host: '',
        password: '',
    }
) {
    try {
        const options: RedisOptions = {
            host: config.host,
            lazyConnect: true,
            showFriendlyErrorStack: true,
            enableAutoPipelining: true,
            maxRetriesPerRequest: 0,
            retryStrategy: (times: number) => {
                if (times > 3) {
                    throw new Error(`[Redis] Could not connect after ${times} attemps`);
                }
                return Math.min(times*200, 1000);
            }
        }
        if (config.port) {
            options.port = Number(config.port);
        }
        if (config.password) {
            options.password = config.password;
        }

        const redis = new Redis(options);

        redis.on('error', (error: unknown) => {
            console.warn('[Redis] Error connecting', error);
        });
        return redis;
    } catch (e) {
        throw new Error(`[Redis] Could not create a Redis Instance`);
    }

}

declare global {
    var redis: Redis | undefined;
}

export const rd = globalThis.redis || createRedisInstance();

if (process.env.NODE_ENV !== 'production') globalThis.redis = rd;