import { redis } from '../db';

export const deleteHandle = async (c: any) => {
    try {
        redis.del('todos').then(() => {
            console.log('Todos list has been deleted.');
        });
    } catch (error) {
        console.error('Error deleting task(s):', error);
        return c.json({ error: 'Failed to delete task(s)' }, 500);
    }
};
