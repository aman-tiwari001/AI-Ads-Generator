import { connectToDb } from '@/config/db';
import AdModel from '@/models/ad';
import UserModel from '@/models/user';

export default async function POST(req: Request) {
	try {
		await connectToDb();
		const { script, creatorName, resolution, mediaUrl, generatedAdUrl, email } =
			await req.json();
		if (!script || !creatorName || !mediaUrl || !generatedAdUrl) {
			return Response.json(
				{ success: false, error: 'Missing required fields' },
				{ status: 400 }
			);
		}
		const newAd = await AdModel.create({
			creatorName,
			script,
			mediaUrl,
			resolution,
			generatedAdUrl,
		});
		const updatedUser = await UserModel.findOneAndUpdate(
			{ email },
			{ $push: { ads: newAd._id } },
			{ new: true }
		);
		return Response.json(
			{ success: true, result: updatedUser },
			{ status: 200 }
		);
	} catch (error) {
		console.log('Error adding ad to db: ', error);
		return Response.json(
			{ success: false, error: 'Error adding ad to db' },
			{ status: 500 }
		);
	}
}
