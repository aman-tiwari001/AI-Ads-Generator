import { connectToDb } from '@/config/db';
import UserModel from '@/models/user';

export async function POST(req: Request) {
	try {
    await connectToDb();
		const { firstName, lastName, email, photoUrl } = await req.json();
		if (!firstName || !lastName || !email) {
			return Response.json(
				{ success: false, error: 'Missing required fields.' },
				{ status: 400 }
			);
		}
		const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return Response.json(
        { success: false, error: 'User already exists.' },
        { status: 400 }
      );
    }
		const user = await UserModel.create({
			firstName,
			lastName,
			email,
			photoUrl,
		});
		return Response.json({ success: true, result: user }, { status: 200 });
	} catch (error) {
		console.log('Error authenticating user: ', error);
		return Response.json(
			{ success: false, error: 'Error authenticating user.' },
			{ status: 500 }
		);
	}
}
