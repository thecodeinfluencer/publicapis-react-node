import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import environment from './config/environment.js';
import entryRoutes from './routes/entryRoutes.js';
import preload from './utils/preload.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(environment.connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const server = app.listen(environment.port, () => {
      console.log(`listening on ${environment.port}`);
    });

    process.on('unhandledRejection', err => {
      console.log('Global Server Error: ', err);
      server.close(() => process.exit(1));
    });

    preload();
  })
  .catch(err => {
    console.log(err);
  });

app.use('/api/entries', entryRoutes);
