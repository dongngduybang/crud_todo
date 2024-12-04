
import Redis from 'ioredis';

export const redis = new Redis({
    host: 'localhost',
    port: 6379,
});

export const add = async (task: string) => {

    const lastID = await redis.lindex('todos', -1);
    let newID = 0;
    if (lastID) {

        // Parse task cuối cùng để lấy ID
        const lastTaskObj = JSON.parse(lastID);
        newID = lastTaskObj.id + 1;
    }
    const newTask = {
        id: newID,
        task: task,
    }

    return redis.rpush('todos', JSON.stringify(newTask));
};

export const read = async () => {
    return redis.lrange('todos', 0, -1);
};
export const destroy = async (id: number) => {
    const list = await redis.lrange('todos', 0, -1);
    const deleteTask = list.find((item) => {
        const parsedID = JSON.parse(item);
        return parsedID.id === id;
    });
    // const deleteTaskAll = list.filter((item) => {
    //     const parsedID = JSON.parse(item);
    //     return parsedID.id === id;
    // });

    if (!deleteTask) {
        throw new Error(`ID not found.`);
    }
    await redis.lrem('todos', 1, deleteTask);
    // for (const task of deleteTask) {
    //     await redis.lrem('todos', 0, task);
    // }
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
