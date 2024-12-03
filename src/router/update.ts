import { update } from '../db';

export const updateHandle = async (c: any) => {
    const idParam = c.req.param('id');
    const IDs = parseInt(idParam, 10);
    let index = 0

    if (!idParam) {
        return c.json({ error: 'ID is required' }, 400);
    }

    const { task } = await c.req.json();

    if (!task?.trim()) {
        return c.json({ error: 'Task is required' }, 400);
    }

    try {
        await update(index, task.trim(), IDs);
        return c.json({ message: 'Task updated successfully' }, 200);
    } catch (error) {
        console.error('Error updating task:', error);
        return c.json({ error: 'Failed to update task' }, 500);
    }
};
