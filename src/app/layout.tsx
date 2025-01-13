import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/navbar';
import { dark } from '@clerk/themes';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'AI Ads Generator',
	description: 'AI tools to generate video ads for your business',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider appearance={{ baseTheme: dark }}>
			<html lang='en' className='scrollbar-hide'>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
          <Navbar />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
