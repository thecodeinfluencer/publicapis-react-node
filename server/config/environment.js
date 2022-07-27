import dotenv from 'dotenv';

dotenv.config();

const { PORT, CONNECTION_URL } = process.env;

const environment = {
  port: PORT,
  connectionUrl: CONNECTION_URL,
};

export default environment;
