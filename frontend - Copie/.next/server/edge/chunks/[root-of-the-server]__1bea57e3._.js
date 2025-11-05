(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__1bea57e3._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/Desktop/rhmanagement/frontend/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
// Routes publiques qui ne nécessitent pas d'authentification
const PUBLIC_ROUTES = [
    '/login',
    '/register',
    '/forgot-password',
    '/verify'
];
function middleware(request) {
    const { pathname } = request.nextUrl;
    // Vérifier si la route est publique
    const isPublicRoute = PUBLIC_ROUTES.some((route)=>pathname.startsWith(route));
    // Récupérer le token depuis les cookies
    const token = request.cookies.get('token')?.value;
    // Si la route n'est PAS publique et qu'il n'y a pas de token -> rediriger vers login
    // Cela protège TOUTES les routes par défaut (y compris /)
    if (!isPublicRoute && !token) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    // Si l'utilisateur est authentifié et essaie d'accéder à une page publique
    if (token && isPublicRoute) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard/rh';
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (public images)
     * - favicon.ico (favicon file)
     * - public static files (.png, .jpg, .jpeg, .svg, .ico)
     */ '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico|webp)).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__1bea57e3._.js.map