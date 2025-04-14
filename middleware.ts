import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        '/',
        '/events/:id',
        '/:username',
        '/api/webhook/clerk',
        '/api/webhook/paystack',
        '/api/webhook/stripe',
        '/api/uploadthing',
        '/api/validate-qr',
    ],
    ignoredRoutes: [
        '/api/webhook/clerk',
        '/api/webhook/paystack',
        '/api/webhook/stripe',
        '/api/uploadthing',
        '/api/paystack',
    ]
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};