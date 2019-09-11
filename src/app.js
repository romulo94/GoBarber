import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import express from 'express';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import { v1 } from 'uuid';
import Log from './lib/Log';
import sentryConfig from './config/sentry';
import 'express-async-errors';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.log();
    this.server.use(cors());
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const erros = await new Youch(err, req).toJSON();

        return res.status(500).json(erros);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }

  log() {
    this.server.use((req, res, next) => {
      Log.logger().info({
        headers: req.headers,
        path: req.path,
        method: req.method,
        ip: req.connection.remoteAddress,
        id: v1(),
      });

      return next();
    });
  }
}

export default new App().server;
