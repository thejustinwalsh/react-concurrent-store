module.exports = [
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/batcher.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Batcher",
    ()=>Batcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$detached$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/detached-promise.js [app-rsc] (ecmascript)");
;
class Batcher {
    constructor(cacheKeyFn, /**
     * A function that will be called to schedule the wrapped function to be
     * executed. This defaults to a function that will execute the function
     * immediately.
     */ schedulerFn = (fn)=>fn()){
        this.cacheKeyFn = cacheKeyFn;
        this.schedulerFn = schedulerFn;
        this.pending = new Map();
    }
    static create(options) {
        return new Batcher(options == null ? void 0 : options.cacheKeyFn, options == null ? void 0 : options.schedulerFn);
    }
    /**
   * Wraps a function in a promise that will be resolved or rejected only once
   * for a given key. This will allow multiple calls to the function to be
   * made, but only one will be executed at a time. The result of the first
   * call will be returned to all callers.
   *
   * @param key the key to use for the cache
   * @param fn the function to wrap
   * @returns a promise that resolves to the result of the function
   */ async batch(key, fn) {
        const cacheKey = this.cacheKeyFn ? await this.cacheKeyFn(key) : key;
        if (cacheKey === null) {
            return fn({
                resolve: (value)=>Promise.resolve(value),
                key
            });
        }
        const pending = this.pending.get(cacheKey);
        if (pending) return pending;
        const { promise, resolve, reject } = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$detached$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DetachedPromise"]();
        this.pending.set(cacheKey, promise);
        this.schedulerFn(async ()=>{
            try {
                const result = await fn({
                    resolve,
                    key
                });
                // Resolving a promise multiple times is a no-op, so we can safely
                // resolve all pending promises with the same result.
                resolve(result);
            } catch (err) {
                reject(err);
            } finally{
                this.pending.delete(cacheKey);
            }
        });
        return promise;
    }
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/client-and-server-references.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUseCacheFunctionInfo",
    ()=>getUseCacheFunctionInfo,
    "isClientReference",
    ()=>isClientReference,
    "isServerReference",
    ()=>isServerReference,
    "isUseCacheFunction",
    ()=>isUseCacheFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$server$2d$reference$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/server-reference-info.js [app-rsc] (ecmascript)");
;
function isServerReference(value) {
    return value.$$typeof === Symbol.for('react.server.reference');
}
function isUseCacheFunction(value) {
    if (!isServerReference(value)) {
        return false;
    }
    const { type } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$server$2d$reference$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractInfoFromServerReferenceId"])(value.$$id);
    return type === 'use-cache';
}
function getUseCacheFunctionInfo(value) {
    if (!isServerReference(value)) {
        return null;
    }
    const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$server$2d$reference$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractInfoFromServerReferenceId"])(value.$$id);
    return info.type === 'use-cache' ? info : null;
}
function isClientReference(mod) {
    const defaultExport = (mod == null ? void 0 : mod.default) || mod;
    return (defaultExport == null ? void 0 : defaultExport.$$typeof) === Symbol.for('react.client.reference');
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTION_SUFFIX",
    ()=>ACTION_SUFFIX,
    "APP_DIR_ALIAS",
    ()=>APP_DIR_ALIAS,
    "CACHE_ONE_YEAR_SECONDS",
    ()=>CACHE_ONE_YEAR_SECONDS,
    "DOT_NEXT_ALIAS",
    ()=>DOT_NEXT_ALIAS,
    "ESLINT_DEFAULT_DIRS",
    ()=>ESLINT_DEFAULT_DIRS,
    "GSP_NO_RETURNED_VALUE",
    ()=>GSP_NO_RETURNED_VALUE,
    "GSSP_COMPONENT_MEMBER_ERROR",
    ()=>GSSP_COMPONENT_MEMBER_ERROR,
    "GSSP_NO_RETURNED_VALUE",
    ()=>GSSP_NO_RETURNED_VALUE,
    "HTML_CONTENT_TYPE_HEADER",
    ()=>HTML_CONTENT_TYPE_HEADER,
    "INFINITE_CACHE",
    ()=>INFINITE_CACHE,
    "INSTRUMENTATION_HOOK_FILENAME",
    ()=>INSTRUMENTATION_HOOK_FILENAME,
    "JSON_CONTENT_TYPE_HEADER",
    ()=>JSON_CONTENT_TYPE_HEADER,
    "MATCHED_PATH_HEADER",
    ()=>MATCHED_PATH_HEADER,
    "MIDDLEWARE_FILENAME",
    ()=>MIDDLEWARE_FILENAME,
    "MIDDLEWARE_LOCATION_REGEXP",
    ()=>MIDDLEWARE_LOCATION_REGEXP,
    "NEXT_BODY_SUFFIX",
    ()=>NEXT_BODY_SUFFIX,
    "NEXT_CACHE_IMPLICIT_TAG_ID",
    ()=>NEXT_CACHE_IMPLICIT_TAG_ID,
    "NEXT_CACHE_REVALIDATED_TAGS_HEADER",
    ()=>NEXT_CACHE_REVALIDATED_TAGS_HEADER,
    "NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER",
    ()=>NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER,
    "NEXT_CACHE_ROOT_PARAM_TAG_ID",
    ()=>NEXT_CACHE_ROOT_PARAM_TAG_ID,
    "NEXT_CACHE_SOFT_TAG_MAX_LENGTH",
    ()=>NEXT_CACHE_SOFT_TAG_MAX_LENGTH,
    "NEXT_CACHE_TAGS_HEADER",
    ()=>NEXT_CACHE_TAGS_HEADER,
    "NEXT_CACHE_TAG_MAX_ITEMS",
    ()=>NEXT_CACHE_TAG_MAX_ITEMS,
    "NEXT_CACHE_TAG_MAX_LENGTH",
    ()=>NEXT_CACHE_TAG_MAX_LENGTH,
    "NEXT_DATA_SUFFIX",
    ()=>NEXT_DATA_SUFFIX,
    "NEXT_INTERCEPTION_MARKER_PREFIX",
    ()=>NEXT_INTERCEPTION_MARKER_PREFIX,
    "NEXT_META_SUFFIX",
    ()=>NEXT_META_SUFFIX,
    "NEXT_NAV_DEPLOYMENT_ID_HEADER",
    ()=>NEXT_NAV_DEPLOYMENT_ID_HEADER,
    "NEXT_QUERY_PARAM_PREFIX",
    ()=>NEXT_QUERY_PARAM_PREFIX,
    "NEXT_RESUME_HEADER",
    ()=>NEXT_RESUME_HEADER,
    "NEXT_RESUME_STATE_LENGTH_HEADER",
    ()=>NEXT_RESUME_STATE_LENGTH_HEADER,
    "NON_STANDARD_NODE_ENV",
    ()=>NON_STANDARD_NODE_ENV,
    "PAGES_DIR_ALIAS",
    ()=>PAGES_DIR_ALIAS,
    "PRERENDER_REVALIDATE_HEADER",
    ()=>PRERENDER_REVALIDATE_HEADER,
    "PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER",
    ()=>PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER,
    "PROXY_FILENAME",
    ()=>PROXY_FILENAME,
    "PROXY_LOCATION_REGEXP",
    ()=>PROXY_LOCATION_REGEXP,
    "PUBLIC_DIR_MIDDLEWARE_CONFLICT",
    ()=>PUBLIC_DIR_MIDDLEWARE_CONFLICT,
    "ROOT_DIR_ALIAS",
    ()=>ROOT_DIR_ALIAS,
    "RSC_ACTION_CLIENT_WRAPPER_ALIAS",
    ()=>RSC_ACTION_CLIENT_WRAPPER_ALIAS,
    "RSC_ACTION_ENCRYPTION_ALIAS",
    ()=>RSC_ACTION_ENCRYPTION_ALIAS,
    "RSC_ACTION_PROXY_ALIAS",
    ()=>RSC_ACTION_PROXY_ALIAS,
    "RSC_ACTION_VALIDATE_ALIAS",
    ()=>RSC_ACTION_VALIDATE_ALIAS,
    "RSC_CACHE_WRAPPER_ALIAS",
    ()=>RSC_CACHE_WRAPPER_ALIAS,
    "RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS",
    ()=>RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS,
    "RSC_MOD_REF_PROXY_ALIAS",
    ()=>RSC_MOD_REF_PROXY_ALIAS,
    "RSC_SEGMENTS_DIR_SUFFIX",
    ()=>RSC_SEGMENTS_DIR_SUFFIX,
    "RSC_SEGMENT_SUFFIX",
    ()=>RSC_SEGMENT_SUFFIX,
    "RSC_SUFFIX",
    ()=>RSC_SUFFIX,
    "SERVER_PROPS_EXPORT_ERROR",
    ()=>SERVER_PROPS_EXPORT_ERROR,
    "SERVER_PROPS_GET_INIT_PROPS_CONFLICT",
    ()=>SERVER_PROPS_GET_INIT_PROPS_CONFLICT,
    "SERVER_PROPS_SSG_CONFLICT",
    ()=>SERVER_PROPS_SSG_CONFLICT,
    "SERVER_RUNTIME",
    ()=>SERVER_RUNTIME,
    "SSG_FALLBACK_EXPORT_ERROR",
    ()=>SSG_FALLBACK_EXPORT_ERROR,
    "SSG_GET_INITIAL_PROPS_CONFLICT",
    ()=>SSG_GET_INITIAL_PROPS_CONFLICT,
    "STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR",
    ()=>STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR,
    "TEXT_PLAIN_CONTENT_TYPE_HEADER",
    ()=>TEXT_PLAIN_CONTENT_TYPE_HEADER,
    "UNSTABLE_REVALIDATE_RENAME_ERROR",
    ()=>UNSTABLE_REVALIDATE_RENAME_ERROR,
    "WEBPACK_LAYERS",
    ()=>WEBPACK_LAYERS,
    "WEBPACK_RESOURCE_QUERIES",
    ()=>WEBPACK_RESOURCE_QUERIES,
    "WEB_SOCKET_MAX_RECONNECTIONS",
    ()=>WEB_SOCKET_MAX_RECONNECTIONS
]);
const TEXT_PLAIN_CONTENT_TYPE_HEADER = 'text/plain';
const HTML_CONTENT_TYPE_HEADER = 'text/html; charset=utf-8';
const JSON_CONTENT_TYPE_HEADER = 'application/json; charset=utf-8';
const NEXT_QUERY_PARAM_PREFIX = 'nxtP';
const NEXT_INTERCEPTION_MARKER_PREFIX = 'nxtI';
const MATCHED_PATH_HEADER = 'x-matched-path';
const PRERENDER_REVALIDATE_HEADER = 'x-prerender-revalidate';
const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = 'x-prerender-revalidate-if-generated';
const RSC_SEGMENTS_DIR_SUFFIX = '.segments';
const RSC_SEGMENT_SUFFIX = '.segment.rsc';
const RSC_SUFFIX = '.rsc';
const ACTION_SUFFIX = '.action';
const NEXT_DATA_SUFFIX = '.json';
const NEXT_META_SUFFIX = '.meta';
const NEXT_BODY_SUFFIX = '.body';
const NEXT_NAV_DEPLOYMENT_ID_HEADER = 'x-nextjs-deployment-id';
const NEXT_CACHE_TAGS_HEADER = 'x-next-cache-tags';
const NEXT_CACHE_REVALIDATED_TAGS_HEADER = 'x-next-revalidated-tags';
const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = 'x-next-revalidate-tag-token';
const NEXT_RESUME_HEADER = 'next-resume';
const NEXT_RESUME_STATE_LENGTH_HEADER = 'x-next-resume-state-length';
const NEXT_CACHE_TAG_MAX_ITEMS = 128;
const NEXT_CACHE_TAG_MAX_LENGTH = 256;
const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
const NEXT_CACHE_IMPLICIT_TAG_ID = '_N_T_';
const NEXT_CACHE_ROOT_PARAM_TAG_ID = '_N_RP_';
const CACHE_ONE_YEAR_SECONDS = 31536000;
const INFINITE_CACHE = 0xfffffffe;
const MIDDLEWARE_FILENAME = 'middleware';
const MIDDLEWARE_LOCATION_REGEXP = `(?:src/)?${MIDDLEWARE_FILENAME}`;
const PROXY_FILENAME = 'proxy';
const PROXY_LOCATION_REGEXP = `(?:src/)?${PROXY_FILENAME}`;
const INSTRUMENTATION_HOOK_FILENAME = 'instrumentation';
const PAGES_DIR_ALIAS = 'private-next-pages';
const DOT_NEXT_ALIAS = 'private-dot-next';
const ROOT_DIR_ALIAS = 'private-next-root-dir';
const APP_DIR_ALIAS = 'private-next-app-dir';
const RSC_MOD_REF_PROXY_ALIAS = 'private-next-rsc-mod-ref-proxy';
const RSC_ACTION_VALIDATE_ALIAS = 'private-next-rsc-action-validate';
const RSC_ACTION_PROXY_ALIAS = 'private-next-rsc-server-reference';
const RSC_CACHE_WRAPPER_ALIAS = 'private-next-rsc-cache-wrapper';
const RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS = 'private-next-rsc-track-dynamic-import';
const RSC_ACTION_ENCRYPTION_ALIAS = 'private-next-rsc-action-encryption';
const RSC_ACTION_CLIENT_WRAPPER_ALIAS = 'private-next-rsc-action-client-wrapper';
const PUBLIC_DIR_MIDDLEWARE_CONFLICT = `You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`;
const SSG_GET_INITIAL_PROPS_CONFLICT = `You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`;
const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = `You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`;
const SERVER_PROPS_SSG_CONFLICT = `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`;
const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = `can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`;
const SERVER_PROPS_EXPORT_ERROR = `pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`;
const GSP_NO_RETURNED_VALUE = 'Your `getStaticProps` function did not return an object. Did you forget to add a `return`?';
const GSSP_NO_RETURNED_VALUE = 'Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?';
const UNSTABLE_REVALIDATE_RENAME_ERROR = 'The `unstable_revalidate` property is available for general use.\n' + 'Please use `revalidate` instead.';
const GSSP_COMPONENT_MEMBER_ERROR = `can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`;
const NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`;
const SSG_FALLBACK_EXPORT_ERROR = `Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`;
const ESLINT_DEFAULT_DIRS = [
    'app',
    'pages',
    'components',
    'lib',
    'src'
];
const SERVER_RUNTIME = {
    edge: 'edge',
    experimentalEdge: 'experimental-edge',
    nodejs: 'nodejs'
};
const WEB_SOCKET_MAX_RECONNECTIONS = 12;
/**
 * The names of the webpack layers. These layers are the primitives for the
 * webpack chunks.
 */ const WEBPACK_LAYERS_NAMES = {
    /**
   * The layer for the shared code between the client and server bundles.
   */ shared: 'shared',
    /**
   * The layer for server-only runtime and picking up `react-server` export conditions.
   * Including app router RSC pages and app router custom routes and metadata routes.
   */ reactServerComponents: 'rsc',
    /**
   * Server Side Rendering layer for app (ssr).
   */ serverSideRendering: 'ssr',
    /**
   * The browser client bundle layer for actions.
   */ actionBrowser: 'action-browser',
    /**
   * The Node.js bundle layer for the API routes.
   */ apiNode: 'api-node',
    /**
   * The Edge Lite bundle layer for the API routes.
   */ apiEdge: 'api-edge',
    /**
   * The layer for the middleware code.
   */ middleware: 'middleware',
    /**
   * The layer for the instrumentation hooks.
   */ instrument: 'instrument',
    /**
   * The layer for assets on the edge.
   */ edgeAsset: 'edge-asset',
    /**
   * The browser client bundle layer for App directory.
   */ appPagesBrowser: 'app-pages-browser',
    /**
   * The browser client bundle layer for Pages directory.
   */ pagesDirBrowser: 'pages-dir-browser',
    /**
   * The Edge Lite bundle layer for Pages directory.
   */ pagesDirEdge: 'pages-dir-edge',
    /**
   * The Node.js bundle layer for Pages directory.
   */ pagesDirNode: 'pages-dir-node'
};
const WEBPACK_LAYERS = {
    ...WEBPACK_LAYERS_NAMES,
    GROUP: {
        builtinReact: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser
        ],
        serverOnly: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.instrument,
            WEBPACK_LAYERS_NAMES.middleware
        ],
        neutralTarget: [
            // pages api
            WEBPACK_LAYERS_NAMES.apiNode,
            WEBPACK_LAYERS_NAMES.apiEdge
        ],
        clientOnly: [
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser
        ],
        bundled: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser,
            WEBPACK_LAYERS_NAMES.shared,
            WEBPACK_LAYERS_NAMES.instrument,
            WEBPACK_LAYERS_NAMES.middleware
        ],
        appPages: [
            // app router pages and layouts
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser,
            WEBPACK_LAYERS_NAMES.actionBrowser
        ]
    }
};
const WEBPACK_RESOURCE_QUERIES = {
    edgeSSREntry: '__next_edge_ssr_entry__',
    metadata: '__next_metadata__',
    metadataRoute: '__next_metadata_route__',
    metadataImageMeta: '__next_metadata_image_meta__'
};
;
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/detached-promise.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * A `Promise.withResolvers` implementation that exposes the `resolve` and
 * `reject` functions on a `Promise`.
 *
 * @see https://tc39.es/proposal-promise-with-resolvers/
 */ __turbopack_context__.s([
    "DetachedPromise",
    ()=>DetachedPromise
]);
class DetachedPromise {
    constructor(){
        let resolve;
        let reject;
        // Create the promise and assign the resolvers to the object.
        this.promise = new Promise((res, rej)=>{
            resolve = res;
            reject = rej;
        });
        // We know that resolvers is defined because the Promise constructor runs
        // synchronously.
        this.resolve = resolve;
        this.reject = reject;
    }
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/error-telemetry-utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDigestWithErrorCode",
    ()=>createDigestWithErrorCode,
    "extractNextErrorCode",
    ()=>extractNextErrorCode
]);
const ERROR_CODE_DELIMITER = '@';
const createDigestWithErrorCode = (thrownValue, originalDigest)=>{
    if (typeof thrownValue === 'object' && thrownValue !== null && '__NEXT_ERROR_CODE' in thrownValue) {
        return `${originalDigest}${ERROR_CODE_DELIMITER}${thrownValue.__NEXT_ERROR_CODE}`;
    }
    return originalDigest;
};
const extractNextErrorCode = (error)=>{
    if (typeof error === 'object' && error !== null && '__NEXT_ERROR_CODE' in error && typeof error.__NEXT_ERROR_CODE === 'string') {
        return error.__NEXT_ERROR_CODE;
    }
    if (typeof error === 'object' && error !== null && 'digest' in error && typeof error.digest === 'string') {
        const segments = error.digest.split(ERROR_CODE_DELIMITER);
        const errorCode = segments.find((segment)=>segment.startsWith('E'));
        return errorCode;
    }
    return undefined;
};
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/fallback.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Describes the different fallback modes that a given page can have.
 */ __turbopack_context__.s([
    "FallbackMode",
    ()=>FallbackMode,
    "fallbackModeToFallbackField",
    ()=>fallbackModeToFallbackField,
    "parseFallbackField",
    ()=>parseFallbackField,
    "parseStaticPathsResult",
    ()=>parseStaticPathsResult
]);
var FallbackMode = /*#__PURE__*/ function(FallbackMode) {
    /**
   * A BLOCKING_STATIC_RENDER fallback will block the request until the page is
   * generated. No fallback page will be rendered, and users will have to wait
   * to render the page.
   */ FallbackMode["BLOCKING_STATIC_RENDER"] = "BLOCKING_STATIC_RENDER";
    /**
   * When set to PRERENDER, a fallback page will be sent to users in place of
   * forcing them to wait for the page to be generated. This allows the user to
   * see a rendered page earlier.
   */ FallbackMode["PRERENDER"] = "PRERENDER";
    /**
   * When set to NOT_FOUND, pages that are not already prerendered will result
   * in a not found response.
   */ FallbackMode["NOT_FOUND"] = "NOT_FOUND";
    return FallbackMode;
}({});
function parseFallbackField(fallbackField) {
    if (typeof fallbackField === 'string') {
        return "PRERENDER";
    } else if (fallbackField === null) {
        return "BLOCKING_STATIC_RENDER";
    } else if (fallbackField === false) {
        return "NOT_FOUND";
    } else if (fallbackField === undefined) {
        return undefined;
    } else {
        throw Object.defineProperty(new Error(`Invalid fallback option: ${fallbackField}. Fallback option must be a string, null, undefined, or false.`), "__NEXT_ERROR_CODE", {
            value: "E285",
            enumerable: false,
            configurable: true
        });
    }
}
function fallbackModeToFallbackField(fallback, page) {
    switch(fallback){
        case "BLOCKING_STATIC_RENDER":
            return null;
        case "NOT_FOUND":
            return false;
        case "PRERENDER":
            if (!page) {
                throw Object.defineProperty(new Error(`Invariant: expected a page to be provided when fallback mode is "${fallback}"`), "__NEXT_ERROR_CODE", {
                    value: "E422",
                    enumerable: false,
                    configurable: true
                });
            }
            return page;
        default:
            throw Object.defineProperty(new Error(`Invalid fallback mode: ${fallback}`), "__NEXT_ERROR_CODE", {
                value: "E254",
                enumerable: false,
                configurable: true
            });
    }
}
function parseStaticPathsResult(result) {
    if (result === true) {
        return "PRERENDER";
    } else if (result === 'blocking') {
        return "BLOCKING_STATIC_RENDER";
    } else {
        return "NOT_FOUND";
    }
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/format-server-error.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatServerError",
    ()=>formatServerError,
    "getStackWithoutErrorMessage",
    ()=>getStackWithoutErrorMessage
]);
const invalidServerComponentReactHooks = [
    'useDeferredValue',
    'useEffect',
    'useEffectEvent',
    'useImperativeHandle',
    'useInsertionEffect',
    'useLayoutEffect',
    'useReducer',
    'useRef',
    'useState',
    'useSyncExternalStore',
    'useTransition',
    'experimental_useOptimistic',
    'useOptimistic'
];
function setMessage(error, message) {
    error.message = message;
    if (error.stack) {
        const lines = error.stack.split('\n');
        lines[0] = message;
        error.stack = lines.join('\n');
    }
}
function getStackWithoutErrorMessage(error) {
    const stack = error.stack;
    if (!stack) return '';
    return stack.replace(/^[^\n]*\n/, '');
}
function formatServerError(error) {
    if (typeof (error == null ? void 0 : error.message) !== 'string') return;
    if (error.message.includes('Class extends value undefined is not a constructor or null')) {
        const addedMessage = 'This might be caused by a React Class Component being rendered in a Server Component, React Class Components only works in Client Components. Read more: https://nextjs.org/docs/messages/class-component-in-server-component';
        // If this error instance already has the message, don't add it again
        if (error.message.includes(addedMessage)) return;
        setMessage(error, `${error.message}

${addedMessage}`);
        return;
    }
    if (error.message.includes('createContext is not a function')) {
        setMessage(error, 'createContext only works in Client Components. Add the "use client" directive at the top of the file to use it. Read more: https://nextjs.org/docs/messages/context-in-server-component');
        return;
    }
    for (const clientHook of invalidServerComponentReactHooks){
        const regex = new RegExp(`\\b${clientHook}\\b.*is not a function`);
        if (regex.test(error.message)) {
            setMessage(error, `${clientHook} only works in Client Components. Add the "use client" directive at the top of the file to use it. Read more: https://nextjs.org/docs/messages/react-client-hook-in-server-component`);
            return;
        }
    }
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/framework/boundary-components.js [app-rsc] (client reference proxy)", ((__turbopack_context__, module, exports) => {

// This file is generated by next-core EcmascriptClientReferenceModule.
const { createClientModuleProxy } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
__turbopack_context__.n(createClientModuleProxy("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/framework/boundary-components.js"));
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/framework/boundary-components.js [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__, module, exports) => {

// This file is generated by next-core EcmascriptClientReferenceModule.
const { createClientModuleProxy } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
__turbopack_context__.n(createClientModuleProxy("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/framework/boundary-components.js <module evaluation>"));
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/framework/boundary-components.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$framework$2f$boundary$2d$components$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/framework/boundary-components.js [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$framework$2f$boundary$2d$components$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/framework/boundary-components.js [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$framework$2f$boundary$2d$components$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/framework/boundary-constants.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "METADATA_BOUNDARY_NAME",
    ()=>METADATA_BOUNDARY_NAME,
    "OUTLET_BOUNDARY_NAME",
    ()=>OUTLET_BOUNDARY_NAME,
    "ROOT_LAYOUT_BOUNDARY_NAME",
    ()=>ROOT_LAYOUT_BOUNDARY_NAME,
    "VIEWPORT_BOUNDARY_NAME",
    ()=>VIEWPORT_BOUNDARY_NAME
]);
const METADATA_BOUNDARY_NAME = '__next_metadata_boundary__';
const VIEWPORT_BOUNDARY_NAME = '__next_viewport_boundary__';
const OUTLET_BOUNDARY_NAME = '__next_outlet_boundary__';
const ROOT_LAYOUT_BOUNDARY_NAME = '__next_root_layout_boundary__';
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/is-error.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>isError,
    "getProperError",
    ()=>getProperError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$is$2d$plain$2d$object$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/is-plain-object.js [app-rsc] (ecmascript)");
;
/**
 * This is a safe stringify function that handles circular references.
 * We're using a simpler version here to avoid introducing
 * the dependency `safe-stable-stringify` into production bundle.
 *
 * This helper is used both in development and production.
 */ function safeStringifyLite(obj) {
    const seen = new WeakSet();
    return JSON.stringify(obj, (_key, value)=>{
        // If value is an object and already seen, replace with "[Circular]"
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return '[Circular]';
            }
            seen.add(value);
        }
        return value;
    });
}
function isError(err) {
    return typeof err === 'object' && err !== null && 'name' in err && 'message' in err;
}
function getProperError(err) {
    if (isError(err)) {
        return err;
    }
    if ("TURBOPACK compile-time truthy", 1) {
        // provide better error for case where `throw undefined`
        // is called in development
        if (typeof err === 'undefined') {
            return Object.defineProperty(new Error('An undefined error was thrown, ' + 'see here for more info: https://nextjs.org/docs/messages/threw-undefined'), "__NEXT_ERROR_CODE", {
                value: "E98",
                enumerable: false,
                configurable: true
            });
        }
        if (err === null) {
            return Object.defineProperty(new Error('A null error was thrown, ' + 'see here for more info: https://nextjs.org/docs/messages/threw-undefined'), "__NEXT_ERROR_CODE", {
                value: "E336",
                enumerable: false,
                configurable: true
            });
        }
    }
    return Object.defineProperty(new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$is$2d$plain$2d$object$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlainObject"])(err) ? safeStringifyLite(err) : err + ''), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IconKeys",
    ()=>IconKeys,
    "ViewportMetaKeys",
    ()=>ViewportMetaKeys
]);
const ViewportMetaKeys = {
    width: 'width',
    height: 'height',
    initialScale: 'initial-scale',
    minimumScale: 'minimum-scale',
    maximumScale: 'maximum-scale',
    viewportFit: 'viewport-fit',
    userScalable: 'user-scalable',
    interactiveWidget: 'interactive-widget'
};
const IconKeys = [
    'icon',
    'shortcut',
    'apple',
    'other'
];
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/default-metadata.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDefaultMetadata",
    ()=>createDefaultMetadata,
    "createDefaultViewport",
    ()=>createDefaultViewport
]);
function createDefaultViewport() {
    return {
        // name=viewport
        width: 'device-width',
        initialScale: 1,
        // visual metadata
        themeColor: null,
        colorScheme: null
    };
}
function createDefaultMetadata() {
    return {
        // Deprecated ones
        viewport: null,
        themeColor: null,
        colorScheme: null,
        metadataBase: null,
        // Other values are all null
        title: null,
        description: null,
        applicationName: null,
        authors: null,
        generator: null,
        keywords: null,
        referrer: null,
        creator: null,
        publisher: null,
        robots: null,
        manifest: null,
        alternates: {
            canonical: null,
            languages: null,
            media: null,
            types: null
        },
        icons: null,
        openGraph: null,
        twitter: null,
        verification: {},
        appleWebApp: null,
        formatDetection: null,
        itunes: null,
        facebook: null,
        pinterest: null,
        abstract: null,
        appLinks: null,
        archives: null,
        assets: null,
        bookmarks: null,
        category: null,
        classification: null,
        pagination: {
            previous: null,
            next: null
        },
        other: {}
    };
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/generate/icon-mark.js [app-rsc] (client reference proxy)", ((__turbopack_context__, module, exports) => {

// This file is generated by next-core EcmascriptClientReferenceModule.
const { createClientModuleProxy } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
__turbopack_context__.n(createClientModuleProxy("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/generate/icon-mark.js"));
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/generate/icon-mark.js [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__, module, exports) => {

// This file is generated by next-core EcmascriptClientReferenceModule.
const { createClientModuleProxy } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
__turbopack_context__.n(createClientModuleProxy("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/generate/icon-mark.js <module evaluation>"));
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/generate/icon-mark.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$icon$2d$mark$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/generate/icon-mark.js [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$icon$2d$mark$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/generate/icon-mark.js [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$icon$2d$mark$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/generate/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOrigin",
    ()=>getOrigin,
    "resolveArray",
    ()=>resolveArray,
    "resolveAsArrayOrUndefined",
    ()=>resolveAsArrayOrUndefined
]);
function resolveArray(value) {
    if (Array.isArray(value)) {
        return value;
    }
    return [
        value
    ];
}
function resolveAsArrayOrUndefined(value) {
    if (typeof value === 'undefined' || value === null) {
        return undefined;
    }
    return resolveArray(value);
}
function getOrigin(url) {
    let origin = undefined;
    if (typeof url === 'string') {
        try {
            url = new URL(url);
            origin = url.origin;
        } catch  {}
    }
    return origin;
}
;
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/metadata.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createMetadataComponents",
    ()=>createMetadataComponents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolve$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolve-metadata.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$http$2d$access$2d$fallback$2f$http$2d$access$2d$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/client/components/http-access-fallback/http-access-fallback.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$search$2d$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/request/search-params.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$pathname$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/request/pathname.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$router$2d$utils$2f$is$2d$postpone$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/lib/router-utils/is-postpone.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$framework$2f$boundary$2d$components$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/framework/boundary-components.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/generate/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$icon$2d$mark$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/generate/icon-mark.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
function createMetadataComponents({ tree, pathname, parsedQuery, metadataContext, interpolatedParams, errorType, serveStreamingMetadata }) {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$search$2d$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSearchParamsForMetadata"])(parsedQuery);
    const pathnameForMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$pathname$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerPathnameForMetadata"])(pathname);
    async function Viewport() {
        const tags = await getResolvedViewport(tree, searchParams, interpolatedParams, errorType).catch((viewportErr)=>{
            // When Legacy PPR is enabled viewport can reject with a Postpone type
            // This will go away once Legacy PPR is removed and dynamic metadata will
            // stay pending until after the prerender is complete when it is dynamic
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$router$2d$utils$2f$is$2d$postpone$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPostpone"])(viewportErr)) {
                throw viewportErr;
            }
            if (!errorType && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$http$2d$access$2d$fallback$2f$http$2d$access$2d$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isHTTPAccessFallbackError"])(viewportErr)) {
                return getNotFoundViewport(tree, searchParams, interpolatedParams).catch(()=>null);
            }
            // We're going to throw the error from the metadata outlet so we just render null here instead
            return null;
        });
        return tags;
    }
    Viewport.displayName = 'Next.Viewport';
    function ViewportWrapper() {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$framework$2f$boundary$2d$components$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewportBoundary"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(Viewport, {})
        });
    }
    async function Metadata() {
        const tags = await getResolvedMetadata(tree, pathnameForMetadata, searchParams, interpolatedParams, metadataContext, errorType).catch((metadataErr)=>{
            // When Legacy PPR is enabled metadata can reject with a Postpone type
            // This will go away once Legacy PPR is removed and dynamic metadata will
            // stay pending until after the prerender is complete when it is dynamic
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$router$2d$utils$2f$is$2d$postpone$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPostpone"])(metadataErr)) {
                throw metadataErr;
            }
            if (!errorType && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$http$2d$access$2d$fallback$2f$http$2d$access$2d$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isHTTPAccessFallbackError"])(metadataErr)) {
                return getNotFoundMetadata(tree, pathnameForMetadata, searchParams, interpolatedParams, metadataContext).catch(()=>null);
            }
            // We're going to throw the error from the metadata outlet so we just render null here instead
            return null;
        });
        return tags;
    }
    Metadata.displayName = 'Next.Metadata';
    function MetadataWrapper() {
        // TODO: We shouldn't change what we render based on whether we are streaming or not.
        // If we aren't streaming we should just block the response until we have resolved the
        // metadata.
        if (!serveStreamingMetadata) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$framework$2f$boundary$2d$components$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MetadataBoundary"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(Metadata, {})
            });
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("div", {
            hidden: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$framework$2f$boundary$2d$components$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MetadataBoundary"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
                    name: "Next.Metadata",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(Metadata, {})
                })
            })
        });
    }
    function MetadataOutlet() {
        const pendingOutlet = Promise.all([
            getResolvedMetadata(tree, pathnameForMetadata, searchParams, interpolatedParams, metadataContext, errorType),
            getResolvedViewport(tree, searchParams, interpolatedParams, errorType)
        ]).then(()=>null);
        // TODO: We shouldn't change what we render based on whether we are streaming or not.
        // If we aren't streaming we should just block the response until we have resolved the
        // metadata.
        if (!serveStreamingMetadata) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$framework$2f$boundary$2d$components$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OutletBoundary"], {
                children: pendingOutlet
            });
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$framework$2f$boundary$2d$components$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OutletBoundary"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
                name: "Next.MetadataOutlet",
                children: pendingOutlet
            })
        });
    }
    MetadataOutlet.displayName = 'Next.MetadataOutlet';
    return {
        Viewport: ViewportWrapper,
        Metadata: MetadataWrapper,
        MetadataOutlet
    };
}
const getResolvedMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(getResolvedMetadataImpl);
async function getResolvedMetadataImpl(tree, pathname, searchParams, interpolatedParams, metadataContext, errorType) {
    const errorConvention = errorType === 'redirect' ? undefined : errorType;
    return renderMetadata(tree, pathname, searchParams, interpolatedParams, metadataContext, errorConvention);
}
const getNotFoundMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(getNotFoundMetadataImpl);
async function getNotFoundMetadataImpl(tree, pathname, searchParams, interpolatedParams, metadataContext) {
    const notFoundErrorConvention = 'not-found';
    return renderMetadata(tree, pathname, searchParams, interpolatedParams, metadataContext, notFoundErrorConvention);
}
const getResolvedViewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(getResolvedViewportImpl);
async function getResolvedViewportImpl(tree, searchParams, interpolatedParams, errorType) {
    const errorConvention = errorType === 'redirect' ? undefined : errorType;
    return renderViewport(tree, searchParams, interpolatedParams, errorConvention);
}
const getNotFoundViewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(getNotFoundViewportImpl);
async function getNotFoundViewportImpl(tree, searchParams, interpolatedParams) {
    const notFoundErrorConvention = 'not-found';
    return renderViewport(tree, searchParams, interpolatedParams, notFoundErrorConvention);
}
async function renderMetadata(tree, pathname, searchParams, interpolatedParams, metadataContext, errorConvention) {
    const resolvedMetadata = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolve$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveMetadata"])(tree, pathname, searchParams, errorConvention, interpolatedParams, metadataContext);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: createMetadataElements(resolvedMetadata)
    });
}
async function renderViewport(tree, searchParams, interpolatedParams, errorConvention) {
    const resolvedViewport = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolve$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveViewport"])(tree, searchParams, errorConvention, interpolatedParams);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: createViewportElements(resolvedViewport)
    });
}
// ---------------------------------------------------------------------------
// Viewport tag rendering
// ---------------------------------------------------------------------------
function createViewportElements(viewport) {
    const tags = [];
    let i = 0;
    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
        charSet: "utf-8"
    }, i++));
    // Build viewport content string from layout properties
    const viewportParts = [];
    if (viewport.width != null) {
        viewportParts.push(`width=${viewport.width}`);
    }
    if (viewport.height != null) {
        viewportParts.push(`height=${viewport.height}`);
    }
    if (viewport.initialScale != null) {
        viewportParts.push(`initial-scale=${viewport.initialScale}`);
    }
    if (viewport.minimumScale != null) {
        viewportParts.push(`minimum-scale=${viewport.minimumScale}`);
    }
    if (viewport.maximumScale != null) {
        viewportParts.push(`maximum-scale=${viewport.maximumScale}`);
    }
    if (viewport.userScalable != null) {
        viewportParts.push(`user-scalable=${viewport.userScalable ? 'yes' : 'no'}`);
    }
    if (viewport.viewportFit) {
        viewportParts.push(`viewport-fit=${viewport.viewportFit}`);
    }
    if (viewport.interactiveWidget) {
        viewportParts.push(`interactive-widget=${viewport.interactiveWidget}`);
    }
    if (viewportParts.length) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "viewport",
            content: viewportParts.join(', ')
        }, i++));
    }
    if (viewport.themeColor) {
        for (const themeColor of viewport.themeColor){
            if (themeColor.media) {
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                    name: "theme-color",
                    content: themeColor.color,
                    media: themeColor.media
                }, i++));
            } else {
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                    name: "theme-color",
                    content: themeColor.color
                }, i++));
            }
        }
    }
    if (viewport.colorScheme) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "color-scheme",
            content: viewport.colorScheme
        }, i++));
    }
    return tags;
}
// ---------------------------------------------------------------------------
// Metadata tag rendering
// ---------------------------------------------------------------------------
function createMetadataElements(metadata) {
    var _metadata_robots, _metadata_robots1;
    const tags = [];
    let i = 0;
    // --- Title ---
    if (metadata.title !== null && metadata.title.absolute) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("title", {
            children: metadata.title.absolute
        }, i++));
    }
    // --- Basic meta tags ---
    if (metadata.description) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "description",
            content: metadata.description
        }, i++));
    }
    if (metadata.applicationName) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "application-name",
            content: metadata.applicationName
        }, i++));
    }
    // --- Authors ---
    if (metadata.authors) {
        for (const author of metadata.authors){
            if (author.url) {
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                    rel: "author",
                    href: author.url.toString()
                }, i++));
            }
            if (author.name) {
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                    name: "author",
                    content: author.name
                }, i++));
            }
        }
    }
    // --- Manifest ---
    if (metadata.manifest) {
        const manifestOrigin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrigin"])(metadata.manifest);
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
            rel: "manifest",
            href: metadata.manifest.toString(),
            crossOrigin: !manifestOrigin && process.env.VERCEL_ENV === 'preview' ? 'use-credentials' : undefined
        }, i++));
    }
    if (metadata.generator) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "generator",
            content: metadata.generator
        }, i++));
    }
    if (metadata.keywords && metadata.keywords.length) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "keywords",
            content: metadata.keywords.join(',')
        }, i++));
    }
    if (metadata.referrer) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "referrer",
            content: metadata.referrer
        }, i++));
    }
    if (metadata.creator) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "creator",
            content: metadata.creator
        }, i++));
    }
    if (metadata.publisher) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "publisher",
            content: metadata.publisher
        }, i++));
    }
    if ((_metadata_robots = metadata.robots) == null ? void 0 : _metadata_robots.basic) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "robots",
            content: metadata.robots.basic
        }, i++));
    }
    if ((_metadata_robots1 = metadata.robots) == null ? void 0 : _metadata_robots1.googleBot) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "googlebot",
            content: metadata.robots.googleBot
        }, i++));
    }
    if (metadata.abstract) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "abstract",
            content: metadata.abstract
        }, i++));
    }
    // --- Link rel arrays ---
    if (metadata.archives) {
        for (const archive of metadata.archives){
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                rel: "archives",
                href: archive
            }, i++));
        }
    }
    if (metadata.assets) {
        for (const asset of metadata.assets){
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                rel: "assets",
                href: asset
            }, i++));
        }
    }
    if (metadata.bookmarks) {
        for (const bookmark of metadata.bookmarks){
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                rel: "bookmarks",
                href: bookmark
            }, i++));
        }
    }
    // --- Pagination ---
    if (metadata.pagination) {
        if (metadata.pagination.previous) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                rel: "prev",
                href: metadata.pagination.previous
            }, i++));
        }
        if (metadata.pagination.next) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                rel: "next",
                href: metadata.pagination.next
            }, i++));
        }
    }
    if (metadata.category) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "category",
            content: metadata.category
        }, i++));
    }
    if (metadata.classification) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "classification",
            content: metadata.classification
        }, i++));
    }
    // --- Other (arbitrary name/value pairs) ---
    if (metadata.other) {
        for (const [name, content] of Object.entries(metadata.other)){
            if (Array.isArray(content)) {
                for (const contentItem of content){
                    if (contentItem != null && contentItem !== '') {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            name: name,
                            content: String(contentItem)
                        }, i++));
                    }
                }
            } else if (content != null && content !== '') {
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                    name: name,
                    content: String(content)
                }, i++));
            }
        }
    }
    // --- Alternates ---
    if (metadata.alternates) {
        const { canonical, languages, media, types } = metadata.alternates;
        if (canonical && canonical.url) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                rel: "canonical",
                href: canonical.url.toString(),
                ...canonical.title ? {
                    title: canonical.title
                } : undefined
            }, i++));
        }
        if (languages) {
            for (const [locale, descriptors] of Object.entries(languages)){
                if (descriptors) {
                    for (const descriptor of descriptors){
                        if (descriptor.url) {
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                                rel: "alternate",
                                hrefLang: locale,
                                href: descriptor.url.toString(),
                                ...descriptor.title ? {
                                    title: descriptor.title
                                } : undefined
                            }, i++));
                        }
                    }
                }
            }
        }
        if (media) {
            for (const [mediaName, descriptors] of Object.entries(media)){
                if (descriptors) {
                    for (const descriptor of descriptors){
                        if (descriptor.url) {
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                                rel: "alternate",
                                media: mediaName,
                                href: descriptor.url.toString(),
                                ...descriptor.title ? {
                                    title: descriptor.title
                                } : undefined
                            }, i++));
                        }
                    }
                }
            }
        }
        if (types) {
            for (const [type, descriptors] of Object.entries(types)){
                if (descriptors) {
                    for (const descriptor of descriptors){
                        if (descriptor.url) {
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                                rel: "alternate",
                                type: type,
                                href: descriptor.url.toString(),
                                ...descriptor.title ? {
                                    title: descriptor.title
                                } : undefined
                            }, i++));
                        }
                    }
                }
            }
        }
    }
    // --- iTunes ---
    if (metadata.itunes) {
        const { appId, appArgument } = metadata.itunes;
        let itunesContent = `app-id=${appId}`;
        if (appArgument) {
            itunesContent += `, app-argument=${appArgument}`;
        }
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            name: "apple-itunes-app",
            content: itunesContent
        }, i++));
    }
    // --- Facebook ---
    if (metadata.facebook) {
        if (metadata.facebook.appId) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                property: "fb:app_id",
                content: metadata.facebook.appId
            }, i++));
        }
        if (metadata.facebook.admins) {
            for (const admin of metadata.facebook.admins){
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                    property: "fb:admins",
                    content: admin
                }, i++));
            }
        }
    }
    // --- Pinterest ---
    if (metadata.pinterest && metadata.pinterest.richPin !== undefined) {
        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
            property: "pinterest-rich-pin",
            content: metadata.pinterest.richPin.toString()
        }, i++));
    }
    // --- Format Detection ---
    if (metadata.formatDetection) {
        const formatDetectionKeys = [
            'telephone',
            'date',
            'address',
            'email',
            'url'
        ];
        let formatContent = '';
        for (const key of formatDetectionKeys){
            if (metadata.formatDetection[key] === false) {
                if (formatContent) formatContent += ', ';
                formatContent += `${key}=no`;
            }
        }
        if (formatContent) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                name: "format-detection",
                content: formatContent
            }, i++));
        }
    }
    // --- Verification ---
    if (metadata.verification) {
        const verification = metadata.verification;
        if (verification.google) {
            for (const value of verification.google){
                if (value != null && value !== '') {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        name: "google-site-verification",
                        content: String(value)
                    }, i++));
                }
            }
        }
        if (verification.yahoo) {
            for (const value of verification.yahoo){
                if (value != null && value !== '') {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        name: "y_key",
                        content: String(value)
                    }, i++));
                }
            }
        }
        if (verification.yandex) {
            for (const value of verification.yandex){
                if (value != null && value !== '') {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        name: "yandex-verification",
                        content: String(value)
                    }, i++));
                }
            }
        }
        if (verification.me) {
            for (const value of verification.me){
                if (value != null && value !== '') {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        name: "me",
                        content: String(value)
                    }, i++));
                }
            }
        }
        if (verification.other) {
            for (const [name, values] of Object.entries(verification.other)){
                for (const value of values){
                    if (value != null && value !== '') {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            name: name,
                            content: String(value)
                        }, i++));
                    }
                }
            }
        }
    }
    // --- Apple Web App ---
    if (metadata.appleWebApp) {
        const { capable, title, startupImage, statusBarStyle } = metadata.appleWebApp;
        if (capable) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                name: "mobile-web-app-capable",
                content: "yes"
            }, i++));
        }
        if (title) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                name: "apple-mobile-web-app-title",
                content: title
            }, i++));
        }
        if (startupImage) {
            for (const image of startupImage){
                if (image.media) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                        href: image.url,
                        media: image.media,
                        rel: "apple-touch-startup-image"
                    }, i++));
                } else {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                        href: image.url,
                        rel: "apple-touch-startup-image"
                    }, i++));
                }
            }
        }
        if (statusBarStyle) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                name: "apple-mobile-web-app-status-bar-style",
                content: statusBarStyle
            }, i++));
        }
    }
    // --- Open Graph ---
    if (metadata.openGraph) {
        var _og_title;
        const og = metadata.openGraph;
        if (og.determiner) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                property: "og:determiner",
                content: og.determiner
            }, i++));
        }
        if ((_og_title = og.title) == null ? void 0 : _og_title.absolute) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                property: "og:title",
                content: og.title.absolute
            }, i++));
        }
        if (og.description) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                property: "og:description",
                content: og.description
            }, i++));
        }
        if (og.url) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                property: "og:url",
                content: og.url.toString()
            }, i++));
        }
        if (og.siteName) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                property: "og:site_name",
                content: og.siteName
            }, i++));
        }
        if (og.locale) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                property: "og:locale",
                content: og.locale
            }, i++));
        }
        if (og.countryName) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                property: "og:country_name",
                content: og.countryName
            }, i++));
        }
        if (og.ttl != null) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                property: "og:ttl",
                content: og.ttl.toString()
            }, i++));
        }
        // OG images
        if (og.images) {
            for (const image of og.images){
                if (typeof image === 'string') {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:image",
                        content: image
                    }, i++));
                } else {
                    if (image.url) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "og:image",
                            content: String(image.url)
                        }, i++));
                    }
                    if (image.secureUrl) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "og:image:secure_url",
                            content: String(image.secureUrl)
                        }, i++));
                    }
                    if (image.type) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "og:image:type",
                            content: image.type
                        }, i++));
                    }
                    if (image.width) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "og:image:width",
                            content: String(image.width)
                        }, i++));
                    }
                    if (image.height) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "og:image:height",
                            content: String(image.height)
                        }, i++));
                    }
                    if (image.alt) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "og:image:alt",
                            content: image.alt
                        }, i++));
                    }
                }
            }
        }
        // OG videos
        if (og.videos) {
            for (const video of og.videos){
                if (typeof video === 'string') {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:video",
                        content: video
                    }, i++));
                } else {
                    if (video.url) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "og:video",
                            content: String(video.url)
                        }, i++));
                    }
                    if (video.secureUrl) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "og:video:secure_url",
                            content: String(video.secureUrl)
                        }, i++));
                    }
                    if (video.type) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "og:video:type",
                            content: video.type
                        }, i++));
                    }
                    if (video.width) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "og:video:width",
                            content: String(video.width)
                        }, i++));
                    }
                    if (video.height) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "og:video:height",
                            content: String(video.height)
                        }, i++));
                    }
                }
            }
        }
        // OG audio
        if (og.audio) {
            for (const audio of og.audio){
                if (typeof audio === 'string') {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:audio",
                        content: audio
                    }, i++));
                } else {
                    if (audio.url) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "og:audio",
                            content: String(audio.url)
                        }, i++));
                    }
                    if (audio.secureUrl) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "og:audio:secure_url",
                            content: String(audio.secureUrl)
                        }, i++));
                    }
                    if (audio.type) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "og:audio:type",
                            content: audio.type
                        }, i++));
                    }
                }
            }
        }
        // OG simple array properties
        if (og.emails) {
            for (const email of og.emails){
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                    property: "og:email",
                    content: email
                }, i++));
            }
        }
        if (og.phoneNumbers) {
            for (const phone of og.phoneNumbers){
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                    property: "og:phone_number",
                    content: phone
                }, i++));
            }
        }
        if (og.faxNumbers) {
            for (const fax of og.faxNumbers){
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                    property: "og:fax_number",
                    content: fax
                }, i++));
            }
        }
        if (og.alternateLocale) {
            for (const locale of og.alternateLocale){
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                    property: "og:locale:alternate",
                    content: locale
                }, i++));
            }
        }
        // OG type-specific tags
        if ('type' in og) {
            const ogType = og.type;
            switch(ogType){
                case 'website':
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:type",
                        content: "website"
                    }, i++));
                    break;
                case 'article':
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:type",
                        content: "article"
                    }, i++));
                    if (og.publishedTime) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "article:published_time",
                            content: og.publishedTime.toString()
                        }, i++));
                    }
                    if (og.modifiedTime) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "article:modified_time",
                            content: og.modifiedTime.toString()
                        }, i++));
                    }
                    if (og.expirationTime) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "article:expiration_time",
                            content: og.expirationTime.toString()
                        }, i++));
                    }
                    if (og.authors) {
                        for (const author of og.authors){
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                property: "article:author",
                                content: String(author)
                            }, i++));
                        }
                    }
                    if (og.section) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "article:section",
                            content: og.section
                        }, i++));
                    }
                    if (og.tags) {
                        for (const tag of og.tags){
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                property: "article:tag",
                                content: tag
                            }, i++));
                        }
                    }
                    break;
                case 'book':
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:type",
                        content: "book"
                    }, i++));
                    if (og.isbn) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "book:isbn",
                            content: og.isbn
                        }, i++));
                    }
                    if (og.releaseDate) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "book:release_date",
                            content: og.releaseDate
                        }, i++));
                    }
                    if (og.authors) {
                        for (const author of og.authors){
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                property: "book:author",
                                content: String(author)
                            }, i++));
                        }
                    }
                    if (og.tags) {
                        for (const tag of og.tags){
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                property: "book:tag",
                                content: tag
                            }, i++));
                        }
                    }
                    break;
                case 'profile':
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:type",
                        content: "profile"
                    }, i++));
                    if (og.firstName) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "profile:first_name",
                            content: og.firstName
                        }, i++));
                    }
                    if (og.lastName) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "profile:last_name",
                            content: og.lastName
                        }, i++));
                    }
                    if (og.username) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "profile:username",
                            content: og.username
                        }, i++));
                    }
                    if (og.gender) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "profile:gender",
                            content: og.gender
                        }, i++));
                    }
                    break;
                case 'music.song':
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:type",
                        content: "music.song"
                    }, i++));
                    if (og.duration != null) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "music:duration",
                            content: og.duration.toString()
                        }, i++));
                    }
                    if (og.albums) {
                        for (const album of og.albums){
                            if (typeof album === 'string') {
                                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                    property: "music:album",
                                    content: album
                                }, i++));
                            } else {
                                if (album.url) {
                                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                        property: "music:album",
                                        content: String(album.url)
                                    }, i++));
                                }
                                if (album.disc != null) {
                                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                        property: "music:album:disc",
                                        content: String(album.disc)
                                    }, i++));
                                }
                                if (album.track != null) {
                                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                        property: "music:album:track",
                                        content: String(album.track)
                                    }, i++));
                                }
                            }
                        }
                    }
                    if (og.musicians) {
                        for (const musician of og.musicians){
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                property: "music:musician",
                                content: String(musician)
                            }, i++));
                        }
                    }
                    break;
                case 'music.album':
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:type",
                        content: "music.album"
                    }, i++));
                    if (og.songs) {
                        for (const song of og.songs){
                            if (typeof song === 'string') {
                                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                    property: "music:song",
                                    content: song
                                }, i++));
                            } else {
                                if (song.url) {
                                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                        property: "music:song",
                                        content: String(song.url)
                                    }, i++));
                                }
                                if (song.disc != null) {
                                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                        property: "music:song:disc",
                                        content: String(song.disc)
                                    }, i++));
                                }
                                if (song.track != null) {
                                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                        property: "music:song:track",
                                        content: String(song.track)
                                    }, i++));
                                }
                            }
                        }
                    }
                    if (og.musicians) {
                        for (const musician of og.musicians){
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                property: "music:musician",
                                content: String(musician)
                            }, i++));
                        }
                    }
                    if (og.releaseDate) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "music:release_date",
                            content: og.releaseDate
                        }, i++));
                    }
                    break;
                case 'music.playlist':
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:type",
                        content: "music.playlist"
                    }, i++));
                    if (og.songs) {
                        for (const song of og.songs){
                            if (typeof song === 'string') {
                                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                    property: "music:song",
                                    content: song
                                }, i++));
                            } else {
                                if (song.url) {
                                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                        property: "music:song",
                                        content: String(song.url)
                                    }, i++));
                                }
                                if (song.disc != null) {
                                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                        property: "music:song:disc",
                                        content: String(song.disc)
                                    }, i++));
                                }
                                if (song.track != null) {
                                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                        property: "music:song:track",
                                        content: String(song.track)
                                    }, i++));
                                }
                            }
                        }
                    }
                    if (og.creators) {
                        for (const creator of og.creators){
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                property: "music:creator",
                                content: String(creator)
                            }, i++));
                        }
                    }
                    break;
                case 'music.radio_station':
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:type",
                        content: "music.radio_station"
                    }, i++));
                    if (og.creators) {
                        for (const creator of og.creators){
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                property: "music:creator",
                                content: String(creator)
                            }, i++));
                        }
                    }
                    break;
                case 'video.movie':
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:type",
                        content: "video.movie"
                    }, i++));
                    if (og.actors) {
                        for (const actor of og.actors){
                            if (typeof actor === 'string') {
                                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                    property: "video:actor",
                                    content: actor
                                }, i++));
                            } else {
                                if (actor.url) {
                                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                        property: "video:actor",
                                        content: String(actor.url)
                                    }, i++));
                                }
                                if (actor.role) {
                                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                        property: "video:actor:role",
                                        content: actor.role
                                    }, i++));
                                }
                            }
                        }
                    }
                    if (og.directors) {
                        for (const director of og.directors){
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                property: "video:director",
                                content: String(director)
                            }, i++));
                        }
                    }
                    if (og.writers) {
                        for (const writer of og.writers){
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                property: "video:writer",
                                content: String(writer)
                            }, i++));
                        }
                    }
                    if (og.duration != null) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "video:duration",
                            content: String(og.duration)
                        }, i++));
                    }
                    if (og.releaseDate) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "video:release_date",
                            content: og.releaseDate
                        }, i++));
                    }
                    if (og.tags) {
                        for (const tag of og.tags){
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                property: "video:tag",
                                content: tag
                            }, i++));
                        }
                    }
                    break;
                case 'video.episode':
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:type",
                        content: "video.episode"
                    }, i++));
                    if (og.actors) {
                        for (const actor of og.actors){
                            if (typeof actor === 'string') {
                                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                    property: "video:actor",
                                    content: actor
                                }, i++));
                            } else {
                                if (actor.url) {
                                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                        property: "video:actor",
                                        content: String(actor.url)
                                    }, i++));
                                }
                                if (actor.role) {
                                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                        property: "video:actor:role",
                                        content: actor.role
                                    }, i++));
                                }
                            }
                        }
                    }
                    if (og.directors) {
                        for (const director of og.directors){
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                property: "video:director",
                                content: String(director)
                            }, i++));
                        }
                    }
                    if (og.writers) {
                        for (const writer of og.writers){
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                property: "video:writer",
                                content: String(writer)
                            }, i++));
                        }
                    }
                    if (og.duration != null) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "video:duration",
                            content: String(og.duration)
                        }, i++));
                    }
                    if (og.releaseDate) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "video:release_date",
                            content: og.releaseDate
                        }, i++));
                    }
                    if (og.tags) {
                        for (const tag of og.tags){
                            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                                property: "video:tag",
                                content: tag
                            }, i++));
                        }
                    }
                    if (og.series) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            property: "video:series",
                            content: String(og.series)
                        }, i++));
                    }
                    break;
                case 'video.tv_show':
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:type",
                        content: "video.tv_show"
                    }, i++));
                    break;
                case 'video.other':
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "og:type",
                        content: "video.other"
                    }, i++));
                    break;
                default:
                    const _exhaustiveCheck = ogType;
                    throw Object.defineProperty(new Error(`Invalid OpenGraph type: ${_exhaustiveCheck}`), "__NEXT_ERROR_CODE", {
                        value: "E237",
                        enumerable: false,
                        configurable: true
                    });
            }
        }
    }
    // --- Twitter ---
    if (metadata.twitter) {
        var _tw_title;
        const tw = metadata.twitter;
        const { card } = tw;
        if (card) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                name: "twitter:card",
                content: card
            }, i++));
        }
        if (tw.site) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                name: "twitter:site",
                content: tw.site
            }, i++));
        }
        if (tw.siteId) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                name: "twitter:site:id",
                content: tw.siteId
            }, i++));
        }
        if (tw.creator) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                name: "twitter:creator",
                content: tw.creator
            }, i++));
        }
        if (tw.creatorId) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                name: "twitter:creator:id",
                content: tw.creatorId
            }, i++));
        }
        if ((_tw_title = tw.title) == null ? void 0 : _tw_title.absolute) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                name: "twitter:title",
                content: tw.title.absolute
            }, i++));
        }
        if (tw.description) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                name: "twitter:description",
                content: tw.description
            }, i++));
        }
        // Twitter images
        if (tw.images) {
            for (const image of tw.images){
                if (typeof image === 'string') {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        name: "twitter:image",
                        content: image
                    }, i++));
                } else {
                    if (image.url) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            name: "twitter:image",
                            content: String(image.url)
                        }, i++));
                    }
                    if (image.alt) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            name: "twitter:image:alt",
                            content: image.alt
                        }, i++));
                    }
                    if (image.secureUrl) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            name: "twitter:image:secure_url",
                            content: String(image.secureUrl)
                        }, i++));
                    }
                    if (image.type) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            name: "twitter:image:type",
                            content: image.type
                        }, i++));
                    }
                    if (image.width) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            name: "twitter:image:width",
                            content: String(image.width)
                        }, i++));
                    }
                    if (image.height) {
                        tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                            name: "twitter:image:height",
                            content: String(image.height)
                        }, i++));
                    }
                }
            }
        }
        // Twitter player cards
        if (card === 'player') {
            for (const player of tw.players){
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                    name: "twitter:player",
                    content: player.playerUrl.toString()
                }, i++));
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                    name: "twitter:player:stream",
                    content: player.streamUrl.toString()
                }, i++));
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                    name: "twitter:player:width",
                    content: String(player.width)
                }, i++));
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                    name: "twitter:player:height",
                    content: String(player.height)
                }, i++));
            }
        }
        // Twitter app cards
        if (card === 'app') {
            const { app } = tw;
            for (const platform of [
                'iphone',
                'ipad',
                'googleplay'
            ]){
                var _app_url;
                if (app.name) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        name: `twitter:app:name:${platform}`,
                        content: app.name
                    }, i++));
                }
                if (app.id[platform]) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        name: `twitter:app:id:${platform}`,
                        content: String(app.id[platform])
                    }, i++));
                }
                if ((_app_url = app.url) == null ? void 0 : _app_url[platform]) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        name: `twitter:app:url:${platform}`,
                        content: app.url[platform].toString()
                    }, i++));
                }
            }
        }
    }
    // --- App Links ---
    if (metadata.appLinks) {
        const appLinks = metadata.appLinks;
        // iOS / iPhone / iPad (AppLinksApple: url, app_store_id, app_name)
        if (appLinks.ios) {
            for (const item of appLinks.ios){
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:ios:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.app_store_id) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:ios:app_store_id",
                        content: String(item.app_store_id)
                    }, i++));
                }
                if (item.app_name) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:ios:app_name",
                        content: item.app_name
                    }, i++));
                }
            }
        }
        if (appLinks.iphone) {
            for (const item of appLinks.iphone){
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:iphone:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.app_store_id) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:iphone:app_store_id",
                        content: String(item.app_store_id)
                    }, i++));
                }
                if (item.app_name) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:iphone:app_name",
                        content: item.app_name
                    }, i++));
                }
            }
        }
        if (appLinks.ipad) {
            for (const item of appLinks.ipad){
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:ipad:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.app_store_id) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:ipad:app_store_id",
                        content: String(item.app_store_id)
                    }, i++));
                }
                if (item.app_name) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:ipad:app_name",
                        content: item.app_name
                    }, i++));
                }
            }
        }
        // Android (AppLinksAndroid: package, url, class, app_name)
        if (appLinks.android) {
            for (const item of appLinks.android){
                if (item.package) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:android:package",
                        content: item.package
                    }, i++));
                }
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:android:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.class) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:android:class",
                        content: item.class
                    }, i++));
                }
                if (item.app_name) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:android:app_name",
                        content: item.app_name
                    }, i++));
                }
            }
        }
        // Windows Phone (AppLinksWindows: url, app_id, app_name)
        if (appLinks.windows_phone) {
            for (const item of appLinks.windows_phone){
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:windows_phone:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.app_id) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:windows_phone:app_id",
                        content: item.app_id
                    }, i++));
                }
                if (item.app_name) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:windows_phone:app_name",
                        content: item.app_name
                    }, i++));
                }
            }
        }
        // Windows (AppLinksWindows: url, app_id, app_name)
        if (appLinks.windows) {
            for (const item of appLinks.windows){
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:windows:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.app_id) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:windows:app_id",
                        content: item.app_id
                    }, i++));
                }
                if (item.app_name) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:windows:app_name",
                        content: item.app_name
                    }, i++));
                }
            }
        }
        // Windows Universal (AppLinksWindows: url, app_id, app_name)
        if (appLinks.windows_universal) {
            for (const item of appLinks.windows_universal){
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:windows_universal:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.app_id) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:windows_universal:app_id",
                        content: item.app_id
                    }, i++));
                }
                if (item.app_name) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:windows_universal:app_name",
                        content: item.app_name
                    }, i++));
                }
            }
        }
        // Web (AppLinksWeb: url, should_fallback)
        if (appLinks.web) {
            for (const item of appLinks.web){
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:web:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.should_fallback != null) {
                    tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                        property: "al:web:should_fallback",
                        content: String(item.should_fallback)
                    }, i++));
                }
            }
        }
    }
    // --- Icons ---
    if (metadata.icons) {
        const { shortcut, icon, apple, other } = metadata.icons;
        const hasIcon = Boolean((shortcut == null ? void 0 : shortcut.length) || (icon == null ? void 0 : icon.length) || (apple == null ? void 0 : apple.length) || (other == null ? void 0 : other.length));
        if (shortcut) {
            for (const ic of shortcut){
                const { url, rel, ...props } = ic;
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                    rel: rel || 'shortcut icon',
                    href: url.toString(),
                    ...props
                }, i++));
            }
        }
        if (icon) {
            for (const ic of icon){
                const { url, rel, ...props } = ic;
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                    rel: rel || 'icon',
                    href: url.toString(),
                    ...props
                }, i++));
            }
        }
        if (apple) {
            for (const ic of apple){
                const { url, rel, ...props } = ic;
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                    rel: rel || 'apple-touch-icon',
                    href: url.toString(),
                    ...props
                }, i++));
            }
        }
        if (other) {
            for (const ic of other){
                const { url, rel, ...props } = ic;
                tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("link", {
                    rel: rel || 'icon',
                    href: url.toString(),
                    ...props
                }, i++));
            }
        }
        if (hasIcon) {
            tags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$icon$2d$mark$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IconMark"], {}, i++));
        }
    }
    return tags;
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolve-metadata.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "accumulateMetadata",
    ()=>accumulateMetadata,
    "accumulateViewport",
    ()=>accumulateViewport,
    "resolveMetadata",
    ()=>resolveMetadata,
    "resolveViewport",
    ()=>resolveViewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/router/utils/get-segment-param.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$default$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/default-metadata.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$opengraph$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolvers/resolve-opengraph.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$title$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolvers/resolve-title.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/generate/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$app$2d$dir$2d$module$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/lib/app-dir-module.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$basics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolvers/resolve-basics.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$icons$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolvers/resolve-icons.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/lib/trace/tracer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/lib/trace/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/segment.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$output$2f$log$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/build/output/log.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/request/params.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$client$2d$and$2d$server$2d$references$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/client-and-server-references.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$lazy$2d$result$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/lib/lazy-result.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function isFavicon(icon) {
    if (!icon) {
        return false;
    }
    // turbopack appends a hash to all images
    return (icon.url === '/favicon.ico' || icon.url.toString().startsWith('/favicon.ico?')) && icon.type === 'image/x-icon';
}
function convertUrlsToStrings(input) {
    if (input instanceof URL) {
        return input.toString();
    } else if (Array.isArray(input)) {
        return input.map((item)=>convertUrlsToStrings(item));
    } else if (input && typeof input === 'object') {
        const result = {};
        for (const [key, value] of Object.entries(input)){
            result[key] = convertUrlsToStrings(value);
        }
        return result;
    }
    return input;
}
function normalizeMetadataBase(metadataBase) {
    if (typeof metadataBase === 'string') {
        try {
            metadataBase = new URL(metadataBase);
        } catch  {
            throw Object.defineProperty(new Error(`metadataBase is not a valid URL: ${metadataBase}`), "__NEXT_ERROR_CODE", {
                value: "E850",
                enumerable: false,
                configurable: true
            });
        }
    }
    return metadataBase;
}
async function mergeStaticMetadata(metadataBase, source, target, staticFilesMetadata, metadataContext, titleTemplates, leafSegmentStaticIcons, pathname) {
    var _source_twitter, _source_openGraph;
    if (!staticFilesMetadata) return target;
    const { icon, apple, openGraph, twitter, manifest } = staticFilesMetadata;
    // Keep updating the static icons in the most leaf node
    if (icon) {
        leafSegmentStaticIcons.icon = icon;
    }
    if (apple) {
        leafSegmentStaticIcons.apple = apple;
    }
    // file based metadata is specified and current level metadata twitter.images is not specified
    if (twitter && !(source == null ? void 0 : (_source_twitter = source.twitter) == null ? void 0 : _source_twitter.hasOwnProperty('images'))) {
        const resolvedTwitter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$opengraph$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveTwitter"])({
            ...target.twitter,
            images: twitter
        }, metadataBase, {
            ...metadataContext,
            isStaticMetadataRouteFile: true
        }, titleTemplates.twitter);
        target.twitter = convertUrlsToStrings(resolvedTwitter);
    }
    // file based metadata is specified and current level metadata openGraph.images is not specified
    if (openGraph && !(source == null ? void 0 : (_source_openGraph = source.openGraph) == null ? void 0 : _source_openGraph.hasOwnProperty('images'))) {
        const resolvedOpenGraph = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$opengraph$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveOpenGraph"])({
            ...target.openGraph,
            images: openGraph
        }, metadataBase, pathname, {
            ...metadataContext,
            isStaticMetadataRouteFile: true
        }, titleTemplates.openGraph);
        target.openGraph = convertUrlsToStrings(resolvedOpenGraph);
    }
    if (manifest) {
        target.manifest = manifest;
    }
    return target;
}
/**
 * Merges the given metadata with the resolved metadata. Returns a new object.
 */ async function mergeMetadata(route, pathname, { metadata, resolvedMetadata, staticFilesMetadata, titleTemplates, metadataContext, buildState, leafSegmentStaticIcons }) {
    const newResolvedMetadata = structuredClone(resolvedMetadata);
    const metadataBase = normalizeMetadataBase((metadata == null ? void 0 : metadata.metadataBase) !== undefined ? metadata.metadataBase : resolvedMetadata.metadataBase);
    for(const key_ in metadata){
        const key = key_;
        switch(key){
            case 'title':
                {
                    newResolvedMetadata.title = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$title$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveTitle"])(metadata.title, titleTemplates.title);
                    break;
                }
            case 'alternates':
                {
                    newResolvedMetadata.alternates = convertUrlsToStrings(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$basics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAlternates"])(metadata.alternates, metadataBase, pathname, metadataContext));
                    break;
                }
            case 'openGraph':
                {
                    newResolvedMetadata.openGraph = convertUrlsToStrings(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$opengraph$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveOpenGraph"])(metadata.openGraph, metadataBase, pathname, metadataContext, titleTemplates.openGraph));
                    break;
                }
            case 'twitter':
                {
                    newResolvedMetadata.twitter = convertUrlsToStrings((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$opengraph$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveTwitter"])(metadata.twitter, metadataBase, metadataContext, titleTemplates.twitter));
                    break;
                }
            case 'facebook':
                newResolvedMetadata.facebook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$basics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveFacebook"])(metadata.facebook);
                break;
            case 'verification':
                newResolvedMetadata.verification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$basics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveVerification"])(metadata.verification);
                break;
            case 'icons':
                {
                    newResolvedMetadata.icons = convertUrlsToStrings((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$icons$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveIcons"])(metadata.icons));
                    break;
                }
            case 'appleWebApp':
                newResolvedMetadata.appleWebApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$basics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAppleWebApp"])(metadata.appleWebApp);
                break;
            case 'appLinks':
                newResolvedMetadata.appLinks = convertUrlsToStrings((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$basics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAppLinks"])(metadata.appLinks));
                break;
            case 'robots':
                {
                    newResolvedMetadata.robots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$basics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveRobots"])(metadata.robots);
                    break;
                }
            case 'archives':
            case 'assets':
            case 'bookmarks':
            case 'keywords':
                {
                    newResolvedMetadata[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAsArrayOrUndefined"])(metadata[key]);
                    break;
                }
            case 'authors':
                {
                    newResolvedMetadata[key] = convertUrlsToStrings((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAsArrayOrUndefined"])(metadata.authors));
                    break;
                }
            case 'itunes':
                {
                    newResolvedMetadata[key] = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$basics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveItunes"])(metadata.itunes, metadataBase, pathname, metadataContext);
                    break;
                }
            case 'pagination':
                {
                    newResolvedMetadata.pagination = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$basics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolvePagination"])(metadata.pagination, metadataBase, pathname, metadataContext);
                    break;
                }
            // directly assign fields that fallback to null
            case 'abstract':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'applicationName':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'description':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'generator':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'creator':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'publisher':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'category':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'classification':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'referrer':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'formatDetection':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'manifest':
                newResolvedMetadata[key] = convertUrlsToStrings(metadata[key]) ?? null;
                break;
            case 'pinterest':
                newResolvedMetadata[key] = convertUrlsToStrings(metadata[key]) ?? null;
                break;
            case 'other':
                newResolvedMetadata.other = Object.assign({}, newResolvedMetadata.other, metadata.other);
                if (metadata.other) {
                    if ('apple-touch-fullscreen' in metadata.other) {
                        buildState.warnings.add(`Use appleWebApp instead\nRead more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata`);
                    }
                    if ('apple-touch-icon-precomposed' in metadata.other) {
                        buildState.warnings.add(`Use icons.apple instead\nRead more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata`);
                    }
                }
                break;
            case 'metadataBase':
                newResolvedMetadata.metadataBase = metadataBase ? metadataBase.toString() : null;
                break;
            case 'apple-touch-fullscreen':
                {
                    buildState.warnings.add(`Use appleWebApp instead\nRead more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata`);
                    break;
                }
            case 'apple-touch-icon-precomposed':
                {
                    buildState.warnings.add(`Use icons.apple instead\nRead more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata`);
                    break;
                }
            case 'themeColor':
            case 'colorScheme':
            case 'viewport':
                if (metadata[key] != null) {
                    buildState.warnings.add(`Unsupported metadata ${key} is configured in metadata export in ${route}. Please move it to viewport export instead.\nRead more: https://nextjs.org/docs/app/api-reference/functions/generate-viewport`);
                }
                break;
            default:
                {
                    key;
                }
        }
    }
    return mergeStaticMetadata(metadataBase, metadata, newResolvedMetadata, staticFilesMetadata, metadataContext, titleTemplates, leafSegmentStaticIcons, pathname);
}
/**
 * Merges the given viewport with the resolved viewport. Returns a new object.
 */ function mergeViewport({ resolvedViewport, viewport }) {
    const newResolvedViewport = structuredClone(resolvedViewport);
    if (viewport) {
        for(const key_ in viewport){
            const key = key_;
            switch(key){
                case 'themeColor':
                    {
                        newResolvedViewport.themeColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$basics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveThemeColor"])(viewport.themeColor);
                        break;
                    }
                case 'colorScheme':
                    newResolvedViewport.colorScheme = viewport.colorScheme || null;
                    break;
                case 'width':
                case 'height':
                case 'initialScale':
                case 'minimumScale':
                case 'maximumScale':
                case 'userScalable':
                case 'viewportFit':
                case 'interactiveWidget':
                    // always override the target with the source
                    // @ts-ignore viewport properties
                    newResolvedViewport[key] = viewport[key];
                    break;
                default:
                    key;
            }
        }
    }
    return newResolvedViewport;
}
function getDefinedViewport(mod, props, tracingProps) {
    if (typeof mod.generateViewport === 'function') {
        const { route } = tracingProps;
        const segmentProps = createSegmentProps(mod.generateViewport, props);
        return Object.assign((parent)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTracer"])().trace(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ResolveMetadataSpan"].generateViewport, {
                spanName: `generateViewport ${route}`,
                attributes: {
                    'next.page': route
                }
            }, ()=>mod.generateViewport(segmentProps, parent)), {
            $$original: mod.generateViewport
        });
    }
    return mod.viewport || null;
}
function getDefinedMetadata(mod, props, tracingProps) {
    if (typeof mod.generateMetadata === 'function') {
        const { route } = tracingProps;
        const segmentProps = createSegmentProps(mod.generateMetadata, props);
        return Object.assign((parent)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTracer"])().trace(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ResolveMetadataSpan"].generateMetadata, {
                spanName: `generateMetadata ${route}`,
                attributes: {
                    'next.page': route
                }
            }, ()=>mod.generateMetadata(segmentProps, parent)), {
            $$original: mod.generateMetadata
        });
    }
    return mod.metadata || null;
}
/**
 * If `fn` is a `'use cache'` function, we add special markers to the props,
 * that the cache wrapper reads and removes, before passing the props to the
 * user function.
 */ function createSegmentProps(fn, props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$client$2d$and$2d$server$2d$references$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isUseCacheFunction"])(fn) ? 'searchParams' in props ? {
        ...props,
        $$isPage: true
    } : {
        ...props,
        $$isLayout: true
    } : props;
}
async function collectStaticImagesFiles(metadata, props, type) {
    if (!(metadata == null ? void 0 : metadata[type])) return undefined;
    const iconPromises = metadata[type].map(async (imageModule)=>await imageModule(props));
    return (iconPromises == null ? void 0 : iconPromises.length) > 0 ? (await Promise.all(iconPromises)).flat() : undefined;
}
async function resolveStaticMetadata(modules, props) {
    const { metadata } = modules;
    if (!metadata) return null;
    const [icon, apple, openGraph, twitter] = await Promise.all([
        collectStaticImagesFiles(metadata, props, 'icon'),
        collectStaticImagesFiles(metadata, props, 'apple'),
        collectStaticImagesFiles(metadata, props, 'openGraph'),
        collectStaticImagesFiles(metadata, props, 'twitter')
    ]);
    const staticMetadata = {
        icon,
        apple,
        openGraph,
        twitter,
        manifest: metadata.manifest
    };
    return staticMetadata;
}
// [layout.metadata, static files metadata] -> ... -> [page.metadata, static files metadata]
async function collectMetadata({ tree, metadataItems, errorMetadataItem, props, route, errorConvention }) {
    let mod;
    let modType;
    const hasErrorConventionComponent = Boolean(errorConvention && tree[2][errorConvention]);
    if (errorConvention) {
        mod = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$app$2d$dir$2d$module$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getComponentTypeModule"])(tree, 'layout');
        modType = errorConvention;
    } else {
        const { mod: layoutOrPageMod, modType: layoutOrPageModType } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$app$2d$dir$2d$module$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLayoutOrPageModule"])(tree);
        mod = layoutOrPageMod;
        modType = layoutOrPageModType;
    }
    if (modType) {
        route += `/${modType}`;
    }
    const staticFilesMetadata = await resolveStaticMetadata(tree[2], props);
    const metadataExport = mod ? getDefinedMetadata(mod, props, {
        route
    }) : null;
    metadataItems.push([
        metadataExport,
        staticFilesMetadata
    ]);
    if (hasErrorConventionComponent && errorConvention) {
        const errorMod = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$app$2d$dir$2d$module$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getComponentTypeModule"])(tree, errorConvention);
        const errorMetadataExport = errorMod ? getDefinedMetadata(errorMod, props, {
            route
        }) : null;
        errorMetadataItem[0] = errorMetadataExport;
        errorMetadataItem[1] = staticFilesMetadata;
    }
}
// [layout.metadata, static files metadata] -> ... -> [page.metadata, static files metadata]
async function collectViewport({ tree, viewportItems, errorViewportItemRef, props, route, errorConvention }) {
    let mod;
    let modType;
    const hasErrorConventionComponent = Boolean(errorConvention && tree[2][errorConvention]);
    if (errorConvention) {
        mod = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$app$2d$dir$2d$module$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getComponentTypeModule"])(tree, 'layout');
        modType = errorConvention;
    } else {
        const { mod: layoutOrPageMod, modType: layoutOrPageModType } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$app$2d$dir$2d$module$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLayoutOrPageModule"])(tree);
        mod = layoutOrPageMod;
        modType = layoutOrPageModType;
    }
    if (modType) {
        route += `/${modType}`;
    }
    const viewportExport = mod ? getDefinedViewport(mod, props, {
        route
    }) : null;
    viewportItems.push(viewportExport);
    if (hasErrorConventionComponent && errorConvention) {
        const errorMod = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$app$2d$dir$2d$module$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getComponentTypeModule"])(tree, errorConvention);
        const errorViewportExport = errorMod ? getDefinedViewport(errorMod, props, {
            route
        }) : null;
        errorViewportItemRef.current = errorViewportExport;
    }
}
const resolveMetadataItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async function(tree, searchParams, errorConvention, interpolatedParams) {
    const parentParams = {};
    const metadataItems = [];
    const errorMetadataItem = [
        null,
        null
    ];
    const treePrefix = undefined;
    return resolveMetadataItemsImpl(metadataItems, tree, treePrefix, parentParams, null, searchParams, errorConvention, errorMetadataItem, interpolatedParams);
});
async function resolveMetadataItemsImpl(metadataItems, tree, /** Provided tree can be nested subtree, this argument says what is the path of such subtree */ treePrefix, parentParams, parentOptionalCatchAllParamName, searchParams, errorConvention, errorMetadataItem, interpolatedParams) {
    const [segment, parallelRoutes, { page }] = tree;
    const currentTreePrefix = treePrefix && treePrefix.length ? [
        ...treePrefix,
        segment
    ] : [
        segment
    ];
    const isPage = typeof page !== 'undefined';
    // Handle dynamic segment params.
    let currentParams = parentParams;
    const segmentParam = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSegmentParam"])(segment);
    if (segmentParam) {
        const value = interpolatedParams[segmentParam.paramName];
        if (value !== null && value !== undefined) {
            currentParams = {
                ...parentParams,
                [segmentParam.paramName]: value
            };
        }
    }
    // Track optional catch-all params with no value (see comment in
    // create-component-tree.tsx for full explanation).
    const optionalCatchAllParamName = (segmentParam == null ? void 0 : segmentParam.paramType) === 'optional-catchall' && (interpolatedParams[segmentParam.paramName] === null || interpolatedParams[segmentParam.paramName] === undefined) ? segmentParam.paramName : parentOptionalCatchAllParamName;
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerParamsForMetadata"])(currentParams, optionalCatchAllParamName);
    const props = isPage ? {
        params,
        searchParams
    } : {
        params
    };
    await collectMetadata({
        tree,
        metadataItems,
        errorMetadataItem,
        errorConvention,
        props,
        route: currentTreePrefix // __PAGE__ shouldn't be shown in a route
        .filter((s)=>s !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PAGE_SEGMENT_KEY"]).join('/')
    });
    for(const key in parallelRoutes){
        const childTree = parallelRoutes[key];
        await resolveMetadataItemsImpl(metadataItems, childTree, currentTreePrefix, currentParams, optionalCatchAllParamName, searchParams, errorConvention, errorMetadataItem, interpolatedParams);
    }
    if (Object.keys(parallelRoutes).length === 0 && errorConvention) {
        // If there are no parallel routes, place error metadata as the last item.
        // e.g. layout -> layout -> not-found
        metadataItems.push(errorMetadataItem);
    }
    return metadataItems;
}
const resolveViewportItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async function(tree, searchParams, errorConvention, interpolatedParams) {
    const parentParams = {};
    const viewportItems = [];
    const errorViewportItemRef = {
        current: null
    };
    const treePrefix = undefined;
    return resolveViewportItemsImpl(viewportItems, tree, treePrefix, parentParams, null, searchParams, errorConvention, errorViewportItemRef, interpolatedParams);
});
async function resolveViewportItemsImpl(viewportItems, tree, /** Provided tree can be nested subtree, this argument says what is the path of such subtree */ treePrefix, parentParams, parentOptionalCatchAllParamName, searchParams, errorConvention, errorViewportItemRef, interpolatedParams) {
    const [segment, parallelRoutes, { page }] = tree;
    const currentTreePrefix = treePrefix && treePrefix.length ? [
        ...treePrefix,
        segment
    ] : [
        segment
    ];
    const isPage = typeof page !== 'undefined';
    // Handle dynamic segment params.
    let currentParams = parentParams;
    const segmentParam = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSegmentParam"])(segment);
    if (segmentParam) {
        const value = interpolatedParams[segmentParam.paramName];
        if (value !== null && value !== undefined) {
            currentParams = {
                ...parentParams,
                [segmentParam.paramName]: value
            };
        }
    }
    // Track optional catch-all params with no value (see comment in
    // create-component-tree.tsx for full explanation).
    const optionalCatchAllParamName = (segmentParam == null ? void 0 : segmentParam.paramType) === 'optional-catchall' && (interpolatedParams[segmentParam.paramName] === null || interpolatedParams[segmentParam.paramName] === undefined) ? segmentParam.paramName : parentOptionalCatchAllParamName;
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerParamsForMetadata"])(currentParams, optionalCatchAllParamName);
    let layerProps;
    if (isPage) {
        layerProps = {
            params,
            searchParams
        };
    } else {
        layerProps = {
            params
        };
    }
    await collectViewport({
        tree,
        viewportItems,
        errorViewportItemRef,
        errorConvention,
        props: layerProps,
        route: currentTreePrefix // __PAGE__ shouldn't be shown in a route
        .filter((s)=>s !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PAGE_SEGMENT_KEY"]).join('/')
    });
    for(const key in parallelRoutes){
        const childTree = parallelRoutes[key];
        await resolveViewportItemsImpl(viewportItems, childTree, currentTreePrefix, currentParams, optionalCatchAllParamName, searchParams, errorConvention, errorViewportItemRef, interpolatedParams);
    }
    if (Object.keys(parallelRoutes).length === 0 && errorConvention) {
        // If there are no parallel routes, place error metadata as the last item.
        // e.g. layout -> layout -> not-found
        viewportItems.push(errorViewportItemRef.current);
    }
    return viewportItems;
}
const isTitleTruthy = (title)=>!!(title == null ? void 0 : title.absolute);
const hasTitle = (metadata)=>isTitleTruthy(metadata == null ? void 0 : metadata.title);
function inheritFromMetadata(target, metadata) {
    if (target) {
        if (!hasTitle(target) && hasTitle(metadata)) {
            target.title = metadata.title;
        }
        if (!target.description && metadata.description) {
            target.description = metadata.description;
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const commonOgKeys = [
    'title',
    'description',
    'images'
];
function postProcessMetadata(metadata, favicon, titleTemplates, metadataContext) {
    const { openGraph, twitter } = metadata;
    if (openGraph) {
        // If there's openGraph information but not configured in twitter,
        // inherit them from openGraph metadata.
        let autoFillProps = {};
        const hasTwTitle = hasTitle(twitter);
        const hasTwDescription = twitter == null ? void 0 : twitter.description;
        const hasTwImages = Boolean((twitter == null ? void 0 : twitter.hasOwnProperty('images')) && twitter.images);
        if (!hasTwTitle) {
            if (isTitleTruthy(openGraph.title)) {
                autoFillProps.title = openGraph.title;
            } else if (metadata.title && isTitleTruthy(metadata.title)) {
                autoFillProps.title = metadata.title;
            }
        }
        if (!hasTwDescription) autoFillProps.description = openGraph.description || metadata.description || undefined;
        if (!hasTwImages) autoFillProps.images = openGraph.images;
        if (Object.keys(autoFillProps).length > 0) {
            const partialTwitter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$opengraph$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveTwitter"])(autoFillProps, normalizeMetadataBase(metadata.metadataBase), metadataContext, titleTemplates.twitter);
            if (metadata.twitter) {
                metadata.twitter = Object.assign({}, metadata.twitter, {
                    ...!hasTwTitle && {
                        title: partialTwitter == null ? void 0 : partialTwitter.title
                    },
                    ...!hasTwDescription && {
                        description: partialTwitter == null ? void 0 : partialTwitter.description
                    },
                    ...!hasTwImages && {
                        images: partialTwitter == null ? void 0 : partialTwitter.images
                    }
                });
            } else {
                metadata.twitter = convertUrlsToStrings(partialTwitter);
            }
        }
    }
    // If there's no title and description configured in openGraph or twitter,
    // use the title and description from metadata.
    inheritFromMetadata(openGraph, metadata);
    inheritFromMetadata(twitter, metadata);
    if (favicon) {
        if (!metadata.icons) {
            metadata.icons = {
                icon: [],
                apple: []
            };
        }
        metadata.icons.icon.unshift(favicon);
    }
    return metadata;
}
function prerenderMetadata(metadataItems) {
    // If the index is a function then it is a resolver and the next slot
    // is the corresponding result. If the index is not a function it is the result
    // itself.
    const resolversAndResults = [];
    for(let i = 0; i < metadataItems.length; i++){
        const metadataExport = metadataItems[i][0];
        getResult(resolversAndResults, metadataExport);
    }
    return resolversAndResults;
}
function prerenderViewport(viewportItems) {
    // If the index is a function then it is a resolver and the next slot
    // is the corresponding result. If the index is not a function it is the result
    // itself.
    const resolversAndResults = [];
    for(let i = 0; i < viewportItems.length; i++){
        const viewportExport = viewportItems[i];
        getResult(resolversAndResults, viewportExport);
    }
    return resolversAndResults;
}
const noop = ()=>{};
function getResult(resolversAndResults, exportForResult) {
    if (typeof exportForResult === 'function') {
        // If the function is a 'use cache' function that uses the parent data as
        // the second argument, we don't want to eagerly execute it during
        // metadata/viewport pre-rendering, as the parent data might also be
        // computed from another 'use cache' function. To ensure that the hanging
        // input abort signal handling works in this case (i.e. the depending
        // function waits for the cached input to resolve while encoding its args),
        // they must be called sequentially. This can be accomplished by wrapping
        // the call in a lazy promise, so that the original function is only called
        // when the result is actually awaited.
        const useCacheFunctionInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$client$2d$and$2d$server$2d$references$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUseCacheFunctionInfo"])(exportForResult.$$original);
        if (useCacheFunctionInfo && useCacheFunctionInfo.usedArgs[1]) {
            const promise = new Promise((resolve)=>resolversAndResults.push(resolve));
            resolversAndResults.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$lazy$2d$result$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createLazyResult"])(async ()=>exportForResult(promise)));
        } else {
            let result;
            if (useCacheFunctionInfo) {
                resolversAndResults.push(noop);
                // @ts-expect-error We intentionally omit the parent argument, because
                // we know from the check above that the 'use cache' function does not
                // use it.
                result = exportForResult();
            } else {
                result = exportForResult(new Promise((resolve)=>resolversAndResults.push(resolve)));
            }
            resolversAndResults.push(result);
            if (result instanceof Promise) {
                // since we eager execute generateMetadata and
                // they can reject at anytime we need to ensure
                // we attach the catch handler right away to
                // prevent unhandled rejections crashing the process
                result.catch((err)=>{
                    return {
                        __nextError: err
                    };
                });
            }
        }
    } else if (typeof exportForResult === 'object') {
        resolversAndResults.push(exportForResult);
    } else {
        resolversAndResults.push(null);
    }
}
function freezeInDev(obj) {
    if ("TURBOPACK compile-time truthy", 1) {
        return __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/deep-freeze.js [app-rsc] (ecmascript)").deepFreeze(obj);
    }
    //TURBOPACK unreachable
    ;
}
async function accumulateMetadata(route, metadataItems, pathname, metadataContext) {
    let resolvedMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$default$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createDefaultMetadata"])();
    let titleTemplates = {
        title: null,
        twitter: null,
        openGraph: null
    };
    const buildState = {
        warnings: new Set()
    };
    let favicon;
    // Collect the static icons in the most leaf node,
    // since we don't collect all the static metadata icons in the parent segments.
    const leafSegmentStaticIcons = {
        icon: [],
        apple: []
    };
    const resolversAndResults = prerenderMetadata(metadataItems);
    let resultIndex = 0;
    for(let i = 0; i < metadataItems.length; i++){
        var _staticFilesMetadata_icon;
        const staticFilesMetadata = metadataItems[i][1];
        // Treat favicon as special case, it should be the first icon in the list
        // i <= 1 represents root layout, and if current page is also at root
        if (i <= 1 && isFavicon(staticFilesMetadata == null ? void 0 : (_staticFilesMetadata_icon = staticFilesMetadata.icon) == null ? void 0 : _staticFilesMetadata_icon[0])) {
            var _staticFilesMetadata_icon1;
            const iconMod = staticFilesMetadata == null ? void 0 : (_staticFilesMetadata_icon1 = staticFilesMetadata.icon) == null ? void 0 : _staticFilesMetadata_icon1.shift();
            if (i === 0) favicon = iconMod;
        }
        let pendingMetadata = resolversAndResults[resultIndex++];
        if (typeof pendingMetadata === 'function') {
            // This metadata item had a `generateMetadata` and
            // we need to provide the currently resolved metadata
            // to it before we continue;
            const resolveParentMetadata = pendingMetadata;
            // we know that the next item is a result if this item
            // was a resolver
            pendingMetadata = resolversAndResults[resultIndex++];
            resolveParentMetadata(freezeInDev(resolvedMetadata));
        }
        // Otherwise the item was either null or a static export
        let metadata;
        if (isPromiseLike(pendingMetadata)) {
            metadata = await pendingMetadata;
        } else {
            metadata = pendingMetadata;
        }
        resolvedMetadata = await mergeMetadata(route, pathname, {
            resolvedMetadata,
            metadata,
            metadataContext,
            staticFilesMetadata,
            titleTemplates,
            buildState,
            leafSegmentStaticIcons
        });
        // If the layout is the same layer with page, skip the leaf layout and leaf page
        // The leaf layout and page are the last two items
        if (i < metadataItems.length - 2) {
            var _resolvedMetadata_title, _resolvedMetadata_openGraph, _resolvedMetadata_twitter;
            titleTemplates = {
                title: ((_resolvedMetadata_title = resolvedMetadata.title) == null ? void 0 : _resolvedMetadata_title.template) || null,
                openGraph: ((_resolvedMetadata_openGraph = resolvedMetadata.openGraph) == null ? void 0 : _resolvedMetadata_openGraph.title.template) || null,
                twitter: ((_resolvedMetadata_twitter = resolvedMetadata.twitter) == null ? void 0 : _resolvedMetadata_twitter.title.template) || null
            };
        }
    }
    if (leafSegmentStaticIcons.icon.length > 0 || leafSegmentStaticIcons.apple.length > 0) {
        if (!resolvedMetadata.icons) {
            resolvedMetadata.icons = {
                icon: [],
                apple: []
            };
            if (leafSegmentStaticIcons.icon.length > 0) {
                resolvedMetadata.icons.icon.unshift(...leafSegmentStaticIcons.icon);
            }
            if (leafSegmentStaticIcons.apple.length > 0) {
                resolvedMetadata.icons.apple.unshift(...leafSegmentStaticIcons.apple);
            }
        }
    }
    // Only log warnings if there are any, and only once after the metadata resolving process is finished
    if (buildState.warnings.size > 0) {
        for (const warning of buildState.warnings){
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$output$2f$log$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"](warning);
        }
    }
    return postProcessMetadata(resolvedMetadata, favicon, titleTemplates, metadataContext);
}
async function accumulateViewport(viewportItems) {
    let resolvedViewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$default$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createDefaultViewport"])();
    const resolversAndResults = prerenderViewport(viewportItems);
    let i = 0;
    while(i < resolversAndResults.length){
        let pendingViewport = resolversAndResults[i++];
        if (typeof pendingViewport === 'function') {
            // this viewport item had a `generateViewport` and
            // we need to provide the currently resolved viewport
            // to it before we continue;
            const resolveParentViewport = pendingViewport;
            // we know that the next item is a result if this item
            // was a resolver
            pendingViewport = resolversAndResults[i++];
            resolveParentViewport(freezeInDev(resolvedViewport));
        }
        // Otherwise the item was either null or a static export
        let viewport;
        if (isPromiseLike(pendingViewport)) {
            viewport = await pendingViewport;
        } else {
            viewport = pendingViewport;
        }
        resolvedViewport = mergeViewport({
            resolvedViewport,
            viewport
        });
    }
    return resolvedViewport;
}
async function resolveMetadata(tree, pathname, searchParams, errorConvention, interpolatedParams, metadataContext) {
    const metadataItems = await resolveMetadataItems(tree, searchParams, errorConvention, interpolatedParams);
    const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
    if (!workStore) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"]('Expected workStore to be initialized'), "__NEXT_ERROR_CODE", {
            value: "E1068",
            enumerable: false,
            configurable: true
        });
    }
    return accumulateMetadata(workStore.route, metadataItems, pathname, metadataContext);
}
async function resolveViewport(tree, searchParams, errorConvention, interpolatedParams) {
    const viewportItems = await resolveViewportItems(tree, searchParams, errorConvention, interpolatedParams);
    return accumulateViewport(viewportItems);
}
function isPromiseLike(value) {
    return typeof value === 'object' && value !== null && typeof value.then === 'function';
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolvers/resolve-basics.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveAlternates",
    ()=>resolveAlternates,
    "resolveAppLinks",
    ()=>resolveAppLinks,
    "resolveAppleWebApp",
    ()=>resolveAppleWebApp,
    "resolveFacebook",
    ()=>resolveFacebook,
    "resolveItunes",
    ()=>resolveItunes,
    "resolvePagination",
    ()=>resolvePagination,
    "resolveRobots",
    ()=>resolveRobots,
    "resolveThemeColor",
    ()=>resolveThemeColor,
    "resolveVerification",
    ()=>resolveVerification
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/generate/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolvers/resolve-url.js [app-rsc] (ecmascript)");
;
;
function resolveAlternateUrl(url, metadataBase, pathname, metadataContext) {
    // If alter native url is an URL instance,
    // we treat it as a URL base and resolve with current pathname
    if (url instanceof URL) {
        const newUrl = new URL(pathname, url);
        url.searchParams.forEach((value, key)=>newUrl.searchParams.set(key, value));
        url = newUrl;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAbsoluteUrlWithPathname"])(url, metadataBase, pathname, metadataContext);
}
const resolveThemeColor = (themeColor)=>{
    var _resolveAsArrayOrUndefined;
    if (!themeColor) return null;
    const themeColorDescriptors = [];
    (_resolveAsArrayOrUndefined = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAsArrayOrUndefined"])(themeColor)) == null ? void 0 : _resolveAsArrayOrUndefined.forEach((descriptor)=>{
        if (typeof descriptor === 'string') themeColorDescriptors.push({
            color: descriptor
        });
        else if (typeof descriptor === 'object') themeColorDescriptors.push({
            color: descriptor.color,
            media: descriptor.media
        });
    });
    return themeColorDescriptors;
};
async function resolveUrlValuesOfObject(obj, metadataBase, pathname, metadataContext) {
    if (!obj) return null;
    const result = {};
    for (const [key, value] of Object.entries(obj)){
        if (typeof value === 'string' || value instanceof URL) {
            const pathnameForUrl = await pathname;
            result[key] = [
                {
                    url: resolveAlternateUrl(value, metadataBase, pathnameForUrl, metadataContext)
                }
            ];
        } else if (value && value.length) {
            result[key] = [];
            const pathnameForUrl = await pathname;
            value.forEach((item, index)=>{
                const url = resolveAlternateUrl(item.url, metadataBase, pathnameForUrl, metadataContext);
                result[key][index] = {
                    url,
                    title: item.title
                };
            });
        }
    }
    return result;
}
async function resolveCanonicalUrl(urlOrDescriptor, metadataBase, pathname, metadataContext) {
    if (!urlOrDescriptor) return null;
    const url = typeof urlOrDescriptor === 'string' || urlOrDescriptor instanceof URL ? urlOrDescriptor : urlOrDescriptor.url;
    const pathnameForUrl = await pathname;
    // Return string url because structureClone can't handle URL instance
    return {
        url: resolveAlternateUrl(url, metadataBase, pathnameForUrl, metadataContext)
    };
}
const resolveAlternates = async (alternates, metadataBase, pathname, context)=>{
    if (!alternates) return null;
    const canonical = await resolveCanonicalUrl(alternates.canonical, metadataBase, pathname, context);
    const languages = await resolveUrlValuesOfObject(alternates.languages, metadataBase, pathname, context);
    const media = await resolveUrlValuesOfObject(alternates.media, metadataBase, pathname, context);
    const types = await resolveUrlValuesOfObject(alternates.types, metadataBase, pathname, context);
    return {
        canonical,
        languages,
        media,
        types
    };
};
const robotsKeys = [
    'noarchive',
    'nosnippet',
    'noimageindex',
    'nocache',
    'notranslate',
    'indexifembedded',
    'nositelinkssearchbox',
    'unavailable_after',
    'max-video-preview',
    'max-image-preview',
    'max-snippet'
];
const resolveRobotsValue = (robots)=>{
    if (!robots) return null;
    if (typeof robots === 'string') return robots;
    const values = [];
    if (robots.index) values.push('index');
    else if (typeof robots.index === 'boolean') values.push('noindex');
    if (robots.follow) values.push('follow');
    else if (typeof robots.follow === 'boolean') values.push('nofollow');
    for (const key of robotsKeys){
        const value = robots[key];
        if (typeof value !== 'undefined' && value !== false) {
            values.push(typeof value === 'boolean' ? key : `${key}:${value}`);
        }
    }
    return values.join(', ');
};
const resolveRobots = (robots)=>{
    if (!robots) return null;
    return {
        basic: resolveRobotsValue(robots),
        googleBot: typeof robots !== 'string' ? resolveRobotsValue(robots.googleBot) : null
    };
};
const VerificationKeys = [
    'google',
    'yahoo',
    'yandex',
    'me',
    'other'
];
const resolveVerification = (verification)=>{
    if (!verification) return null;
    const res = {};
    for (const key of VerificationKeys){
        const value = verification[key];
        if (value) {
            if (key === 'other') {
                res.other = {};
                for(const otherKey in verification.other){
                    const otherValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAsArrayOrUndefined"])(verification.other[otherKey]);
                    if (otherValue) res.other[otherKey] = otherValue;
                }
            } else res[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAsArrayOrUndefined"])(value);
        }
    }
    return res;
};
const resolveAppleWebApp = (appWebApp)=>{
    var _resolveAsArrayOrUndefined;
    if (!appWebApp) return null;
    if (appWebApp === true) {
        return {
            capable: true
        };
    }
    const startupImages = appWebApp.startupImage ? (_resolveAsArrayOrUndefined = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAsArrayOrUndefined"])(appWebApp.startupImage)) == null ? void 0 : _resolveAsArrayOrUndefined.map((item)=>typeof item === 'string' ? {
            url: item
        } : item) : null;
    return {
        capable: 'capable' in appWebApp ? !!appWebApp.capable : true,
        title: appWebApp.title || null,
        startupImage: startupImages,
        statusBarStyle: appWebApp.statusBarStyle || 'default'
    };
};
const resolveAppLinks = (appLinks)=>{
    if (!appLinks) return null;
    for(const key in appLinks){
        // @ts-ignore // TODO: type infer
        appLinks[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAsArrayOrUndefined"])(appLinks[key]);
    }
    return appLinks;
};
const resolveItunes = async (itunes, metadataBase, pathname, context)=>{
    if (!itunes) return null;
    return {
        appId: itunes.appId,
        appArgument: itunes.appArgument ? resolveAlternateUrl(itunes.appArgument, metadataBase, await pathname, context) : undefined
    };
};
const resolveFacebook = (facebook)=>{
    if (!facebook) return null;
    return {
        appId: facebook.appId,
        admins: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAsArrayOrUndefined"])(facebook.admins)
    };
};
const resolvePagination = async (pagination, metadataBase, pathname, context)=>{
    return {
        previous: (pagination == null ? void 0 : pagination.previous) ? resolveAlternateUrl(pagination.previous, metadataBase, await pathname, context) : null,
        next: (pagination == null ? void 0 : pagination.next) ? resolveAlternateUrl(pagination.next, metadataBase, await pathname, context) : null
    };
};
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolvers/resolve-icons.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveIcon",
    ()=>resolveIcon,
    "resolveIcons",
    ()=>resolveIcons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/generate/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolvers/resolve-url.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/constants.js [app-rsc] (ecmascript)");
;
;
;
function resolveIcon(icon) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isStringOrURL"])(icon)) return {
        url: icon
    };
    else if (Array.isArray(icon)) return icon;
    return icon;
}
const resolveIcons = (icons)=>{
    if (!icons) {
        return null;
    }
    const resolved = {
        icon: [],
        apple: []
    };
    if (Array.isArray(icons)) {
        resolved.icon = icons.map(resolveIcon).filter(Boolean);
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isStringOrURL"])(icons)) {
        resolved.icon = [
            resolveIcon(icons)
        ];
    } else {
        for (const key of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IconKeys"]){
            const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAsArrayOrUndefined"])(icons[key]);
            if (values) resolved[key] = values.map(resolveIcon);
        }
    }
    return resolved;
};
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolvers/resolve-opengraph.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveImages",
    ()=>resolveImages,
    "resolveOpenGraph",
    ()=>resolveOpenGraph,
    "resolveTwitter",
    ()=>resolveTwitter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/generate/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolvers/resolve-url.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$title$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolvers/resolve-title.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/url.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$output$2f$log$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/build/output/log.js [app-rsc] (ecmascript)");
;
;
;
;
;
const OgTypeFields = {
    article: [
        'authors',
        'tags'
    ],
    song: [
        'albums',
        'musicians'
    ],
    playlist: [
        'albums',
        'musicians'
    ],
    radio: [
        'creators'
    ],
    video: [
        'actors',
        'directors',
        'writers',
        'tags'
    ],
    basic: [
        'emails',
        'phoneNumbers',
        'faxNumbers',
        'alternateLocale',
        'audio',
        'videos'
    ]
};
function resolveAndValidateImage(item, metadataBase, isStaticMetadataRouteFile) {
    if (!item) return undefined;
    const isItemUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isStringOrURL"])(item);
    const inputUrl = isItemUrl ? item : item.url;
    if (!inputUrl) return undefined;
    // process.env.VERCEL is set to "1" when System Environment Variables are
    // exposed. When exposed, validation is not necessary since we are falling back to
    // process.env.VERCEL_PROJECT_PRODUCTION_URL, process.env.VERCEL_BRANCH_URL, or
    // process.env.VERCEL_URL for the `metadataBase`. process.env.VERCEL is undefined
    // when System Environment Variables are not exposed. When not exposed, we cannot
    // detect in the build environment if the deployment is a Vercel deployment or not.
    //
    // x-ref: https://vercel.com/docs/projects/environment-variables/system-environment-variables#system-environment-variables
    const isUsingVercelSystemEnvironmentVariables = Boolean(process.env.VERCEL);
    const isRelativeUrl = typeof inputUrl === 'string' && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFullStringUrl"])(inputUrl);
    // When no explicit metadataBase is specified by the user, we'll override it with the fallback metadata
    // under the following conditions:
    // - The provided URL is relative (ie ./og-image).
    // - The image is statically generated by Next.js (such as the special `opengraph-image` route)
    // In both cases, we want to ensure that across all environments, the ogImage is a fully qualified URL.
    // In the `opengraph-image` case, since the user isn't explicitly passing a relative path, this ensures
    // the ogImage will be properly discovered across different environments without the user needing to
    // have a bunch of `process.env` checks when defining their `metadataBase`.
    if (isRelativeUrl && (!metadataBase || isStaticMetadataRouteFile)) {
        const fallbackMetadataBase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSocialImageMetadataBaseFallback"])(metadataBase);
        // When not using Vercel environment variables for URL injection, we aren't able to determine
        // a fallback value for `metadataBase`. For self-hosted setups, we want to warn
        // about this since the only fallback we'll be able to generate is `localhost`.
        // In development, we'll only warn for relative metadata that isn't part of the static
        // metadata conventions (eg `opengraph-image`), as otherwise it's currently very noisy
        // for common cases. Eventually we should remove this warning all together in favor of
        // devtools.
        const shouldWarn = !isUsingVercelSystemEnvironmentVariables && !metadataBase && (("TURBOPACK compile-time value", "development") === 'production' || !isStaticMetadataRouteFile);
        if (shouldWarn) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$output$2f$log$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warnOnce"])(`metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "${fallbackMetadataBase.origin}". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase`);
        }
        metadataBase = fallbackMetadataBase;
    }
    return isItemUrl ? {
        url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveUrl"])(inputUrl, metadataBase)
    } : {
        ...item,
        // Update image descriptor url
        url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveUrl"])(inputUrl, metadataBase)
    };
}
function resolveImages(images, metadataBase, isStaticMetadataRouteFile) {
    const resolvedImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAsArrayOrUndefined"])(images);
    if (!resolvedImages) return resolvedImages;
    const nonNullableImages = [];
    for (const item of resolvedImages){
        const resolvedItem = resolveAndValidateImage(item, metadataBase, isStaticMetadataRouteFile);
        if (!resolvedItem) continue;
        nonNullableImages.push(resolvedItem);
    }
    return nonNullableImages;
}
const ogTypeToFields = {
    article: OgTypeFields.article,
    book: OgTypeFields.article,
    'music.song': OgTypeFields.song,
    'music.album': OgTypeFields.song,
    'music.playlist': OgTypeFields.playlist,
    'music.radio_station': OgTypeFields.radio,
    'video.movie': OgTypeFields.video,
    'video.episode': OgTypeFields.video
};
function getFieldsByOgType(ogType) {
    if (!ogType || !(ogType in ogTypeToFields)) return OgTypeFields.basic;
    return ogTypeToFields[ogType].concat(OgTypeFields.basic);
}
const resolveOpenGraph = async (openGraph, metadataBase, pathname, metadataContext, titleTemplate)=>{
    if (!openGraph) return null;
    function resolveProps(target, og) {
        const ogType = og && 'type' in og ? og.type : undefined;
        const keys = getFieldsByOgType(ogType);
        for (const k of keys){
            const key = k;
            if (key in og && key !== 'url') {
                const value = og[key];
                target[key] = value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveArray"])(value) : null;
            }
        }
        target.images = resolveImages(og.images, metadataBase, metadataContext.isStaticMetadataRouteFile);
    }
    const resolved = {
        ...openGraph,
        title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$title$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveTitle"])(openGraph.title, titleTemplate)
    };
    resolveProps(resolved, openGraph);
    resolved.url = openGraph.url ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAbsoluteUrlWithPathname"])(openGraph.url, metadataBase, await pathname, metadataContext) : null;
    return resolved;
};
const TwitterBasicInfoKeys = [
    'site',
    'siteId',
    'creator',
    'creatorId',
    'description'
];
const resolveTwitter = (twitter, metadataBase, metadataContext, titleTemplate)=>{
    var _resolved_images;
    if (!twitter) return null;
    let card = 'card' in twitter ? twitter.card : undefined;
    const resolved = {
        ...twitter,
        title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$resolvers$2f$resolve$2d$title$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveTitle"])(twitter.title, titleTemplate)
    };
    for (const infoKey of TwitterBasicInfoKeys){
        resolved[infoKey] = twitter[infoKey] || null;
    }
    resolved.images = resolveImages(twitter.images, metadataBase, metadataContext.isStaticMetadataRouteFile);
    card = card || (((_resolved_images = resolved.images) == null ? void 0 : _resolved_images.length) ? 'summary_large_image' : 'summary');
    resolved.card = card;
    if ('card' in resolved) {
        switch(resolved.card){
            case 'player':
                {
                    resolved.players = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$generate$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAsArrayOrUndefined"])(resolved.players) || [];
                    break;
                }
            case 'app':
                {
                    resolved.app = resolved.app || {};
                    break;
                }
            case 'summary':
            case 'summary_large_image':
                break;
            default:
                resolved;
        }
    }
    return resolved;
};
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolvers/resolve-title.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveTitle",
    ()=>resolveTitle
]);
function resolveTitleTemplate(template, title) {
    return template ? template.replace(/%s/g, title) : title;
}
function resolveTitle(title, stashedTemplate) {
    let resolved;
    const template = typeof title !== 'string' && title && 'template' in title ? title.template : null;
    if (typeof title === 'string') {
        resolved = resolveTitleTemplate(stashedTemplate, title);
    } else if (title) {
        if ('default' in title) {
            resolved = resolveTitleTemplate(stashedTemplate, title.default);
        }
        if ('absolute' in title && title.absolute) {
            resolved = title.absolute;
        }
    }
    if (title && typeof title !== 'string') {
        return {
            template,
            absolute: resolved || ''
        };
    } else {
        return {
            absolute: resolved || title || '',
            template
        };
    }
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/metadata/resolvers/resolve-url.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSocialImageMetadataBaseFallback",
    ()=>getSocialImageMetadataBaseFallback,
    "isStringOrURL",
    ()=>isStringOrURL,
    "resolveAbsoluteUrlWithPathname",
    ()=>resolveAbsoluteUrlWithPathname,
    "resolveRelativeUrl",
    ()=>resolveRelativeUrl,
    "resolveUrl",
    ()=>resolveUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$isomorphic$2f$path$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/isomorphic/path.js [app-rsc] (ecmascript)");
;
function isStringOrURL(icon) {
    return typeof icon === 'string' || icon instanceof URL;
}
function createLocalMetadataBase() {
    // Check if experimental HTTPS is enabled
    const isExperimentalHttps = Boolean(process.env.__NEXT_EXPERIMENTAL_HTTPS);
    const protocol = isExperimentalHttps ? 'https' : 'http';
    return new URL(`${protocol}://localhost:${process.env.PORT || 3000}`);
}
function getPreviewDeploymentUrl() {
    const origin = process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;
    return origin ? new URL(`https://${origin}`) : undefined;
}
function getProductionDeploymentUrl() {
    const origin = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    return origin ? new URL(`https://${origin}`) : undefined;
}
function getSocialImageMetadataBaseFallback(metadataBase) {
    const defaultMetadataBase = createLocalMetadataBase();
    const previewDeploymentUrl = getPreviewDeploymentUrl();
    const productionDeploymentUrl = getProductionDeploymentUrl();
    let fallbackMetadataBase;
    if ("TURBOPACK compile-time truthy", 1) {
        fallbackMetadataBase = defaultMetadataBase;
    } else //TURBOPACK unreachable
    ;
    return fallbackMetadataBase;
}
function resolveUrl(url, metadataBase) {
    if (url instanceof URL) return url;
    if (!url) return null;
    try {
        // If we can construct a URL instance from url, ignore metadataBase
        const parsedUrl = new URL(url);
        return parsedUrl;
    } catch  {}
    if (!metadataBase) {
        metadataBase = createLocalMetadataBase();
    }
    // Handle relative or absolute paths
    const pathname = metadataBase.pathname || '';
    const joinedPath = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$isomorphic$2f$path$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].posix.join(pathname, url);
    return new URL(joinedPath, metadataBase);
}
// Resolve with `pathname` if `url` is a relative path.
function resolveRelativeUrl(url, pathname) {
    if (typeof url === 'string' && url.startsWith('./')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$isomorphic$2f$path$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].posix.resolve(pathname, url);
    }
    return url;
}
// The regex is matching logic from packages/next/src/lib/load-custom-routes.ts
const FILE_REGEX = /^(?:\/((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+))(\/?|$)/i;
function isFilePattern(pathname) {
    return FILE_REGEX.test(pathname);
}
// Resolve `pathname` if `url` is a relative path the compose with `metadataBase`.
function resolveAbsoluteUrlWithPathname(url, metadataBase, pathname, { trailingSlash }) {
    // Resolve url with pathname that always starts with `/`
    url = resolveRelativeUrl(url, pathname);
    // Convert string url or URL instance to absolute url string,
    // if there's case needs to be resolved with metadataBase
    let resolvedUrl = '';
    const result = metadataBase ? resolveUrl(url, metadataBase) : url;
    if (typeof result === 'string') {
        resolvedUrl = result;
    } else {
        resolvedUrl = result.pathname === '/' && result.searchParams.size === 0 ? result.origin : result.href;
    }
    // Add trailing slash if it's enabled for urls matches the condition
    // - Not external, same origin with metadataBase
    // - Doesn't have query
    if (trailingSlash && !resolvedUrl.endsWith('/')) {
        let isRelative = resolvedUrl.startsWith('/');
        let hasQuery = resolvedUrl.includes('?');
        let isExternal = false;
        let isFileUrl = false;
        if (!isRelative) {
            try {
                const parsedUrl = new URL(resolvedUrl);
                isExternal = metadataBase != null && parsedUrl.origin !== metadataBase.origin;
                isFileUrl = isFilePattern(parsedUrl.pathname);
            } catch  {
                // If it's not a valid URL, treat it as external
                isExternal = true;
            }
            if (!isFileUrl && !isExternal && !hasQuery) return `${resolvedUrl}/`;
        }
    }
    return resolvedUrl;
}
;
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/picocolors.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bgBlack",
    ()=>bgBlack,
    "bgBlue",
    ()=>bgBlue,
    "bgCyan",
    ()=>bgCyan,
    "bgGreen",
    ()=>bgGreen,
    "bgMagenta",
    ()=>bgMagenta,
    "bgRed",
    ()=>bgRed,
    "bgWhite",
    ()=>bgWhite,
    "bgYellow",
    ()=>bgYellow,
    "black",
    ()=>black,
    "blue",
    ()=>blue,
    "bold",
    ()=>bold,
    "cyan",
    ()=>cyan,
    "dim",
    ()=>dim,
    "gray",
    ()=>gray,
    "green",
    ()=>green,
    "hidden",
    ()=>hidden,
    "inverse",
    ()=>inverse,
    "italic",
    ()=>italic,
    "magenta",
    ()=>magenta,
    "purple",
    ()=>purple,
    "red",
    ()=>red,
    "reset",
    ()=>reset,
    "strikethrough",
    ()=>strikethrough,
    "underline",
    ()=>underline,
    "white",
    ()=>white,
    "yellow",
    ()=>yellow
]);
// ISC License
// Copyright (c) 2021 Alexey Raspopov, Kostiantyn Denysov, Anton Verinov
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//
// https://github.com/alexeyraspopov/picocolors/blob/b6261487e7b81aaab2440e397a356732cad9e342/picocolors.js#L1
var _globalThis;
const { env, stdout } = ((_globalThis = globalThis) == null ? void 0 : _globalThis.process) ?? {};
const enabled = env && !env.NO_COLOR && (env.FORCE_COLOR || (stdout == null ? void 0 : stdout.isTTY) && !env.CI && env.TERM !== 'dumb');
const replaceClose = (str, close, replace, index)=>{
    const start = str.substring(0, index) + replace;
    const end = str.substring(index + close.length);
    const nextIndex = end.indexOf(close);
    return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end;
};
const formatter = (open, close, replace = open)=>{
    if (!enabled) return String;
    return (input)=>{
        const string = '' + input;
        const index = string.indexOf(close, open.length);
        return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
};
const reset = enabled ? (s)=>`\x1b[0m${s}\x1b[0m` : String;
const bold = formatter('\x1b[1m', '\x1b[22m', '\x1b[22m\x1b[1m');
const dim = formatter('\x1b[2m', '\x1b[22m', '\x1b[22m\x1b[2m');
const italic = formatter('\x1b[3m', '\x1b[23m');
const underline = formatter('\x1b[4m', '\x1b[24m');
const inverse = formatter('\x1b[7m', '\x1b[27m');
const hidden = formatter('\x1b[8m', '\x1b[28m');
const strikethrough = formatter('\x1b[9m', '\x1b[29m');
const black = formatter('\x1b[30m', '\x1b[39m');
const red = formatter('\x1b[31m', '\x1b[39m');
const green = formatter('\x1b[32m', '\x1b[39m');
const yellow = formatter('\x1b[33m', '\x1b[39m');
const blue = formatter('\x1b[34m', '\x1b[39m');
const magenta = formatter('\x1b[35m', '\x1b[39m');
const purple = formatter('\x1b[38;2;173;127;168m', '\x1b[39m');
const cyan = formatter('\x1b[36m', '\x1b[39m');
const white = formatter('\x1b[37m', '\x1b[39m');
const gray = formatter('\x1b[90m', '\x1b[39m');
const bgBlack = formatter('\x1b[40m', '\x1b[49m');
const bgRed = formatter('\x1b[41m', '\x1b[49m');
const bgGreen = formatter('\x1b[42m', '\x1b[49m');
const bgYellow = formatter('\x1b[43m', '\x1b[49m');
const bgBlue = formatter('\x1b[44m', '\x1b[49m');
const bgMagenta = formatter('\x1b[45m', '\x1b[49m');
const bgCyan = formatter('\x1b[46m', '\x1b[49m');
const bgWhite = formatter('\x1b[47m', '\x1b[49m');
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/scheduler.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Schedules a function to be called on the next tick after the other promises
 * have been resolved.
 *
 * @param cb the function to schedule
 */ __turbopack_context__.s([
    "atLeastOneTask",
    ()=>atLeastOneTask,
    "scheduleImmediate",
    ()=>scheduleImmediate,
    "scheduleOnNextTick",
    ()=>scheduleOnNextTick,
    "waitAtLeastOneReactRenderTask",
    ()=>waitAtLeastOneReactRenderTask
]);
const scheduleOnNextTick = (cb)=>{
    // We use Promise.resolve().then() here so that the operation is scheduled at
    // the end of the promise job queue, we then add it to the next process tick
    // to ensure it's evaluated afterwards.
    //
    // This was inspired by the implementation of the DataLoader interface: https://github.com/graphql/dataloader/blob/d336bd15282664e0be4b4a657cb796f09bafbc6b/src/index.js#L213-L255
    //
    Promise.resolve().then(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            process.nextTick(cb);
        }
    });
};
const scheduleImmediate = (cb)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        setImmediate(cb);
    }
};
function atLeastOneTask() {
    return new Promise((resolve)=>scheduleImmediate(resolve));
}
function waitAtLeastOneReactRenderTask() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return new Promise((r)=>setImmediate(r));
    }
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/url.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isFullStringUrl",
    ()=>isFullStringUrl,
    "parseReqUrl",
    ()=>parseReqUrl,
    "parseUrl",
    ()=>parseUrl,
    "stripNextRscUnionQuery",
    ()=>stripNextRscUnionQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/client/components/app-router-headers.js [app-rsc] (ecmascript)");
;
const DUMMY_ORIGIN = 'http://n';
function isFullStringUrl(url) {
    return /https?:\/\//.test(url);
}
function parseUrl(url) {
    let parsed = undefined;
    try {
        parsed = new URL(url, DUMMY_ORIGIN);
    } catch  {}
    return parsed;
}
function parseReqUrl(url) {
    const parsedUrl = parseUrl(url);
    if (!parsedUrl) {
        return;
    }
    const query = {};
    for (const key of parsedUrl.searchParams.keys()){
        const values = parsedUrl.searchParams.getAll(key);
        query[key] = values.length > 1 ? values : values[0];
    }
    const legacyUrl = {
        query,
        hash: parsedUrl.hash,
        search: parsedUrl.search,
        path: parsedUrl.pathname,
        pathname: parsedUrl.pathname,
        href: `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`,
        host: '',
        hostname: '',
        auth: '',
        protocol: '',
        slashes: null,
        port: ''
    };
    return legacyUrl;
}
function stripNextRscUnionQuery(relativeUrl) {
    const urlInstance = new URL(relativeUrl, DUMMY_ORIGIN);
    urlInstance.searchParams.delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_RSC_UNION_QUERY"]);
    return urlInstance.pathname + urlInstance.search;
}
}),
];

//# sourceMappingURL=1rpl_next_dist_esm_lib_163somf._.js.map