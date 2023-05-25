import express from 'express';
import handler from './libs';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

// const host = process.env.NX_CLOUD_HOST ?? 'localhost';
const port = process.env.NX_LINKPREVIEW_PORT
  ? Number(process.env.NX_LINKPREVIEW_PORT)
  : 3003;

// health check endpoint
app.get('/', (_, res) => {
  res.send(true);
});

app.post('/', handler);

console.log(`Server at port ${port}`);
app.listen(port);
