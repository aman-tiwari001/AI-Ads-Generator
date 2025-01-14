import { connectToDb } from '@/config/db';
import AdModel from '@/models/ad';
import UserModel from '@/models/user';
import cloudinary from 'cloudinary';

export async function POST(req: Request) {
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
		cloudinary.v2.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});

		const cloud = await cloudinary.v2.uploader.upload(generatedAdUrl, {
			resource_type: 'video',
		});

		const newAd = await AdModel.create({
			creatorName,
			script,
			mediaUrl,
			resolution,
			generatedAdUrl: cloud.url,
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
