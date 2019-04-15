import app from './app';

const server = app();

const port = Number(process.env.PORT) || 8080;

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
