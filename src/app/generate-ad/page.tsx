'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { DownloadIcon, Video } from 'lucide-react';
import UploadFile from '@/components/upload';
import Image from 'next/image';
import { fileDownloader } from '@/utility/downloader';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';

export default function GenerateAdPage() {
	const [adScript, setAdScript] = useState<string>('');
	const [creator, setCreator] = useState<string>('Kate');
	const [loading, setLoading] = useState<boolean>(false);
	const [pollLoading, setPollLoading] = useState<boolean>(false);
	const [adStatus, setAdStatus] = useState<{
		state: string;
		progress: number;
		url: string;
	}>({ state: '', progress: 0, url: '' });
	const [resolution, setResolution] = useState<'4k' | 'fhd'>('4k');
	const [mediaFiles, setMediaFiles] = useState<string[]>([]);
	const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string>('');
	const [creatorsList, setCreatorsList] = useState<string[]>(['Fetching...']);
	const { user } = useUser();
	console.log('User: ', user?.emailAddresses[0].emailAddress);

	const handleVideoDownload = async () => {
		if (generatedVideoUrl) {
			await fileDownloader(
				generatedVideoUrl,
				`${creator}_${resolution}_${new Date().toISOString()}.mp4`
			);
			toast.success('Video downloaded!');
		}
	};

	const submitAdToDb = async () => {
		try {
			const res = await fetch('/api/submit-ad', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					script: adScript,
					creatorName: creator,
					resolution,
					mediaUrl: mediaFiles,
					generatedAdUrl: generatedVideoUrl,
					email: user?.emailAddresses[0].emailAddress,
				}),
			});
			const data = await res.json();
			console.log(data);
			toast.success('Ad saved to database!');
		} catch (error) {
			console.log('Error submitting ad to db: ', error);
		}
	};

	const pollingAdGenStatus = async (
		operationId: string,
		cleanUp: () => void
	) => {
		try {
			const res = await fetch('/api/get-ad-status', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					operationId,
				}),
			});
			const data = await res.json();
			console.log(data);
			setAdStatus({
				state: data.result.state,
				progress: data.result.progress,
				url: data.result?.url,
			});
			if (data.result.state === 'COMPLETE' || data.result.url) {
				cleanUp();
				setGeneratedVideoUrl(data.result.url);
				setPollLoading(false);
				toast.success('Ad generated!');
				await submitAdToDb();
			}
		} catch (error) {
			console.log('Error polling ad generation status: ', error);
		}
	};

	const generateVideoAd = async () => {
		try {
			setGeneratedVideoUrl('');
			setLoading(true);
			const res = await fetch('/api/generate-ad', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					adScript,
					creator,
					resolution,
					mediaFiles,
				}),
			});
			const data = await res.json();
			toast.success('Ad generation started!');
			if (data.success) {
				setPollLoading(true);
				setAdStatus({ progress: 1, state: 'QUEUED', url: '' });
				const timeoutId = setTimeout(() => {
					const intervalId = setInterval(() => {
						pollingAdGenStatus(data.result.operationId, () => {
							clearInterval(intervalId);
							clearTimeout(timeoutId);
						});
					}, 5000);
				}, 10000);
			}
		} catch (error) {
			console.log('Error generating ad video: ', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		generateVideoAd();
	};

	useEffect(() => {
		const fetchCreators = async () => {
			try {
				console.log('Fetching creators list...');
				const response = await fetch('/api/get-creators-list');
				const data = await response.json();
				setCreatorsList(data.result.supportedCreators);
				console.log(data);
			} catch (error) {
				console.log('Error fetching creators list: ', error);
			}
		};
		fetchCreators();
	}, []);

	return (
		<div className='pt-[50px] min-h-screen bg-gray-900 text-white overflow-hidde'>
			<div className='container mx-auto px-4 py-8'>
				<div className='flex justify-center flex-col lg:flex-row gap-8'>
					<div className='w-full lg:w-1/2'>
						<form
							onSubmit={handleSubmit}
							className='space-y-4 max-md:space-y-6 border-gray-300 border p-4 rounded-xl'
						>
							<div>
								<h1 className='text-2xl max-md:text-2xl mb-3 max-md:mb-5 font-semibold text-cente bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'>
									Generate AI-Powered Video Ad
								</h1>
								<Label className='py-2' htmlFor='script'>
									Ad Script (Max: 800 chars){' '}
									<span className='text-red-500'>*</span>
								</Label>
								<Textarea
									id='script'
									placeholder='Write your ad script here...'
									value={adScript}
									rows={5}
									onChange={(e) => setAdScript(e.target.value)}
									className='bg-gray-800 text-white rounded-lg'
									maxLength={800}
									required
								/>

								<div className='flex items-center justify-center py-4'>
									<hr className='w-full border-gray-600' />
									<span className='px-4 text-gray-400'>OR</span>
									<hr className='w-full border-gray-600' />
								</div>

								<div>
									<Label className='py-2' htmlFor='mediaUpload'>
										Upload Script (TXT File)
									</Label>
									<UploadFile type='script' setUploadData={setAdScript} />
								</div>
							</div>
							<div>
								<Label className='py-2' htmlFor='creator'>
									Creator <span className='text-red-500'>*</span>
								</Label>
								<Select onValueChange={setCreator} defaultValue='Kate' required>
									<SelectTrigger className='bg-gray-800 text-white rounded-lg'>
										<SelectValue placeholder='Select a creator' />
									</SelectTrigger>
									<SelectContent className='bg-gray-800 text-white'>
										{creatorsList.map((creator) => (
											<SelectItem key={creator} value={creator}>
												{creator}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div>
								<Label className='py-2' htmlFor='mediaUpload'>
									Media Files (JPEG, PNG, MOV or MP4){' '}
									<span className='text-red-500'>*</span>
								</Label>
								<UploadFile
									type='media'
									data={mediaFiles}
									setUploadData={setMediaFiles}
								/>
							</div>
							<div>
								<Label className='py-2' htmlFor='resolution'>
									Resolution <span className='text-red-500'>*</span>
								</Label>
								<Select
									onValueChange={(value: string) =>
										setResolution(value as '4k' | 'fhd')
									}
									defaultValue='4k'
									required
								>
									<SelectTrigger className='bg-gray-800 text-white rounded-lg'>
										<SelectValue placeholder='Select resolution' />
									</SelectTrigger>
									<SelectContent className='bg-gray-800 text-white'>
										<SelectItem value='4k'>4K (2160 x 3840)</SelectItem>
										<SelectItem value='fhd'>FHD (1080 x 1920)</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Button
								type='submit'
								className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg'
								disabled={pollLoading || loading}
							>
								{loading ? (
									<Image
										src={'/loader.svg'}
										alt='Loading'
										width={40}
										height={40}
										className='animate-spin'
									/>
								) : (
									'Generate Ad'
								)}
							</Button>
						</form>
					</div>

					<div className='w-full max-lg:min-h-[300px] lg:w-1/2 bg-gray-900'>
						<div className='bg-gray-950 h-full rounded-lg overflow-hidden relative'>
							{generatedVideoUrl && (
								<Button
									onClick={handleVideoDownload}
									variant={'default'}
									className='absolute top-0 right-0 m-1'
								>
									<DownloadIcon size={50} />
								</Button>
							)}
							{adStatus.progress < 100 && adStatus.progress !== 0 && (
								<div className='text-2xl text-center w-full h-full flex flex-col gap-2 items-center justify-center'>
									{' '}
									<Image
										src={'/loader.svg'}
										alt='Loading'
										width={85}
										height={85}
										className='animate-spin text-center mx-auto'
									/>
									<span>{adStatus.progress}%</span>
									<span>Status: {adStatus.state}</span>
								</div>
							)}
							{generatedVideoUrl ? (
								<video
									src={generatedVideoUrl}
									controls
									className='object-cover h-[calc(100vh-110px)] text-center mx-auto'
								></video>
							) : (
								adStatus.progress === 0 && (
									<div className='w-full h-full flex items-center justify-center bg-gray-950'>
										<Video className='w-16 h-16 text-gray-400' />
										<p className='ml-4 text-gray-400'>
											Your generated video will appear here
										</p>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
