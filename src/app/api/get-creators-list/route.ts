export async function GET() {
	try {
		// Requesting caption.ai to get the list of creators
		const response = await fetch(
			`${process.env.CAPTION_AI_API_URL}/api/ads/list-creators`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': process.env.CAPTION_AI_API_KEY || '',
				},
			}
		);
		const data = await response.json();
		return Response.json(
			{ success: true, result: data },
			{ status: response.status }
		);
	} catch (error) {
		console.log('Error fetching creators list: ', error);
		return Response.json(
			{ success: false, error: 'Error fetching creators list' },
			{ status: 500 }
		);
	}
}
