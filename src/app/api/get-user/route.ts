import { connectToDb } from '@/config/db';
import UserModel from '@/models/user';
import '@/models/ad';

export async function POST(req: Request) {
	try {
		await connectToDb();
		const { email } = await req.json();
    
		if (!email) {
			return Response.json(
				{ success: false, error: 'Missing required fields.' },
				{ status: 400 }
			);
		}
		const user = await UserModel.findOne({ email }).populate({
			path: 'ads',
		});
		return Response.json({ success: true, result: user }, { status: 200 });
	} catch (error) {
		console.log('Error getting user: ', error);
		return Response.json(
			{ success: false, error: 'Error getting user.' },
			{ status: 500 }
		);
	}
}
