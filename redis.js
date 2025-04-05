import Redis from "ioredis";
const redis = new Redis();

const exTime = 60 * 60 * 6 // 6 hours

function setter(key, value) {
    return redis.set(key, value, 'EX', exTime);
}

function getter(key) {
    return redis.get(key);
}

export { setter, getter };