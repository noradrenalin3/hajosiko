import { db } from '#db/db.pool';
import { User, NewUser } from '#db/db.types';

export async function createUser(user: NewUser): Promise<User> {
	return await db
		.insertInto('users')
		.values(user)
		.returningAll()
		.executeTakeFirstOrThrow();
}
