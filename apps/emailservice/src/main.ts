import express from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 7070;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'This is email service' });
});

app.listen(port, host, () => {
  console.log(`[Email service] http://${host}:${port}`);
});
