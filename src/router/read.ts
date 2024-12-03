import { read } from '../db';

export const readHandle = async (c: any) => {

    try {
        const page = parseInt(c.req.query('page') || '1', 10)
        const limit = parseInt(c.req.query('limit') || '5', 10)

        if (page <= 0 || limit <= 0) {
            return c.json({ error: 'Invalid page or limit must gather than 0' }, 400);
        }

        const offset = (page - 1) * limit;
        const keys = await read()
        const data = await Promise.all(
            keys.slice(offset, offset + limit).map(async (key) => {
                try {
                    const parsedKey = JSON.parse(key);
                    return parsedKey;
                } catch (e) {
                    const cleanedKey = key.replace(/\\\"/g, '"').replace(/\\\\/g, '\\');
                    return cleanedKey;
                }
            })
        );

        return c.json({
            success: 'Successfully',
            page,
            limit,
            total: keys.length,
            data,
        });
    } catch (e) {
        return c.json({ error: 'Failed to fetch data' }, 500);
    }
}