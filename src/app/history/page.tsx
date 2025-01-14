'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function HistoryPage() {
	const { user } = useUser();
	const [adHistory, setAdHistory] = useState<
		{ _id: string; generatedAdUrl: string }[]
	>([]);

	useEffect(() => {
		const fetchUserDetails = async () => {
			const res = await fetch('/api/get-user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: user?.emailAddresses[0].emailAddress,
				}),
			});
			const data = await res.json();
			setAdHistory(data.result.ads);
		};
		if (user) fetchUserDetails();
	}, [user?.emailAddresses, user]);

	return (
		<div className='min-h-screen p-6 w-full text-white bg-gray-950'>
			<h1 className='mt-[70px] text-2xl text-purple-400 font-bold'>
				Ads Generation History
			</h1>
			<div className='flex gap-4 mt-4 flex-wrap'>
				{adHistory.length ? (
					adHistory.map((ad) => {
						return (
							<div key={ad?._id} className='rounded-xl p-1 bg-black border'>
								<video
									className='w-[300px] h-[300px]'
									src={ad?.generatedAdUrl}
									controls
								></video>
							</div>
						);
					})
				) : (
					<p className='text-white text-xl'>No ads generated!</p>
				)}
			</div>
		</div>
	);
}
