import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/generate-ad', '/history']);

export default clerkMiddleware(async (auth, req) => {
	const { userId, redirectToSignIn } = await auth();
	if (!userId && isProtectedRoute(req))
		return redirectToSignIn({ returnBackUrl: req.url });
});

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)',
	],
};
