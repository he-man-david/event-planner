import express from 'express';
import handler from './libs';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

const host = process.env.NX_CLOUD_HOST ?? 'localhost';
const port = process.env.NX_LINKPREVIEW_PORT
  ? Number(process.env.NX_LINKPREVIEW_PORT)
  : 3003;

// health check endpoint
app.get('/', (_, res) => {
  res.send(true);
});

app.post('/', handler);

app.listen(port, host, () => {
  console.log(`[LinkPreview Service] Listening on http://${host}:${port}`);
});
