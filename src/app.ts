import express from 'express';
import hello from './http/hello';

const app = express();

app.use(hello);

export default app;
