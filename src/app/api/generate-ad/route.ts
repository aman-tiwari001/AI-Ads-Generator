export async function POST(req: Request) {
	try {
		const { adScript, creator, resolution, mediaFiles } = await req.json();
		console.log(adScript, creator, resolution, mediaFiles);
		// curl -X POST https://api.captions.ai/api/ads/submit -H "Content-Type: application/json" -H "x-api-key: <api-key>"
		// -d '{"creatorName": "<creator-name>", "script": "<script>", "mediaUrls": ["media-url-1", "media-url-2", ...]}'
    console.log(JSON.stringify({
      creatorName: creator,
      script: adScript,
      mediaUrls: mediaFiles,
      resolution: resolution,
    }),)
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
		console.log(data);
		return Response.json({ success: true, result: data }, { status: 200 });
	} catch (error) {
		console.log('Error generating ad video: ', error);
		return Response.json(
			{ success: false, error: 'Error generating ad video' },
			{ status: 500 }
		);
	}
}
