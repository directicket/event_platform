import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        '/',
        '/events/:id',
        '/:username',
        '/blog',
        '/blog/:slug',
        '/api/webhook/clerk',
        '/api/webhook/paystack',
        '/api/webhook/stripe',
        '/api/uploadthing',
        '/api/validate-qr/:code',
        '/validate/:finalCode',
        '/events/:id/checkout',
        "/assets/:path*",
    ],
    ignoredRoutes: [
        '/api/webhook/clerk',
        '/blog',
        '/blog/:slug',
        '/api/webhook/paystack',
        '/api/webhook/stripe',
        '/api/uploadthing',
        '/api/paystack',
        '/api/validate-qr/:code',
        '/validate/:finalCode',
        '/events/:id/checkout',
        "/assets/:path*",
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