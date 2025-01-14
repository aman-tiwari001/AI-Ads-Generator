import { connectToDb } from '@/config/db';
import UserModel from '@/models/user';

export async function POST(req: Request) {
	try {
		await connectToDb();
		const { data } = await req.json();
		if (!data) {
			return Response.json(
				{ success: false, error: 'Missing required fields.' },
				{ status: 400 }
			);
		}
		const { first_name, last_name, email_addresses, image_url } = data;
		const email = email_addresses[0].email_address;
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return Response.json(
				{ success: false, error: 'User already exists.' },
				{ status: 400 }
			);
		}
		const user = await UserModel.create({
			firstName: first_name,
			lastName: last_name,
			email,
			photoUrl: image_url,
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
