import express from 'express';
import handler from './libs';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3003;

app.post('/', handler);

app.listen(port, host, () => {
  console.log(`[LinkPreview Service] Listening on http://${host}:${port}`);
});
