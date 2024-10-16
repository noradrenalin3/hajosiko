import { db } from '#db/db.pool.js';
import { User, NewUser } from '#db/db.types.js';

export async function createUser(user: NewUser): Promise<User> {
	return await db
		.insertInto('users')
		.values(user)
		.returningAll()
		.executeTakeFirstOrThrow();
}
