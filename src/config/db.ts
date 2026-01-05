import mongoose from 'mongoose';

type ConnectionObject = {
	isConnected?: number;
};

const connection: ConnectionObject = {};

export const connectToDb = async (): Promise<void> => {
	try {
		if (connection.isConnected) {
			console.log('Already connected to the database');
			return;
		}
		const mongDbUri = process.env.MONGODB_URI;
		if (!mongDbUri) {
			throw new Error('MONGODB_URI is not defined in environment variables');
		}

		const db = await mongoose.connect(mongDbUri, { dbName: 'ai-ads-db' });
		connection.isConnected = db.connections[0].readyState;
		console.log('Connected to database');
	} catch (error) {
		console.error('Error connecting to database: ', error);
		process.exit(1);
	}
};

connectToDb();
