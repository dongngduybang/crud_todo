import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import handleRouter from './router';

const app = new Hono();

app.route('/crud_todos', handleRouter);
app.get('/', (c) =>
    c.text('CRUD TODOS'));

serve(app, (info) => {
    console.log(`Server is running at http://localhost:${info.port}`);
});

