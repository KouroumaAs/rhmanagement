(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/rhmanagement/frontend/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/rhmanagement/frontend/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button(param) {
    let { className, variant, size, asChild = false, ...props } = param;
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/rhmanagement/frontend/components/ui/button.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/rhmanagement/frontend/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input(param) {
    let { className, type, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-[#ff8d13] selection:text-white dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", "select-text cursor-text", className),
        style: {
            userSelect: 'text',
            WebkitUserSelect: 'text'
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/rhmanagement/frontend/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/rhmanagement/frontend/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/rhmanagement/frontend/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/rhmanagement/frontend/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/rhmanagement/frontend/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/rhmanagement/frontend/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/rhmanagement/frontend/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/rhmanagement/frontend/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/rhmanagement/frontend/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/rhmanagement/frontend/src/constants/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_ENDPOINTS",
    ()=>API_ENDPOINTS,
    "BADGE_STATUS_COLORS",
    ()=>BADGE_STATUS_COLORS,
    "BADGE_STATUS_LABELS",
    ()=>BADGE_STATUS_LABELS,
    "DATETIME_FORMAT",
    ()=>DATETIME_FORMAT,
    "DATE_FORMAT",
    ()=>DATE_FORMAT,
    "DEFAULT_PAGE_SIZE",
    ()=>DEFAULT_PAGE_SIZE,
    "EMPLOYEE_STATUS_COLORS",
    ()=>EMPLOYEE_STATUS_COLORS,
    "EMPLOYEE_STATUS_LABELS",
    ()=>EMPLOYEE_STATUS_LABELS,
    "EMPLOYEE_TYPE_BADGE_TITLES",
    ()=>EMPLOYEE_TYPE_BADGE_TITLES,
    "EMPLOYEE_TYPE_COLORS",
    ()=>EMPLOYEE_TYPE_COLORS,
    "EMPLOYEE_TYPE_LABELS",
    ()=>EMPLOYEE_TYPE_LABELS,
    "MESSAGES",
    ()=>MESSAGES,
    "PAGE_SIZE_OPTIONS",
    ()=>PAGE_SIZE_OPTIONS,
    "ROUTES",
    ()=>ROUTES,
    "USER_ROLE_LABELS",
    ()=>USER_ROLE_LABELS,
    "VALIDATION",
    ()=>VALIDATION,
    "getImageUrl",
    ()=>getImageUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const EMPLOYEE_TYPE_LABELS = {
    PERSONNELS_DSD: "Personnels DSD Guinée",
    DNTT: "DNTT",
    STAGIAIRES_DSD: "Stagiaires DSD Guinée",
    BANQUES: "Banques",
    MAISONS_PLAQUE: "Maisons de Plaque",
    DNTT_STAGIAIRES: "DNTT Stagiaires",
    DEMARCHEURS: "Collectif des Démarcheurs"
};
const EMPLOYEE_TYPE_COLORS = {
    PERSONNELS_DSD: "bg-[#ff8d13]",
    DNTT: "bg-blue-600",
    STAGIAIRES_DSD: "bg-green-600",
    BANQUES: "bg-purple-600",
    MAISONS_PLAQUE: "bg-pink-600",
    DNTT_STAGIAIRES: "bg-teal-600",
    DEMARCHEURS: "bg-amber-600"
};
const EMPLOYEE_TYPE_BADGE_TITLES = {
    PERSONNELS_DSD: "PERSONNELS DSD GUINEE",
    DNTT: "DNTT",
    STAGIAIRES_DSD: "STAGIAIRES DSD GUINEE",
    BANQUES: "BANQUES",
    MAISONS_PLAQUE: "MAISONS DE PLAQUE",
    DNTT_STAGIAIRES: "DNTT STAGIAIRES",
    DEMARCHEURS: "COLLECTIF DES DEMARCHEURS"
};
const EMPLOYEE_STATUS_LABELS = {
    ACTIF: "Actif",
    SUSPENDU: "Suspendu",
    TERMINE: "Terminé"
};
const EMPLOYEE_STATUS_COLORS = {
    ACTIF: "bg-green-500",
    SUSPENDU: "bg-[#ff8d13]",
    TERMINE: "bg-gray-500"
};
const BADGE_STATUS_LABELS = {
    EN_ATTENTE: "En attente",
    IMPRIME: "Imprimé"
};
const BADGE_STATUS_COLORS = {
    EN_ATTENTE: "bg-[#ff8d13]",
    IMPRIME: "bg-green-500"
};
const USER_ROLE_LABELS = {
    RH: "Ressources Humaines",
    ASSISTANT_RH: "Assistant RH",
    IMPRESSION: "Service d'Impression",
    ADMIN: "Administrateur",
    SECURITY: "Agent de Sécurité"
};
const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    CHANGE_PASSWORD: "/change-password",
    DASHBOARD_RH: "/dashboard/rh",
    DASHBOARD_IMPRESSION: "/dashboard/impression",
    EMPLOYEES: "/dashboard/rh/employees",
    EMPLOYEES_NEW: "/dashboard/rh/employees/new"
};
const API_ENDPOINTS = {
    // Auth
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        LOGOUT: "/auth/logout",
        RESET_PASSWORD: "/auth/reset-password",
        CHANGE_PASSWORD: "/auth/change-password",
        STATS: "/auth/stats",
        USERS: "/auth/users"
    },
    // Employees
    EMPLOYEES: "/employees",
    EMPLOYEE_BY_ID: (id)=>"/employees/".concat(id),
    EMPLOYEE_STATS: "/employees/stats",
    // Badges
    BADGES: "/badges",
    BADGE_BY_ID: (id)=>"/badges/".concat(id),
    BADGE_STATS: "/badges/stats",
    PRINT_BADGE: (id)=>"/badges/".concat(id, "/print"),
    // Users
    USERS: "/users",
    USER_PROFILE: "/users/me"
};
const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [
    10,
    25,
    50,
    100
];
const VALIDATION = {
    MIN_PASSWORD_LENGTH: 8,
    PHONE_REGEX: /^(\+224\s?)?6\d{2}(\s?\d{2}){3}$/,
    // Regex email optimisée et plus stricte (RFC 5322 simplifié)
    EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    MATRICULE_REGEX: /.{3,}/
};
const DATE_FORMAT = "DD/MM/YYYY";
const DATETIME_FORMAT = "DD/MM/YYYY HH:mm";
const MESSAGES = {
    SUCCESS: {
        EMPLOYEE_CREATED: "Employé créé avec succès",
        EMPLOYEE_UPDATED: "Employé mis à jour avec succès",
        EMPLOYEE_DELETED: "Employé supprimé avec succès",
        BADGE_PRINTED: "Badge imprimé avec succès",
        PASSWORD_CHANGED: "Mot de passe modifié avec succès",
        LOGIN_SUCCESS: "Connexion réussie",
        LOGOUT_SUCCESS: "Déconnexion réussie"
    },
    ERROR: {
        GENERIC: "Une erreur est survenue",
        NETWORK: "Erreur de connexion au serveur",
        UNAUTHORIZED: "Accès non autorisé",
        NOT_FOUND: "Ressource non trouvée",
        VALIDATION: "Veuillez vérifier les informations saisies",
        PASSWORD_MISMATCH: "Les mots de passe ne correspondent pas",
        INVALID_CREDENTIALS: "Email ou mot de passe incorrect"
    }
};
const getImageUrl = (photoPath)=>{
    if (!photoPath) return null;
    // Si l'URL commence par http, la retourner telle quelle
    if (photoPath.startsWith('http')) {
        return photoPath;
    }
    // Construire l'URL avec l'API URL de base
    // En production: https://rhmanagement.dsdguinee.com/api + /uploads/...
    // = https://rhmanagement.dsdguinee.com/api/uploads/...
    const apiUrl = ("TURBOPACK compile-time value", "http://192.168.100.171:4003/api") || 'http://localhost:4003';
    // Enlever le / au début de photoPath si présent pour éviter //
    const cleanPath = photoPath.startsWith('/') ? photoPath.slice(1) : photoPath;
    return "".concat(apiUrl, "/").concat(cleanPath);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/rhmanagement/frontend/src/services/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "authService",
    ()=>authService,
    "del",
    ()=>del,
    "get",
    ()=>get,
    "handleApiError",
    ()=>handleApiError,
    "patch",
    ()=>patch,
    "post",
    ()=>post,
    "put",
    ()=>put,
    "upload",
    ()=>upload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/src/constants/index.ts [app-client] (ecmascript)");
;
;
/**
 * Base API configuration
 */ const API_BASE_URL = ("TURBOPACK compile-time value", "http://192.168.100.171:4003/api") || "http://localhost:5000/api";
class ApiError extends Error {
    /**
   * Get a user-friendly error message based on status code
   */ getUserMessage() {
        switch(this.status){
            case 400:
                return "❌ Erreur de validation: ".concat(this.message);
            case 401:
                return "🔒 Session expirée. Veuillez vous reconnecter.";
            case 403:
                return "⛔ Accès refusé. Vous n'avez pas les permissions nécessaires.";
            case 404:
                return "🔍 Ressource non trouvée: ".concat(this.message);
            case 409:
                return "⚠️ Conflit: ".concat(this.message);
            case 422:
                return "📋 Données invalides: ".concat(this.message);
            case 500:
                return "🔥 Erreur serveur: ".concat(this.message);
            case 503:
                return "⏸️ Service temporairement indisponible. Réessayez plus tard.";
            default:
                return "❌ ".concat(this.message);
        }
    }
    /**
   * Get debug information for logging
   */ getDebugInfo() {
        return "[".concat(this.status, "] ").concat(this.name, ": ").concat(this.message, "\nData: ").concat(JSON.stringify(this.data, null, 2));
    }
    constructor(status, message, data){
        super(message), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "status", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "message", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "data", void 0), this.status = status, this.message = message, this.data = data;
        this.name = "ApiError";
    }
}
/**
 * Base fetch wrapper with error handling
 */ async function fetchAPI(endpoint) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    try {
        // Get token from localStorage (only in browser)
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("token") || localStorage.getItem("auth_token") : "TURBOPACK unreachable";
        console.log("🌐 API Request: ".concat(options.method || 'GET', " ").concat(endpoint));
        // Créer un AbortController pour gérer le timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 30000); // 30 secondes
        try {
            const response = await fetch("".concat(API_BASE_URL).concat(endpoint), {
                ...options,
                cache: 'no-store',
                headers: {
                    "Content-Type": "application/json",
                    ...token ? {
                        Authorization: "Bearer ".concat(token)
                    } : {},
                    ...options.headers
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            // Try to parse JSON response
            let data;
            try {
                data = await response.json();
            } catch (parseError) {
                console.error("❌ Erreur de parsing JSON:", parseError);
                throw new ApiError(response.status, "Réponse du serveur invalide", {
                    parseError,
                    status: response.status
                });
            }
            if (!response.ok) {
                // Si le backend renvoie un tableau d'erreurs (validation Zod)
                let errorMessage = data.message || "Une erreur est survenue";
                if (data.errors && Array.isArray(data.errors)) {
                    errorMessage = data.errors.map((err)=>err.message || err).join(', ');
                }
                const apiError = new ApiError(response.status, errorMessage, data);
                // Log detailed error in console
                console.error("❌ API Error:", apiError.getDebugInfo());
                throw apiError;
            }
            console.log("✅ API Success: ".concat(options.method || 'GET', " ").concat(endpoint));
            // Return the full response from backend
            // Backend returns: { success: true, data: ..., message?: ..., pagination?: ... }
            // Extraire success et garder toutes les autres propriétés intactes
            const { success, ...rest } = data;
            return {
                success: success !== null && success !== void 0 ? success : true,
                ...rest
            };
        } catch (fetchError) {
            clearTimeout(timeoutId);
            // Gérer spécifiquement l'erreur de timeout
            if (fetchError instanceof Error && fetchError.name === 'AbortError') {
                const timeoutError = new ApiError(408, "La requête a pris trop de temps (timeout après 30 secondes)");
                console.error("⏱️ Timeout Error:", timeoutError.getDebugInfo());
                throw timeoutError;
            }
            throw fetchError;
        }
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        // Network error or other exception
        const networkError = new ApiError(0, error instanceof Error ? error.message : "Erreur de connexion au serveur");
        console.error("❌ Network Error:", networkError.getDebugInfo());
        throw networkError;
    }
}
async function get(endpoint, options) {
    return fetchAPI(endpoint, {
        ...options,
        method: "GET"
    });
}
async function post(endpoint, data, options) {
    return fetchAPI(endpoint, {
        ...options,
        method: "POST",
        body: JSON.stringify(data)
    });
}
async function put(endpoint, data, options) {
    return fetchAPI(endpoint, {
        ...options,
        method: "PUT",
        body: JSON.stringify(data)
    });
}
async function patch(endpoint, data, options) {
    return fetchAPI(endpoint, {
        ...options,
        method: "PATCH",
        body: JSON.stringify(data)
    });
}
async function del(endpoint, options) {
    return fetchAPI(endpoint, {
        ...options,
        method: "DELETE"
    });
}
async function upload(endpoint, formData, options) {
    try {
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("token") || localStorage.getItem("auth_token") : "TURBOPACK unreachable";
        console.log("📤 Upload Request: POST ".concat(endpoint));
        // Timeout plus long pour les uploads (60 secondes)
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 60000);
        try {
            const response = await fetch("".concat(API_BASE_URL).concat(endpoint), {
                ...options,
                method: "POST",
                body: formData,
                headers: {
                    ...token ? {
                        Authorization: "Bearer ".concat(token)
                    } : {},
                    ...options === null || options === void 0 ? void 0 : options.headers
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            let data;
            try {
                data = await response.json();
            } catch (parseError) {
                console.error("❌ Erreur de parsing JSON:", parseError);
                throw new ApiError(response.status, "Réponse du serveur invalide", {
                    parseError,
                    status: response.status
                });
            }
            if (!response.ok) {
                const apiError = new ApiError(response.status, data.message || "Une erreur est survenue", data);
                console.error("❌ Upload Error:", apiError.getDebugInfo());
                throw apiError;
            }
            console.log("✅ Upload Success: ".concat(endpoint));
            const { success, ...rest } = data;
            return {
                success: success !== null && success !== void 0 ? success : true,
                ...rest
            };
        } catch (uploadFetchError) {
            clearTimeout(timeoutId);
            // Gérer l'erreur de timeout pour les uploads
            if (uploadFetchError instanceof Error && uploadFetchError.name === 'AbortError') {
                const timeoutError = new ApiError(408, "L'upload a pris trop de temps (timeout après 60 secondes)");
                console.error("⏱️ Upload Timeout:", timeoutError.getDebugInfo());
                throw timeoutError;
            }
            throw uploadFetchError;
        }
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        const uploadError = new ApiError(500, error instanceof Error ? error.message : "Erreur lors de l'upload");
        console.error("❌ Upload Error:", uploadError.getDebugInfo());
        throw uploadError;
    }
}
function handleApiError(error) {
    if (error instanceof ApiError) {
        return error.getUserMessage();
    }
    return (error === null || error === void 0 ? void 0 : error.message) || "Une erreur inattendue est survenue";
}
const authService = {
    login: async (credentials)=>{
        return post(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.LOGIN, credentials);
    },
    register: async (data)=>{
        return post(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.REGISTER, data);
    },
    logout: async ()=>{
        return post(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.LOGOUT);
    },
    changePassword: async (data)=>{
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('token') : "TURBOPACK unreachable";
        return put(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.CHANGE_PASSWORD, data, {
            headers: {
                Authorization: "Bearer ".concat(token)
            }
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/rhmanagement/frontend/src/services/badges.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "badgesService",
    ()=>badgesService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/src/constants/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/src/services/api.ts [app-client] (ecmascript)");
;
;
const badgesService = {
    /**
   * Get all badge requests
   */ async getAll (params) {
        const queryParams = new URLSearchParams();
        if (params === null || params === void 0 ? void 0 : params.page) queryParams.append("page", params.page);
        if (params === null || params === void 0 ? void 0 : params.limit) queryParams.append("limit", params.limit);
        if ((params === null || params === void 0 ? void 0 : params.status) && params.status !== "TOUS") queryParams.append("status", params.status);
        if ((params === null || params === void 0 ? void 0 : params.type) && params.type !== "TOUS") queryParams.append("type", params.type);
        if (params === null || params === void 0 ? void 0 : params.search) queryParams.append("search", params.search);
        if (params === null || params === void 0 ? void 0 : params.dateDemandeDe) queryParams.append("dateDemandeDe", params.dateDemandeDe);
        if (params === null || params === void 0 ? void 0 : params.dateDemandeA) queryParams.append("dateDemandeA", params.dateDemandeA);
        if (params === null || params === void 0 ? void 0 : params.dateImpressionDe) queryParams.append("dateImpressionDe", params.dateImpressionDe);
        if (params === null || params === void 0 ? void 0 : params.dateImpressionA) queryParams.append("dateImpressionA", params.dateImpressionA);
        const endpoint = "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].BADGES, "?").concat(queryParams.toString());
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('token') : "TURBOPACK unreachable";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])(endpoint, {
            headers: {
                Authorization: "Bearer ".concat(token)
            }
        });
    },
    /**
   * Get a single badge by ID
   */ async getById (id) {
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('token') : "TURBOPACK unreachable";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].BADGE_BY_ID(id), {
            headers: {
                Authorization: "Bearer ".concat(token)
            }
        });
    },
    /**
   * Print a badge
   */ async print (id) {
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('token') : "TURBOPACK unreachable";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["post"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRINT_BADGE(id), {}, {
            headers: {
                Authorization: "Bearer ".concat(token)
            }
        });
    },
    /**
   * Verify badge by QR code - Retourne uniquement le matricule
   */ async verify (qrCode) {
        console.log('🔍 Appel API verify avec qrCode:', qrCode);
        // Route publique, pas besoin de token
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].BADGES, "/verify/").concat(qrCode));
    },
    /**
   * Get QR code image for a badge
   */ async getQRCode (badgeId) {
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('token') : "TURBOPACK unreachable";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].BADGES, "/").concat(badgeId, "/qr-code"), {
            headers: {
                Authorization: "Bearer ".concat(token)
            }
        });
    },
    /**
   * Download QR code as PNG file
   */ async downloadQRCode (badgeId, employeeName) {
        try {
            var _response_data;
            const response = await this.getQRCode(badgeId);
            if (!response.success || !((_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.image)) {
                throw new Error('Impossible de récupérer le QR code');
            }
            // Convert base64 to blob
            const base64Data = response.data.image;
            const link = document.createElement('a');
            link.href = base64Data;
            link.download = "QRCode_".concat(employeeName.replace(/\s+/g, '_'), "_").concat(Date.now(), ".png");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erreur téléchargement QR code:', error);
            throw error;
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VerifyQRCodePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-client] (ecmascript) <export default as QrCode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$services$2f$badges$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/src/services/badges.service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function VerifyContent() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [qrCode, setQrCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VerifyContent.useEffect": ()=>{
            setMounted(true);
        }
    }["VerifyContent.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VerifyContent.useEffect": ()=>{
            if (!mounted) return;
            const qrFromUrl = searchParams.get('qr');
            if (qrFromUrl) {
                setQrCode(qrFromUrl);
                // Auto-verify after a short delay
                setTimeout({
                    "VerifyContent.useEffect": ()=>{
                        verifyQRCode(qrFromUrl);
                    }
                }["VerifyContent.useEffect"], 500);
            }
        }
    }["VerifyContent.useEffect"], [
        searchParams,
        mounted
    ]);
    const verifyQRCode = async (code)=>{
        try {
            var _response_data;
            setIsLoading(true);
            setError("");
            setResult(null);
            console.log('🔍 [Frontend] Appel verify avec code:', code);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$services$2f$badges$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["badgesService"].verify(code);
            console.log('📥 [Frontend] Réponse reçue:', JSON.stringify(response, null, 2));
            console.log('📥 [Frontend] response.data:', response.data);
            console.log('📥 [Frontend] response.data?.employee:', (_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.employee);
            setResult(response);
        } catch (err) {
            console.error('❌ [Frontend] Erreur verify:', err);
            setError(err.message || "Code QR invalide ou non trouvé");
        } finally{
            setIsLoading(false);
        }
    };
    const handleVerify = async ()=>{
        if (!qrCode.trim()) {
            setError("Veuillez entrer un code QR");
            return;
        }
        await verifyQRCode(qrCode);
    };
    const getStatusInfo = ()=>{
        if (!result || !result.employee) {
            return null;
        }
        // Affichage simple avec le matricule trouvé
        return {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"],
            color: "text-[#ff8d13]",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200"
        };
    };
    const statusInfo = getStatusInfo();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 py-12 px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#ff8d13]/30 mx-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"], {
                                className: "w-10 h-10 text-white"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent",
                                    children: "Vérification de Badge"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 mt-2",
                                    children: "Scannez ou entrez le code QR pour vérifier le statut du badge"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "shadow-2xl border-0 bg-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                            className: "bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-xl font-bold text-gray-900",
                                    children: "Entrez le Code QR"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                    children: "Le code QR se trouve au format QR-XXXX-XXXXXX"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "p-6 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            placeholder: "Ex: QR-2025-ABC123",
                                            value: qrCode,
                                            onChange: (e)=>{
                                                setQrCode(e.target.value);
                                                setError("");
                                            },
                                            onKeyPress: (e)=>e.key === 'Enter' && handleVerify(),
                                            className: "h-12 text-lg border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                            lineNumber: 107,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: handleVerify,
                                            disabled: isLoading,
                                            className: "h-12 px-8 bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13] shadow-lg",
                                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Vérification..."
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                        className: "w-5 h-5 mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                                        lineNumber: 129,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Vérifier"
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                            lineNumber: 117,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                            className: "w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                            lineNumber: 138,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-800 text-sm font-medium",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                            lineNumber: 139,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                    lineNumber: 137,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this),
                result && statusInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "shadow-2xl border-2 ".concat(statusInfo.borderColor, " ").concat(statusInfo.bgColor),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "p-8 space-y-6",
                        children: [
                            result.employee && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold text-gray-500 uppercase mb-2",
                                                children: "Matricule"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                                lineNumber: 154,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-3xl font-bold text-gray-900",
                                                children: result.employee.matricule
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                                lineNumber: 155,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                    lineNumber: 152,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                lineNumber: 151,
                                columnNumber: 17
                            }, this),
                            result && !result.employee && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                        className: "w-16 h-16 text-red-500 mx-auto mb-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xl font-semibold text-gray-900",
                                        children: "Matricule non trouvé"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                        lineNumber: 163,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                                lineNumber: 161,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                        lineNumber: 148,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                    lineNumber: 147,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
            lineNumber: 83,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_s(VerifyContent, "Eqfg0RyxDezsD1fAzkS85tlGvwQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = VerifyContent;
function VerifyQRCodePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 border-4 border-[#ff8d13] border-t-transparent rounded-full animate-spin mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, void 0),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Chargement..."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
                lineNumber: 178,
                columnNumber: 9
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
            lineNumber: 177,
            columnNumber: 7
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VerifyContent, {}, void 0, false, {
            fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
            lineNumber: 184,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/rhmanagement/frontend/app/verify/page.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
_c1 = VerifyQRCodePage;
var _c, _c1;
__turbopack_context__.k.register(_c, "VerifyContent");
__turbopack_context__.k.register(_c1, "VerifyQRCodePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_rhmanagement_frontend_e373b417._.js.map