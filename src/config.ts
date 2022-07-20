import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: 'postgresql://user:super_secret@localhost:5432/pg_base'
}));
