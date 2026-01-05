'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function HistoryPage() {
	const { user } = useUser();
	const [adHistory, setAdHistory] = useState<
		{ _id: string; generatedAdUrl: string }[]
	>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				setLoading(true);
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
			} catch (error) {
				console.error('Error fetching user details: ', error);
				toast.error('Failed to fetch ad history.');
			} finally {
				setLoading(false);
			}
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
				) : loading ? (
					<Image
						src={'/loader.svg'}
						alt='Loading'
						width={85}
						height={85}
						className='animate-spin text-center mx-auto mt-20'
					/>
				) : (
					<div>
						<p className='text-white text-xl'>No ads generated!</p>
						<Link href='/generate-ad' className='text-purple-400 underline'>
							<button className='bg-purple-500 text-white my-5 px-4 py-2 rounded'>Generate Now</button>
						</Link>{' '}
					</div>
				)}
			</div>
		</div>
	);
}
