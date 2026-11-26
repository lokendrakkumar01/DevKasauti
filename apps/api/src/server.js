import { app } from './app.js';
import { env } from './config/env.js';

app.listen(env.port, '0.0.0.0', () => {
  // Local startup info; secrets and tokens ko kabhi logs mein nahi likhna.
  console.log(`DevKasauti API listening on port ${env.port}`);
});
