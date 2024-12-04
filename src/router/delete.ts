import { destroy } from '../db';

export const deleteHandle = async (c: any) => {
    const idParam = c.req.param('id');
    const IDs = parseInt(idParam, 10);
    if (!idParam) {
        return c.json({ error: 'ID is required' }, 400);
    }
    try {
        await destroy(IDs);
        return c.json({ message: 'Task delete successfully' }, 200);
    } catch (error) {
        console.error('Error updating task:', error);
        return c.json({ error: 'Failed to delete task' }, 500);
    }

};
