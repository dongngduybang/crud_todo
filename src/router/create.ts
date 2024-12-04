
import { add } from '../db';


export const createHandle = async (c: any) => {
    let newID = 1;
    try {
        const body = await c.req.json();
        if (!body?.task) {
            return c.json({ error: 'Task null' }, 400);
        }
        await add(body.task);
        return c.json({ success: 'Task added' }, 200);
    } catch (error) {
        console.error('Error adding task:', error);
        return c.json({ error: 'Failed add' }, 500);
    }
};

