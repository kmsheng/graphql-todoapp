import '@babel/polyfill';
import consola from 'consola';
import express from 'express';
import helmet from 'helmet';
import {ApolloServer, gql} from 'apollo-server-express';
import {Nuxt, Builder} from 'nuxt';
import session from 'express-session';
import schema from './graphql/schema';

const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

app.set('port', port);

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = (process.env.NODE_ENV !== 'production');
config.production = (process.env.NODE_ENV === 'production');

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.production
    }
  }));
  const server = new ApolloServer(schema);
  server.applyMiddleware({app});

  // Give nuxt middleware to express
  app.use(helmet());
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
