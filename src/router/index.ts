import { Hono } from 'hono';
// import { redis } from '../db';

import { createHandle } from './create';
import { readHandle } from './read';
import { deleteHandle } from './delete';
import { updateHandle } from './update';
const handleRouter = new Hono();


handleRouter.post('/create', createHandle)
handleRouter.post('/read', readHandle)
handleRouter.delete('/delete', deleteHandle)
handleRouter.put('/update/:id', updateHandle)
export default handleRouter;
