
import Redis from 'ioredis';

export const redis = new Redis({
    host: 'localhost',
    port: 6379,
});

export const add = async (id: number, task: string) => {
    const newTask = {
        id: id,
        task: task,
    }

    return redis.rpush('todos', JSON.stringify(newTask));
};

export const read = async () => {
    return redis.lrange('todos', 0, -1);
};
export const destroy = async (id: number) => {
    const list = await redis.lrange('todos', 0, -1);
    const destroyTask = await redis.lindex('todos', id);
    if (destroyTask) {
        await redis.lrem('todos', 1, destroyTask);
    }
}
export const update = async (index: number, task: string, id: number) => {
    const list = await redis.lrange('todos', 0, -1);
    const item = JSON.parse(list[index]);
    if (item.id === id) {
        item.task = task;
        await redis.lset('todos', index, JSON.stringify(item));
    }
    throw new Error('ID does not match');


};
