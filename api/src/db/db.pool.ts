import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Database } from '#db/db.types';

const { Pool } = pg;

pg.types.setTypeParser(1082, (stringValue) => {
	return stringValue;
});
pg.types.setTypeParser(pg.types.builtins.INT8, (val) => {
	return parseInt(val, 10);
});

export const pgPool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: 5432,
	database: 'hajosiko',
});

const dialect = new PostgresDialect({
	pool: pgPool,
});

export const db = new Kysely<Database>({
	dialect,
});
