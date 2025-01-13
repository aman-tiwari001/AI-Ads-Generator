export async function POST(req: Request) {
	try {
    const { operationId } = await req.json();
		const response = await fetch(
			`${process.env.CAPTION_AI_API_URL}/api/ads/poll`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': process.env.CAPTION_AI_API_KEY || '',
          'x-operation-id': operationId,
				},
			}
		);
		const data = await response.json();
		return Response.json(
			{ success: true, result: data },
			{ status: response.status }
		);
	} catch (error) {
		console.log('Error fetching ad poll status: ', error);
		return Response.json(
			{ success: false, error: 'Error fetching ad poll status' },
			{ status: 500 }
		);
	}
}
