'use client';
import {
	SignedIn,
	SignedOut,
	SignInButton,
	useAuth,
	UserButton,
} from '@clerk/nextjs';
import { FileVideoIcon, HistoryIcon, PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
	const { isSignedIn } = useAuth();
	return (
		<nav className='flex items-center justify-between max-md:px-3  px-8 h-[70px] bg-gradient-to-r from-gray-950 via-gray-800 to-gray-950 shadow-2xl text-white fixed top-0 w-[100vw]'>
			<Link href='/'>
				<div className='flex items-center space-x-2'>
					<FileVideoIcon size={36} className='max-md:h-7' color='#c084fc' />
					<h1 className='text-xl max-md:text-lg font-bold text-[#c084fc]'>
						AI Ads Generator
					</h1>
				</div>
			</Link>
			<div className='text-white flex gap-10'>
				{isSignedIn && (
					<Link href='/history' className='max-sm:hidden'>
						<div className='flex gap-1 items-center bg-gray-950 rounded-full p-2 font-semibold border-[#db2777] border-2 text-[#db2777] cursor-pointer hover:bg-gray-900'>
							<HistoryIcon color='#db2777' /> Ads History
						</div>
					</Link>
				)}
				<Link href='/generate-ad' className='max-sm:hidden'>
					<div className='flex gap-1 items-center bg-gray-950 rounded-full p-2 font-semibold border-[#db2777] border-2 text-[#db2777] cursor-pointer hover:bg-gray-900'>
						<PlusCircleIcon color='#db2777' /> Generate Ad
					</div>
				</Link>
				<SignedOut>
					<div className='bg-gradient-to-r from-purple-400 to-pink-600 px-4 py-2 hover:scale-105 rounded-full'>
						<SignInButton mode='modal' forceRedirectUrl={'/generate-ad'} />
					</div>
				</SignedOut>
				<SignedIn>
					<div className='bg-gradient-to-r from-purple-400 to-pink-600 px-4 py-2 hover:scale-105 rounded-full'>
						<UserButton showName />
					</div>
				</SignedIn>
			</div>
		</nav>
	);
};

export default Navbar;
