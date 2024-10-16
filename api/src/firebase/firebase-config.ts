import admin from 'firebase-admin';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('../../local/serviceAccountKey.json');

const firebase = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export default firebase;
