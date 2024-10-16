import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Database } from '#db/db.types.js';

const { Pool } = pg;

const dialect = new PostgresDialect({
	pool: new Pool({
		user: 'postgres',
		password: process.env.DB_PASSWORD,
		host: 'localhost',
		port: 5432,
		database: 'hajosiko',
	}),
});

export const db = new Kysely<Database>({
	dialect,
});
