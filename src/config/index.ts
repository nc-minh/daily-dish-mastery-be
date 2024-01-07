import dotenv from 'dotenv';
import dotenvSafe from 'dotenv-safe';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenvSafe.config({
  allowEmptyValues: true,
});

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT ?? 8080,
};
