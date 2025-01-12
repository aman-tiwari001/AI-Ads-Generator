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
		const db = await mongoose.connect(
			process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-ads-generator'
		);
		connection.isConnected = db.connections[0].readyState;
		console.log('Connected to database');
	} catch (error) {
		console.error('Error connecting to database: ', error);
		process.exit(1);
	}
};

connectToDb();