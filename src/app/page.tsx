'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Play, Video, Upload, Download, ChevronRight } from 'lucide-react';
import { useSignUp } from '@clerk/nextjs';

export default function AIAdsGeneratorLanding() {
	const controls = useAnimation();
	const [ref, inView] = useInView();

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
	}, [controls, inView]);

	const fadeInUp = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	const staggerChildren = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const handleSignUp = async () => {
		window.location.href = 'https://premium-mosquito-17.accounts.dev/sign-up';
	};

	return (
		<div className='min-h-screen bg-transparent text-white mt-[70px] no-scrollbar'>
			<video
				className='absolute top-[70px] left-0 w-full h-[500px] max-lg:h-[500px] max-md:h-[500px] object-cover z-[-1] brightness-[0.2]'
				muted
				loop
				autoPlay
			>
				<source src='/ad-bg.mp4' type='video/mp4' />
			</video>
			<header className='container mx-auto px-4 py-16 text-center'>
				<motion.h1
					className='text-5xl max-md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Create Stunning AI-Powered Video Ads
				</motion.h1>
				<motion.p
					className='text-xl mb-8 text-gray-300'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.8 }}
				>
					Transform your business with high-quality, AI-generated video
					advertisements
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.8 }}
				>
					<Button
						onClick={handleSignUp}
						size='lg'
						className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105'
					>
						Get Started Now
					</Button>
				</motion.div>
			</header>

			<section className='py-16 bg-gray-900'>
				<div className='container mx-auto px-4'>
					<motion.h2
						className='text-3xl font-bold mb-12 text-center'
						variants={fadeInUp}
						initial='hidden'
						animate={controls}
						ref={ref}
					>
						Powerful Features for Your Video Ads
					</motion.h2>
					<motion.div
						className='grid grid-cols-1 md:grid-cols-3 gap-8'
						variants={staggerChildren}
						initial='hidden'
						animate={controls}
					>
						<motion.div
							variants={fadeInUp}
							className='bg-gray-700 p-6 rounded-lg shadow-lg'
						>
							<Video className='w-12 h-12 mb-4 text-purple-400' />
							<h3 className='text-xl font-semibold mb-2'>4K Video Quality</h3>
							<p className='text-gray-300'>
								Create stunning high-resolution video ads that captivate your
								audience.
							</p>
						</motion.div>
						<motion.div
							variants={fadeInUp}
							className='bg-gray-700 p-6 rounded-lg shadow-lg'
						>
							<Upload className='w-12 h-12 mb-4 text-pink-400' />
							<h3 className='text-xl font-semibold mb-2'>Easy Media Upload</h3>
							<p className='text-gray-300'>
								Seamlessly upload your scripts and media files to customize your
								ads.
							</p>
						</motion.div>
						<motion.div
							variants={fadeInUp}
							className='bg-gray-700 p-6 rounded-lg shadow-lg'
						>
							<Download className='w-12 h-12 mb-4 text-purple-400' />
							<h3 className='text-xl font-semibold mb-2'>Instant Downloads</h3>
							<p className='text-gray-300'>
								Download your AI-generated video ads instantly and start
								promoting.
							</p>
						</motion.div>
					</motion.div>
				</div>
			</section>

			<section className='py-16 bg-gray-900'>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold mb-12 text-center'>
						How It Works?
					</h2>
					<div className='flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8'>
						<motion.div
							className='flex flex-col items-center text-center'
							whileHover={{ scale: 1.05 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							<div className='w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4'>
								<Play className='w-8 h-8 text-white' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								1. Create Your Script
							</h3>
							<p className='text-gray-300'>
								Write or upload your video ad script
							</p>
						</motion.div>
						<ChevronRight className='hidden md:block w-8 h-8 text-gray-500' />
						<motion.div
							className='flex flex-col items-center text-center'
							whileHover={{ scale: 1.05 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							<div className='w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mb-4'>
								<Upload className='w-8 h-8 text-white' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>2. Upload Media</h3>
							<p className='text-gray-300'>
								Add relevant images and video clips
							</p>
						</motion.div>
						<ChevronRight className='hidden md:block w-8 h-8 text-gray-500' />
						<motion.div
							className='flex flex-col items-center text-center'
							whileHover={{ scale: 1.05 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							<div className='w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4'>
								<Video className='w-8 h-8 text-white' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								3. Generate & Download
							</h3>
							<p className='text-gray-300'>
								Create your AI video ad and download
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			<section className='py-16 bg-gradient-to-r from-purple-600 to-pink-600'>
				<div className='container mx-auto px-4 text-center'>
					<h2 className='text-3xl font-bold mb-6'>
						Ready to Create Your AI-Powered Video Ad?
					</h2>
					<p className='text-xl mb-8'>
						Join our platform and start adverstising...
					</p>
				</div>
			</section>
		</div>
	);
}
