import { db } from '#db/db.pool';

async function createTables() {
	await db.schema
		.createTable('users')
		.ifNotExists()
		.addColumn('id', 'varchar(48)', (cb) => cb.primaryKey().unique())
		.addColumn('email', 'text', (cb) => cb.notNull())
		.execute();
	await db.schema
		.createTable('vehicles')
		.ifNotExists()
		.addColumn('id', 'integer', (cb) =>
			cb.primaryKey().generatedAlwaysAsIdentity(),
		)
		.addColumn('owner_id', 'varchar(48)', (cb) =>
			cb.notNull().references('users.id').onDelete('cascade'),
		)
		.addColumn('make', 'varchar(48)')
		.addColumn('model', 'varchar(48)')
		.addColumn('year', 'integer')
		.addColumn('kilometers', 'integer')
		.execute();
	await db.schema
		.createTable('service_records')
		.ifNotExists()
		.addColumn('id', 'integer', (cb) =>
			cb.primaryKey().generatedAlwaysAsIdentity(),
		)
		.addColumn('vehicle_id', 'integer', (cb) =>
			cb.notNull().references('vehicles.id').onDelete('cascade'),
		)
		.addColumn('description', 'text')
		.addColumn('notes', 'text')
		.addColumn('date', 'date')
		.addColumn('kilometers', 'integer')
		.addColumn('cost', 'integer')
		.execute();
}

export default function init() {
	createTables().then(() => console.log('Created tables'));
}
