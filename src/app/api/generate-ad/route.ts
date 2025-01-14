export async function POST(req: Request) {
	try {
		const { adScript, creator, resolution, mediaFiles } = await req.json();
		// Requesting caption.ai to generate the ad video
		const response = await fetch(
			`${process.env.CAPTION_AI_API_URL}/api/ads/submit`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': process.env.CAPTION_AI_API_KEY || '',
				},
				body: JSON.stringify({
					creatorName: creator,
					script: adScript,
					mediaUrls: mediaFiles,
          resolution,
				}),
			}
		);
		const data = await response.json();
		return Response.json({ success: true, result: data }, { status: 200 });
	} catch (error) {
		console.log('Error generating ad video: ', error);
		return Response.json(
			{ success: false, error: 'Error generating ad video' },
			{ status: 500 }
		);
	}
}
