import { IAd } from '@/types';
import { model, models, Schema } from 'mongoose';

const AdSchema: Schema<IAd> = new Schema(
	{
		creatorName: { type: String, required: true, trim: true },
		script: { type: String, required: true, trim: true },
		mediaUrl: [
			{
				type: String,
				required: true,
				trim: true,
				match: /https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/,
			},
		],
		resolution: { type: String, enum: ['fhd', '4k'], default: '4k' },
		generatedAdUrl: {
			type: String,
			trim: true,
			match: /https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/,
		},
	},
	{ timestamps: true }
);

const AdModel = models.Ad || model<IAd>('Ad', AdSchema);
export default AdModel;
