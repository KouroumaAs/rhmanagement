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
    },
    /**
   * Authorize badge reprint (for RH)
   */ async authorizeReprint (badgeId) {
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('token') : "TURBOPACK unreachable";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["post"])("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].BADGES, "/").concat(badgeId, "/authorize-reprint"), {}, {
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
"[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PrintBadgePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/node_modules/lucide-react/dist/esm/icons/printer.js [app-client] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$services$2f$badges$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/src/services/badges.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/rhmanagement/frontend/src/constants/index.ts [app-client] (ecmascript)");
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
function PrintBadgePage() {
    var _employee_prenom, _employee_nom;
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const badgeId = params.id;
    const [badge, setBadge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [qrCodeImage, setQrCodeImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Détecter si on doit imprimer automatiquement
    const searchParams = ("TURBOPACK compile-time truthy", 1) ? new URLSearchParams(window.location.search) : "TURBOPACK unreachable";
    const shouldAutoPrint = (searchParams === null || searchParams === void 0 ? void 0 : searchParams.get('autoprint')) === 'true';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PrintBadgePage.useEffect": ()=>{
            setMounted(true);
        }
    }["PrintBadgePage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PrintBadgePage.useEffect": ()=>{
            if (!mounted) return;
            // Reset state before fetching
            setBadge(null);
            setQrCodeImage("");
            fetchBadgeData();
        }
    }["PrintBadgePage.useEffect"], [
        badgeId,
        mounted
    ]);
    // Auto-impression si demandée
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PrintBadgePage.useEffect": ()=>{
            if (shouldAutoPrint && badge && qrCodeImage && !isLoading) {
                // Marquer comme imprimé puis imprimer
                const autoPrintBadge = {
                    "PrintBadgePage.useEffect.autoPrintBadge": async ()=>{
                        try {
                            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$services$2f$badges$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["badgesService"].print(badgeId);
                            console.log('✅ Badge marqué comme imprimé (auto-print)');
                            // Petit délai pour s'assurer que tout est bien rendu
                            setTimeout({
                                "PrintBadgePage.useEffect.autoPrintBadge": ()=>{
                                    window.print();
                                }
                            }["PrintBadgePage.useEffect.autoPrintBadge"], 500);
                        } catch (error) {
                            console.error('❌ Erreur auto-print:', error);
                        }
                    }
                }["PrintBadgePage.useEffect.autoPrintBadge"];
                const timer = setTimeout(autoPrintBadge, 1000);
                return ({
                    "PrintBadgePage.useEffect": ()=>clearTimeout(timer)
                })["PrintBadgePage.useEffect"];
            }
        }
    }["PrintBadgePage.useEffect"], [
        shouldAutoPrint,
        badge,
        qrCodeImage,
        isLoading,
        badgeId
    ]);
    const fetchBadgeData = async ()=>{
        try {
            setIsLoading(true);
            // Récupérer les données du badge
            const badgeResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$services$2f$badges$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["badgesService"].getById(badgeId);
            if (badgeResponse.success && badgeResponse.data) {
                setBadge(badgeResponse.data);
            }
            // Récupérer l'image du QR code
            const qrResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$services$2f$badges$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["badgesService"].getQRCode(badgeId);
            if (qrResponse.success && qrResponse.data) {
                setQrCodeImage(qrResponse.data.image);
            }
        } catch (error) {
            console.error("Erreur lors du chargement:", error);
        } finally{
            setIsLoading(false);
        }
    };
    const handlePrint = async ()=>{
        try {
            // Marquer le badge comme imprimé dans la base de données
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$services$2f$badges$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["badgesService"].print(badgeId);
            console.log('✅ Badge marqué comme imprimé');
            // Ouvrir la fenêtre d'impression
            window.print();
        } catch (error) {
            console.error('❌ Erreur lors de l\'impression:', error);
            alert('Erreur lors de l\'impression du badge. Veuillez réessayer.');
        }
    };
    if (!mounted) {
        return null;
    }
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Chargement du badge..."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
            lineNumber: 102,
            columnNumber: 7
        }, this);
    }
    if (!badge) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-600 text-xl mb-4",
                        children: "Badge non trouvé"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>router.back(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this),
                            "Retour"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                lineNumber: 114,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
            lineNumber: 113,
            columnNumber: 7
        }, this);
    }
    const employee = badge === null || badge === void 0 ? void 0 : badge.employee;
    // Si employee est un string (ID) plutôt qu'un objet, on a un problème
    if (!employee || typeof employee === 'string') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-600 text-xl mb-4",
                        children: "Erreur: Données de l'employé non chargées"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-4",
                        children: [
                            "Type: ",
                            typeof employee
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>router.back(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                lineNumber: 135,
                                columnNumber: 13
                            }, this),
                            "Retour"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                lineNumber: 131,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
            lineNumber: 130,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-3c4af9b36b462747" + " " + "min-h-screen bg-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-3c4af9b36b462747" + " " + "no-print bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-3c4af9b36b462747" + " " + "container mx-auto px-6 py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-3c4af9b36b462747" + " " + "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-3c4af9b36b462747" + " " + "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        onClick: ()=>router.back(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                className: "w-4 h-4 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                lineNumber: 151,
                                                columnNumber: 17
                                            }, this),
                                            "Retour"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-3c4af9b36b462747",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "jsx-3c4af9b36b462747" + " " + "text-xl font-bold text-gray-900",
                                                children: [
                                                    "Badge de ",
                                                    employee === null || employee === void 0 ? void 0 : employee.prenom,
                                                    " ",
                                                    employee === null || employee === void 0 ? void 0 : employee.nom
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                lineNumber: 155,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-3c4af9b36b462747" + " " + "text-sm text-gray-600",
                                                children: [
                                                    "Matricule: ",
                                                    employee === null || employee === void 0 ? void 0 : employee.matricule
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                lineNumber: 158,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: handlePrint,
                                className: "bg-orange-600 hover:bg-orange-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 15
                                    }, this),
                                    "Imprimer"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-3c4af9b36b462747" + " " + "print-container py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-3c4af9b36b462747" + " " + "badge-page mb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "relative",
                                width: "661px",
                                height: "1016px",
                                overflow: "hidden",
                                border: "2px solid #333",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                            },
                            className: "jsx-3c4af9b36b462747" + " " + "badge-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/images/badgeRecto.jpeg",
                                    alt: "Badge Recto",
                                    style: {
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        /* Remplit tout l'espace sans déformation */ zIndex: 1
                                    },
                                    className: "jsx-3c4af9b36b462747"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        zIndex: 2
                                    },
                                    className: "jsx-3c4af9b36b462747",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: "258px",
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: "226px",
                                                height: "246px",
                                                border: "2px solid #000",
                                                overflow: "hidden",
                                                backgroundColor: "#f0f0f0"
                                            },
                                            className: "jsx-3c4af9b36b462747",
                                            children: [
                                                (employee === null || employee === void 0 ? void 0 : employee.photo) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(employee.photo) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(employee.photo) || '',
                                                    alt: "".concat(employee === null || employee === void 0 ? void 0 : employee.prenom, " ").concat(employee === null || employee === void 0 ? void 0 : employee.nom),
                                                    style: {
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover"
                                                    },
                                                    onError: (e)=>{
                                                        // Masquer l'image en cas d'erreur et afficher les initiales
                                                        e.currentTarget.style.display = 'none';
                                                    },
                                                    className: "jsx-3c4af9b36b462747"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 19
                                                }, this) : null,
                                                (!(employee === null || employee === void 0 ? void 0 : employee.photo) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(employee.photo)) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: "100%",
                                                        height: "100%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "80px",
                                                        fontWeight: "bold",
                                                        color: "#999",
                                                        backgroundColor: "#e5e7eb"
                                                    },
                                                    className: "jsx-3c4af9b36b462747",
                                                    children: [
                                                        employee === null || employee === void 0 ? void 0 : (_employee_prenom = employee.prenom) === null || _employee_prenom === void 0 ? void 0 : _employee_prenom[0],
                                                        employee === null || employee === void 0 ? void 0 : (_employee_nom = employee.nom) === null || _employee_nom === void 0 ? void 0 : _employee_nom[0]
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                            lineNumber: 227,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: "510px",
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: "100%",
                                                textAlign: "center",
                                                backgroundColor: "#FFFFFF",
                                                padding: "10px 0"
                                            },
                                            className: "jsx-3c4af9b36b462747",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: "48px",
                                                    fontWeight: "900",
                                                    color: "#000",
                                                    margin: 0,
                                                    textTransform: "capitalize",
                                                    letterSpacing: "2px",
                                                    lineHeight: "1.2"
                                                },
                                                className: "jsx-3c4af9b36b462747",
                                                children: [
                                                    employee === null || employee === void 0 ? void 0 : employee.prenom,
                                                    " ",
                                                    employee === null || employee === void 0 ? void 0 : employee.nom
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                lineNumber: 286,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                            lineNumber: 276,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: "588px",
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: "100%",
                                                textAlign: "center",
                                                backgroundColor: "#FFFFFF",
                                                padding: "8px 0"
                                            },
                                            className: "jsx-3c4af9b36b462747",
                                            children: [
                                                (employee === null || employee === void 0 ? void 0 : employee.type) === "PERSONNEL_DSD" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: "42px",
                                                        fontWeight: "400",
                                                        color: "#ff8d13",
                                                        margin: 0,
                                                        fontStyle: "italic"
                                                    },
                                                    className: "jsx-3c4af9b36b462747",
                                                    children: "Personnel DSD Guinée"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 19
                                                }, this),
                                                (employee === null || employee === void 0 ? void 0 : employee.type) === "DNTT" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: "42px",
                                                        fontWeight: "400",
                                                        color: "#ff8d13",
                                                        margin: 0,
                                                        fontStyle: "italic"
                                                    },
                                                    className: "jsx-3c4af9b36b462747",
                                                    children: "DNTT"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                    lineNumber: 325,
                                                    columnNumber: 19
                                                }, this),
                                                (employee === null || employee === void 0 ? void 0 : employee.type) === "STAGIAIRE_DSD" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: "42px",
                                                        fontWeight: "400",
                                                        color: "#ff8d13",
                                                        margin: 0,
                                                        fontStyle: "italic"
                                                    },
                                                    className: "jsx-3c4af9b36b462747",
                                                    children: "Stagiaire DSD Guinée"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 19
                                                }, this),
                                                (employee === null || employee === void 0 ? void 0 : employee.type) === "BANQUE" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: "42px",
                                                        fontWeight: "400",
                                                        color: "#ff8d13",
                                                        margin: 0,
                                                        fontStyle: "italic"
                                                    },
                                                    className: "jsx-3c4af9b36b462747",
                                                    children: [
                                                        "Banque ",
                                                        (employee === null || employee === void 0 ? void 0 : employee.sousType) || ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 19
                                                }, this),
                                                (employee === null || employee === void 0 ? void 0 : employee.type) === "EMBOUTISSEUR" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        lineHeight: "1.2"
                                                    },
                                                    className: "jsx-3c4af9b36b462747",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontSize: "42px",
                                                                fontWeight: "400",
                                                                color: "#ff8d13",
                                                                margin: 0,
                                                                fontStyle: "italic"
                                                            },
                                                            className: "jsx-3c4af9b36b462747",
                                                            children: "Emboutisseur"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                            lineNumber: 353,
                                                            columnNumber: 21
                                                        }, this),
                                                        (employee === null || employee === void 0 ? void 0 : employee.sousType) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontSize: "36px",
                                                                fontWeight: "700",
                                                                color: "#ff8d13",
                                                                margin: 0,
                                                                fontStyle: "italic"
                                                            },
                                                            className: "jsx-3c4af9b36b462747",
                                                            children: employee.sousType
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                            lineNumber: 361,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 19
                                                }, this),
                                                (employee === null || employee === void 0 ? void 0 : employee.type) === "DNTT_STAGIAIRE" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: "42px",
                                                        fontWeight: "400",
                                                        color: "#ff8d13",
                                                        margin: 0,
                                                        fontStyle: "italic"
                                                    },
                                                    className: "jsx-3c4af9b36b462747",
                                                    children: "DNTT Stagiaire"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 19
                                                }, this),
                                                (employee === null || employee === void 0 ? void 0 : employee.type) === "DEMARCHEUR" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: "42px",
                                                        fontWeight: "400",
                                                        color: "#ff8d13",
                                                        margin: 0,
                                                        fontStyle: "italic"
                                                    },
                                                    className: "jsx-3c4af9b36b462747",
                                                    children: "Collectif des démarcheurs"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                            lineNumber: 305,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: "665px",
                                                left: "170px"
                                            },
                                            className: "jsx-3c4af9b36b462747",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: "40px",
                                                    fontWeight: "700",
                                                    color: "#000",
                                                    margin: 0,
                                                    lineHeight: "1"
                                                },
                                                className: "jsx-3c4af9b36b462747",
                                                children: employee === null || employee === void 0 ? void 0 : employee.matricule
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                lineNumber: 402,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                            lineNumber: 397,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: "730px",
                                                left: "170px"
                                            },
                                            className: "jsx-3c4af9b36b462747",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: "40px",
                                                    fontWeight: "700",
                                                    color: "#000",
                                                    margin: 0,
                                                    lineHeight: "1"
                                                },
                                                className: "jsx-3c4af9b36b462747",
                                                children: "+224669611681"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                lineNumber: 425,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                            lineNumber: 420,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: "810px",
                                                left: "170px",
                                                maxWidth: "430px"
                                            },
                                            className: "jsx-3c4af9b36b462747",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: "28px",
                                                    fontWeight: "600",
                                                    color: "#000",
                                                    margin: 0,
                                                    lineHeight: "1",
                                                    wordBreak: "break-all"
                                                },
                                                className: "jsx-3c4af9b36b462747",
                                                children: "info@dsdguinee.com"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                lineNumber: 449,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                            lineNumber: 443,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-3c4af9b36b462747" + " " + "badge-page",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "relative",
                                width: "661px",
                                height: "1016px",
                                overflow: "hidden",
                                border: "2px solid #333",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                            },
                            className: "jsx-3c4af9b36b462747" + " " + "badge-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/images/badgeVerso.jpeg",
                                    alt: "Badge Verso",
                                    style: {
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        zIndex: 1
                                    },
                                    className: "jsx-3c4af9b36b462747"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                    lineNumber: 486,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        zIndex: 2
                                    },
                                    className: "jsx-3c4af9b36b462747",
                                    children: [
                                        qrCodeImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: "668px",
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                backgroundColor: "#FFFFFF",
                                                padding: "10px"
                                            },
                                            className: "jsx-3c4af9b36b462747",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: qrCodeImage,
                                                alt: "QR Code",
                                                width: "240",
                                                height: "240",
                                                style: {
                                                    display: "block"
                                                },
                                                className: "jsx-3c4af9b36b462747"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                lineNumber: 528,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                            lineNumber: 520,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: "330px",
                                                left: "150px"
                                            },
                                            className: "jsx-3c4af9b36b462747",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: "26px",
                                                    fontWeight: "600",
                                                    color: "#000",
                                                    margin: 0,
                                                    lineHeight: "1"
                                                },
                                                className: "jsx-3c4af9b36b462747",
                                                children: "Conakry, Guinée"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                lineNumber: 550,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                            lineNumber: 545,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: "400px",
                                                left: "150px"
                                            },
                                            className: "jsx-3c4af9b36b462747",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: "26px",
                                                    fontWeight: "600",
                                                    color: "#000",
                                                    margin: 0,
                                                    lineHeight: "1"
                                                },
                                                className: "jsx-3c4af9b36b462747",
                                                children: "+224 623 41 87 95"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                lineNumber: 571,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                            lineNumber: 566,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: "480px",
                                                left: "150px"
                                            },
                                            className: "jsx-3c4af9b36b462747",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: "26px",
                                                    fontWeight: "600",
                                                    color: "#000",
                                                    margin: 0,
                                                    lineHeight: "1"
                                                },
                                                className: "jsx-3c4af9b36b462747",
                                                children: "www.dsdguinee.com"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                                lineNumber: 592,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                            lineNumber: 587,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                                    lineNumber: 505,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                            lineNumber: 472,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                        lineNumber: 466,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "3c4af9b36b462747",
                children: "@page{size:A4 portrait;margin:0}@media print{*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;color-adjust:exact!important}.no-print{display:none!important}html,body{background:#fff!important;width:100%!important;height:100%!important;margin:0!important;padding:0!important}.print-container{width:100%!important;margin:0!important;padding:0!important}.badge-page{page-break-after:always;page-break-inside:avoid;break-after:page;break-inside:avoid;justify-content:center!important;align-items:center!important;width:100vw!important;height:100vh!important;margin:0!important;padding:0!important;display:flex!important;position:relative!important}.badge-page:last-child{page-break-after:auto;break-after:auto}.badge-card{box-shadow:none!important;border:2px solid #333!important;border-radius:0!important;width:661px!important;height:1016px!important;position:relative!important;overflow:hidden!important;transform:none!important}.badge-card img{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}}@media screen{.print-container{max-width:1200px;margin:0 auto}.badge-page{justify-content:center;align-items:center;padding:20px;display:flex}.badge-card{border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,.1);overflow:hidden!important}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/rhmanagement/frontend/app/dashboard/impression/badges/[id]/print/page.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
_s(PrintBadgePage, "Xh32uU+qI7oRibUKgTx8HHw5v88=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$rhmanagement$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PrintBadgePage;
var _c;
__turbopack_context__.k.register(_c, "PrintBadgePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_rhmanagement_frontend_42b46fde._.js.map