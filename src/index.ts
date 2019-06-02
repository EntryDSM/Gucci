import app from './app';
import { port } from './config';

app().then(server =>
  server.listen(port, () => {
    console.log(`listening on port:${port}`);
  }),
);
