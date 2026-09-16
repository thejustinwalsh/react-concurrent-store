module.exports = [
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/blocking-route-messages.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDynamicBodyError",
    ()=>createDynamicBodyError,
    "createDynamicBodyErrorInNavigation",
    ()=>createDynamicBodyErrorInNavigation,
    "createDynamicMetadataError",
    ()=>createDynamicMetadataError,
    "createDynamicOrRuntimeBodyError",
    ()=>createDynamicOrRuntimeBodyError,
    "createDynamicOrRuntimeMetadataError",
    ()=>createDynamicOrRuntimeMetadataError,
    "createDynamicOrRuntimeViewportError",
    ()=>createDynamicOrRuntimeViewportError,
    "createDynamicViewportError",
    ()=>createDynamicViewportError,
    "createLinkBodyErrorInNavigation",
    ()=>createLinkBodyErrorInNavigation,
    "createLinkMetadataError",
    ()=>createLinkMetadataError,
    "createLinkViewportError",
    ()=>createLinkViewportError,
    "createRuntimeBodyError",
    ()=>createRuntimeBodyError,
    "createRuntimeBodyErrorInNavigation",
    ()=>createRuntimeBodyErrorInNavigation,
    "createRuntimeMetadataError",
    ()=>createRuntimeMetadataError,
    "createRuntimeViewportError",
    ()=>createRuntimeViewportError,
    "logBuildDebugHint",
    ()=>logBuildDebugHint
]);
function createRuntimeBodyError(route) {
    return Object.defineProperty(new Error(`Route "${route}": Next.js encountered runtime data during prerendering.\n\n` + `\`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` accessed outside of \`<Suspense>\` prevents the route from being prerendered, blocking the page load and leading to a slower user experience.\n\n` + `Ways to fix this:\n` + `  - [stream] Provide a placeholder with \`<Suspense fallback={...}>\` around the data access\n` + `  - [block] Set \`export const instant = false\` to allow a blocking route\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-runtime`), "__NEXT_ERROR_CODE", {
        value: "E1427",
        enumerable: false,
        configurable: true
    });
}
function createDynamicBodyError(route) {
    return Object.defineProperty(new Error(`Route "${route}": Next.js encountered uncached data during prerendering.\n\n` + `\`fetch(...)\` or \`connection()\` accessed outside of \`<Suspense>\` prevents the route from being prerendered, blocking the page load and leading to a slower user experience.\n\n` + `Ways to fix this:\n` + `  - [stream] Provide a placeholder with \`<Suspense fallback={...}>\` around the data access\n` + `  - [cache] Cache the data access with \`"use cache"\` (does not apply to \`connection()\`)\n` + `  - [block] Set \`export const instant = false\` to allow a blocking route\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-dynamic`), "__NEXT_ERROR_CODE", {
        value: "E1440",
        enumerable: false,
        configurable: true
    });
}
function createRuntimeBodyErrorInNavigation(route) {
    return Object.defineProperty(new Error(`Route "${route}": Next.js encountered runtime data during prerendering or a navigation.\n\n` + `\`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` accessed outside of \`<Suspense>\` prevents the route from being prerendered or the navigation from being instant, leading to a slower user experience.\n\n` + `Ways to fix this:\n` + `  - [stream] Provide a placeholder with \`<Suspense fallback={...}>\` around the data access\n` + `  - [block] Set \`export const instant = false\` to allow a blocking route\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-runtime`), "__NEXT_ERROR_CODE", {
        value: "E1430",
        enumerable: false,
        configurable: true
    });
}
function createLinkBodyErrorInNavigation(route) {
    return Object.defineProperty(new Error(`Route "${route}": Next.js encountered URL data during prerendering or a navigation.\n\n` + `\`params\` or \`searchParams\` accessed outside of \`<Suspense>\` may prevent the navigation from being instant, leading to a slower user experience.\n\n` + `Ways to fix this:\n` + `  - [stream] Provide a placeholder with \`<Suspense fallback={...}>\` around the data access\n` + `  - [block] Set \`export const instant = false\` to allow a blocking route\n\n` + `Learn more: https://nextjs.org/docs/messages/instant-shell-url-data`), "__NEXT_ERROR_CODE", {
        value: "E1439",
        enumerable: false,
        configurable: true
    });
}
function createDynamicBodyErrorInNavigation(route) {
    return Object.defineProperty(new Error(`Route "${route}": Next.js encountered uncached data during prerendering or a navigation.\n\n` + `\`fetch(...)\` or \`connection()\` accessed outside of \`<Suspense>\` prevents the route from being prerendered or the navigation from being instant, leading to a slower user experience.\n\n` + `Ways to fix this:\n` + `  - [stream] Provide a placeholder with \`<Suspense fallback={...}>\` around the data access\n` + `  - [cache] Cache the data access with \`"use cache"\` (does not apply to \`connection()\`)\n` + `  - [block] Set \`export const instant = false\` to allow a blocking route\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-dynamic`), "__NEXT_ERROR_CODE", {
        value: "E1437",
        enumerable: false,
        configurable: true
    });
}
function createDynamicOrRuntimeBodyError(route) {
    return Object.defineProperty(new Error(`Route "${route}": Next.js encountered uncached or runtime data during prerendering.\n\n` + `\`fetch(...)\`, \`cookies()\`, \`headers()\`, \`params\`, \`searchParams\`, or \`connection()\` accessed outside of \`<Suspense>\` prevents the route from being prerendered, blocking the page load and leading to a slower user experience.\n\n` + `Ways to fix this:\n` + `  - [stream] Provide a placeholder with \`<Suspense fallback={...}>\` around the data access\n` + `  - [cache] For uncached data (\`fetch\`, database calls): cache the access with \`"use cache"\` (does not apply to \`connection()\`)\n` + `  - [block] Set \`export const instant = false\` to allow a blocking route\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-dynamic`), "__NEXT_ERROR_CODE", {
        value: "E1428",
        enumerable: false,
        configurable: true
    });
}
function createLinkMetadataError(route) {
    return Object.defineProperty(new Error(`Route "${route}": Next.js encountered URL data in \`generateMetadata()\`.\n\n` + `This route's metadata is blocked, but the rest of its content can be prefetched. \`params\` or \`searchParams\` accessed in \`generateMetadata()\` prevent it from being prefetched.\n\n` + `Ways to fix this:\n` + `  - [static] Use a static metadata export instead of \`generateMetadata()\`\n` + `  - [dynamic] Render a marker component that calls \`await connection()\` inside \`<Suspense>\` on the page\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-metadata-runtime`), "__NEXT_ERROR_CODE", {
        value: "E1429",
        enumerable: false,
        configurable: true
    });
}
function createRuntimeMetadataError(route) {
    return Object.defineProperty(new Error(`Route "${route}": Next.js encountered runtime data in \`generateMetadata()\`.\n\n` + `This route's metadata is blocked, but the rest of its content can be prerendered. \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` accessed in \`generateMetadata()\` cause it to run dynamically.\n\n` + `Ways to fix this:\n` + `  - [static] Use a static metadata export instead of \`generateMetadata()\`\n` + `  - [dynamic] Render a marker component that calls \`await connection()\` inside \`<Suspense>\` on the page\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-metadata-runtime`), "__NEXT_ERROR_CODE", {
        value: "E1423",
        enumerable: false,
        configurable: true
    });
}
function createDynamicMetadataError(route) {
    return Object.defineProperty(new Error(`Route "${route}": Next.js encountered uncached data in \`generateMetadata()\`.\n\n` + `This route's metadata is blocked, but the rest of its content can be prerendered. \`fetch(...)\` or \`connection()\` accessed in \`generateMetadata()\` cause it to run dynamically.\n\n` + `Ways to fix this:\n` + `  - [cache] Cache the metadata with \`"use cache"\` in \`generateMetadata()\` (does not apply to \`connection()\`)\n` + `  - [dynamic] Render a marker component that calls \`await connection()\` inside \`<Suspense>\` on the page\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-metadata-dynamic`), "__NEXT_ERROR_CODE", {
        value: "E1425",
        enumerable: false,
        configurable: true
    });
}
function createLinkViewportError(route) {
    return Object.defineProperty(new Error(`Route "${route}": Next.js encountered URL data in \`generateViewport()\`.\n\n` + `\`params\` or \`searchParams\` in \`generateViewport()\` prevents the page from being prerendered, leading to a slower user experience.\n\n` + `Ways to fix this:\n` + `  - [static] Use a static viewport export instead of \`generateViewport()\`\n` + `  - [block] Set \`export const instant = false\` to allow a blocking route\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-viewport-runtime`), "__NEXT_ERROR_CODE", {
        value: "E1431",
        enumerable: false,
        configurable: true
    });
}
function createRuntimeViewportError(route) {
    return Object.defineProperty(new Error(`Route "${route}": Next.js encountered runtime data in \`generateViewport()\`.\n\n` + `\`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` in \`generateViewport()\` prevents the page from being prerendered, leading to a slower user experience.\n\n` + `Ways to fix this:\n` + `  - [static] Use a static viewport export instead of \`generateViewport()\`\n` + `  - [block] Set \`export const instant = false\` to allow a blocking route\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-viewport-runtime`), "__NEXT_ERROR_CODE", {
        value: "E1424",
        enumerable: false,
        configurable: true
    });
}
function createDynamicViewportError(route) {
    return Object.defineProperty(new Error(`Route "${route}": Next.js encountered uncached data in \`generateViewport()\`.\n\n` + `\`fetch(...)\` or \`connection()\` in \`generateViewport()\` prevents the page from being prerendered, leading to a slower user experience.\n\n` + `Ways to fix this:\n` + `  - [cache] Cache the viewport data with \`"use cache"\` in \`generateViewport()\` (does not apply to \`connection()\`)\n` + `  - [block] Set \`export const instant = false\` to allow a blocking route\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-viewport-dynamic`), "__NEXT_ERROR_CODE", {
        value: "E1438",
        enumerable: false,
        configurable: true
    });
}
function createDynamicOrRuntimeViewportError(route) {
    return Object.defineProperty(new Error(`Route "${route}": Next.js encountered uncached or runtime data in \`generateViewport()\`.\n\n` + `This prevents the page from being prerendered, leading to a slower user experience. Unlike metadata, viewport cannot be streamed behind \`<Suspense>\` because it affects the initial page load.\n\n` + `Ways to fix this:\n` + `  - [static] Use a static viewport export instead of \`generateViewport()\`\n` + `  - [cache] For uncached data (\`fetch\`, database calls): cache the viewport with \`"use cache"\` in \`generateViewport()\` (does not apply to \`connection()\`)\n` + `  - [block] Set \`export const instant = false\` to allow a blocking route\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-viewport-runtime`), "__NEXT_ERROR_CODE", {
        value: "E1436",
        enumerable: false,
        configurable: true
    });
}
function createDynamicOrRuntimeMetadataError(route) {
    return Object.defineProperty(new Error(`Route "${route}": Next.js encountered uncached or runtime data in \`generateMetadata()\`.\n\n` + `This route's metadata is blocked, but the rest of its content can be prerendered.\n\n` + `Ways to fix this:\n` + `  - [static] Use a static metadata export instead of \`generateMetadata()\`\n` + `  - [cache] Cache the metadata with \`"use cache"\` in \`generateMetadata()\` (does not apply to \`connection()\`)\n` + `  - [dynamic] Render a marker component that calls \`await connection()\` inside \`<Suspense>\` on the page\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-metadata-runtime`), "__NEXT_ERROR_CODE", {
        value: "E1426",
        enumerable: false,
        configurable: true
    });
}
function logBuildDebugHint(route) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DynamicHoleKind",
    ()=>DynamicHoleKind,
    "Postpone",
    ()=>Postpone,
    "PreludeState",
    ()=>PreludeState,
    "abortAndThrowOnSynchronousRequestDataAccess",
    ()=>abortAndThrowOnSynchronousRequestDataAccess,
    "abortOnSynchronousPlatformIOAccess",
    ()=>abortOnSynchronousPlatformIOAccess,
    "accessedDynamicData",
    ()=>accessedDynamicData,
    "annotateDynamicAccess",
    ()=>annotateDynamicAccess,
    "consumeDynamicAccess",
    ()=>consumeDynamicAccess,
    "createDynamicTrackingState",
    ()=>createDynamicTrackingState,
    "createDynamicValidationState",
    ()=>createDynamicValidationState,
    "createHangingInputAbortSignal",
    ()=>createHangingInputAbortSignal,
    "createInstantValidationState",
    ()=>createInstantValidationState,
    "createRenderInBrowserAbortSignal",
    ()=>createRenderInBrowserAbortSignal,
    "formatDynamicAPIAccesses",
    ()=>formatDynamicAPIAccesses,
    "getFirstDynamicReason",
    ()=>getFirstDynamicReason,
    "getNavigationDisallowedDynamicReasons",
    ()=>getNavigationDisallowedDynamicReasons,
    "getStaticShellDisallowedDynamicReasons",
    ()=>getStaticShellDisallowedDynamicReasons,
    "isDynamicPostpone",
    ()=>isDynamicPostpone,
    "isPrerenderInterruptedError",
    ()=>isPrerenderInterruptedError,
    "logDisallowedDynamicError",
    ()=>logDisallowedDynamicError,
    "markCurrentScopeAsDynamic",
    ()=>markCurrentScopeAsDynamic,
    "postponeWithTracking",
    ()=>postponeWithTracking,
    "throwIfDisallowedDynamic",
    ()=>throwIfDisallowedDynamic,
    "throwIfSyncIOUsed",
    ()=>throwIfSyncIOUsed,
    "throwToInterruptStaticGeneration",
    ()=>throwToInterruptStaticGeneration,
    "trackAllowedDynamicAccess",
    ()=>trackAllowedDynamicAccess,
    "trackDynamicDataInDynamicRender",
    ()=>trackDynamicDataInDynamicRender,
    "trackDynamicHoleInNavigation",
    ()=>trackDynamicHoleInNavigation,
    "trackDynamicHoleInRuntimeShell",
    ()=>trackDynamicHoleInRuntimeShell,
    "trackDynamicHoleInStaticShell",
    ()=>trackDynamicHoleInStaticShell,
    "trackThrownErrorInNavigation",
    ()=>trackThrownErrorInNavigation,
    "useDynamicRouteParams",
    ()=>useDynamicRouteParams,
    "useDynamicSearchParams",
    ()=>useDynamicSearchParams
]);
/**
 * The functions provided by this module are used to communicate certain properties
 * about the currently running code so that Next.js can make decisions on how to handle
 * the current execution in different rendering modes such as pre-rendering, resuming, and SSR.
 *
 * Today Next.js treats all code as potentially static. Certain APIs may only make sense when dynamically rendering.
 * Traditionally this meant deopting the entire render to dynamic however with PPR we can now deopt parts
 * of a React tree as dynamic while still keeping other parts static. There are really two different kinds of
 * Dynamic indications.
 *
 * The first is simply an intention to be dynamic. unstable_noStore is an example of this where
 * the currently executing code simply declares that the current scope is dynamic but if you use it
 * inside unstable_cache it can still be cached. This type of indication can be removed if we ever
 * make the default dynamic to begin with because the only way you would ever be static is inside
 * a cache scope which this indication does not affect.
 *
 * The second is an indication that a dynamic data source was read. This is a stronger form of dynamic
 * because it means that it is inappropriate to cache this at all. using a dynamic data source inside
 * unstable_cache should error. If you want to use some dynamic data inside unstable_cache you should
 * read that data outside the cache and pass it in as an argument to the cached function.
 */ // Once postpone is in stable we should switch to importing the postpone export directly
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/client/components/hooks-server-context.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/client/components/static-generation-bailout.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/dynamic-rendering-utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$framework$2f$boundary$2d$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/framework/boundary-constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/lib/scheduler.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$lazy$2d$dynamic$2f$bailout$2d$to$2d$csr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/blocking-route-messages.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$boundary$2d$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/instant-validation/boundary-constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$boundary$2d$tracking$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/instant-validation/boundary-tracking.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$instant$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/instant-messages.js [app-ssr] (ecmascript)");
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
const hasPostpone = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].unstable_postpone === 'function';
function createDynamicTrackingState(isDebugDynamicAccesses) {
    return {
        isDebugDynamicAccesses,
        dynamicAccesses: [],
        syncDynamicErrorWithStack: null,
        syncDynamicErrorWithStackPostMicrotask: false
    };
}
function createDynamicValidationState() {
    return {
        hasSuspenseAboveBody: false,
        hasDynamicMetadata: false,
        dynamicMetadata: null,
        hasDynamicViewport: false,
        hasAllowedDynamic: false,
        dynamicErrors: []
    };
}
function getPendingClientSyncDynamicError(clientDynamic) {
    return clientDynamic.syncDynamicErrorWithStackPostMicrotask ? null : clientDynamic.syncDynamicErrorWithStack;
}
function getFirstDynamicReason(trackingState) {
    var _trackingState_dynamicAccesses_;
    return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? void 0 : _trackingState_dynamicAccesses_.expression;
}
function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'cache':
            case 'unstable-cache':
                // Inside cache scopes, marking a scope as dynamic has no effect,
                // because the outer cache scope creates a cache boundary. This is
                // subtly different from reading a dynamic data source, which is
                // forbidden inside a cache scope.
                return;
            case 'private-cache':
                // A private cache scope is already dynamic by definition.
                return;
            case 'prerender-legacy':
            case 'prerender-ppr':
            case 'request':
            case 'generate-static-params':
                break;
            default:
                workUnitStore;
        }
    }
    // If we're forcing dynamic rendering or we're forcing static rendering, we
    // don't need to do anything here because the entire page is already dynamic
    // or it's static and it should not throw or postpone here.
    if (store.forceDynamic || store.forceStatic) return;
    if (store.dynamicShouldError) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: false,
            configurable: true
        });
    }
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender-ppr':
                return postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
            case 'prerender-legacy':
                workUnitStore.revalidate = 0;
                // We aren't prerendering, but we are generating a static page. We need
                // to bail out of static generation.
                const err = Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DynamicServerError"](`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                    value: "E550",
                    enumerable: false,
                    configurable: true
                });
                store.dynamicUsageDescription = expression;
                store.dynamicUsageStack = err.stack;
                throw err;
            case 'request':
                if ("TURBOPACK compile-time truthy", 1) {
                    workUnitStore.usedDynamic = true;
                }
                break;
            case 'generate-static-params':
                break;
            default:
                workUnitStore;
        }
    }
}
function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
    // We aren't prerendering but we are generating a static page. We need to bail out of static generation
    const err = Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DynamicServerError"](`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: false,
        configurable: true
    });
    prerenderStore.revalidate = 0;
    store.dynamicUsageDescription = expression;
    store.dynamicUsageStack = err.stack;
    throw err;
}
function trackDynamicDataInDynamicRender(workUnitStore) {
    switch(workUnitStore.type){
        case 'cache':
        case 'unstable-cache':
            // Inside cache scopes, marking a scope as dynamic has no effect,
            // because the outer cache scope creates a cache boundary. This is
            // subtly different from reading a dynamic data source, which is
            // forbidden inside a cache scope.
            return;
        case 'private-cache':
            // A private cache scope is already dynamic by definition.
            return;
        case 'prerender':
        case 'prerender-runtime':
        case 'prerender-legacy':
        case 'prerender-ppr':
        case 'prerender-client':
        case 'validation-client':
        case 'generate-static-params':
            break;
        case 'request':
            if ("TURBOPACK compile-time truthy", 1) {
                workUnitStore.usedDynamic = true;
            }
            break;
        default:
            workUnitStore;
    }
}
function abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore) {
    const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`;
    const error = createPrerenderInterruptedError(reason);
    prerenderStore.controller.abort(error);
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function abortOnSynchronousPlatformIOAccess(route, expression, errorWithStack, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking && dynamicTracking.syncDynamicErrorWithStack === null) {
        dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
        // React completes the task that is currently rendering before scheduled
        // abort cleanup. Client tracking can attribute the sync IO only during
        // that current task; server tracking keeps the error regardless.
        queueMicrotask(()=>{
            dynamicTracking.syncDynamicErrorWithStackPostMicrotask = true;
        });
    }
    abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
}
function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
    // The synchronously accessed request data would have been available during
    // a runtime prerender, which would have rendered past this point instead of
    // aborting — so a runtime prefetch would produce more content than this
    // render. Record that, same as when request data access creates a hanging
    // promise (see makeRuntimeHangingPromise). Unlike
    // `abortOnSynchronousPlatformIOAccess`, which aborts a runtime prerender
    // all the same and therefore must not record anything.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackRuntimeDataAccessed"])(prerenderStore);
    const prerenderSignal = prerenderStore.controller.signal;
    if (prerenderSignal.aborted === false) {
        // TODO it would be better to move this aborted check into the callsite so we can avoid making
        // the error object when it isn't relevant to the aborting of the prerender however
        // since we need the throw semantics regardless of whether we abort it is easier to land
        // this way. See how this was handled with `abortOnSynchronousPlatformIOAccess` for a closer
        // to ideal implementation
        abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
        // Preserve the exact server-side dynamic access for final validation after
        // interrupting this render.
        const dynamicTracking = prerenderStore.dynamicTracking;
        if (dynamicTracking) {
            if (dynamicTracking.syncDynamicErrorWithStack === null) {
                dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
            }
        }
    }
    throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
}
function Postpone({ reason, route }) {
    const prerenderStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    const dynamicTracking = prerenderStore && prerenderStore.type === 'prerender-ppr' ? prerenderStore.dynamicTracking : null;
    postponeWithTracking(route, reason, dynamicTracking);
}
function postponeWithTracking(route, expression, dynamicTracking) {
    assertPostpone();
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].unstable_postpone(createPostponeReason(route, expression));
}
function createPostponeReason(route, expression) {
    return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. ` + `React throws this special object to indicate where. It should not be caught by ` + `your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
}
function isDynamicPostpone(err) {
    if (typeof err === 'object' && err !== null && typeof err.message === 'string') {
        return isDynamicPostponeReason(err.message);
    }
    return false;
}
function isDynamicPostponeReason(reason) {
    return reason.includes('needs to bail out of prerendering at this point because it used') && reason.includes('Learn more: https://nextjs.org/docs/messages/ppr-caught-error');
}
if (isDynamicPostponeReason(createPostponeReason('%%%', '^^^')) === false) {
    throw Object.defineProperty(new Error('Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js'), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: false,
        configurable: true
    });
}
const NEXT_PRERENDER_INTERRUPTED = 'NEXT_PRERENDER_INTERRUPTED';
function createPrerenderInterruptedError(message) {
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = NEXT_PRERENDER_INTERRUPTED;
    return error;
}
function isPrerenderInterruptedError(error) {
    return typeof error === 'object' && error !== null && error.digest === NEXT_PRERENDER_INTERRUPTED && 'name' in error && 'message' in error && error instanceof Error;
}
function accessedDynamicData(dynamicAccesses) {
    return dynamicAccesses.length > 0;
}
function consumeDynamicAccess(serverDynamic, clientDynamic) {
    // We mutate because we only call this once we are no longer writing
    // to the dynamicTrackingState and it's more efficient than creating a new
    // array.
    serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
    return serverDynamic.dynamicAccesses;
}
function formatDynamicAPIAccesses(dynamicAccesses) {
    return dynamicAccesses.filter((access)=>typeof access.stack === 'string' && access.stack.length > 0).map(({ expression, stack })=>{
        stack = stack.split('\n') // Remove the "Error: " prefix from the first line of the stack trace as
        // well as the first 4 lines of the stack trace which is the distance
        // from the user code and the `new Error().stack` call.
        .slice(4).filter((line)=>{
            // Exclude Next.js internals from the stack trace.
            if (line.includes('node_modules/next/')) {
                return false;
            }
            // Exclude anonymous functions from the stack trace.
            if (line.includes(' (<anonymous>)')) {
                return false;
            }
            // Exclude Node.js internals from the stack trace.
            if (line.includes(' (node:')) {
                return false;
            }
            return true;
        }).join('\n');
        return `Dynamic API Usage Debug - ${expression}:\n${stack}`;
    });
}
function assertPostpone() {
    if (!hasPostpone) {
        throw Object.defineProperty(new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
            value: "E224",
            enumerable: false,
            configurable: true
        });
    }
}
function createRenderInBrowserAbortSignal() {
    const controller = new AbortController();
    controller.abort(Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$lazy$2d$dynamic$2f$bailout$2d$to$2d$csr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BailoutToCSRError"]('Render in Browser'), "__NEXT_ERROR_CODE", {
        value: "E721",
        enumerable: false,
        configurable: true
    }));
    return controller.signal;
}
function createHangingInputAbortSignal(workUnitStore) {
    switch(workUnitStore.type){
        case 'prerender':
        case 'prerender-runtime':
            const controller = new AbortController();
            if (workUnitStore.cacheSignal) {
                // If we have a cacheSignal it means we're in a prospective render. If
                // the input we're waiting on is coming from another cache, we do want
                // to wait for it so that we can resolve this cache entry too.
                workUnitStore.cacheSignal.inputReady().then(()=>{
                    controller.abort();
                });
            } else {
                // Otherwise we're in the final render and we should already have all
                // our caches filled.
                // If the prerender uses stages, we have wait until the final stage.
                // if an input didn't resolve at that point, then we can assume it never will.
                //
                // We might still be waiting on some microtasks so we
                // wait one tick before giving up. When we give up, we still want to
                // render the content of this cache as deeply as we can so that we can
                // suspend as deeply as possible in the tree or not at all if we don't
                // end up waiting for the input.
                const stagedRendering = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["getStagedRenderingController"])(workUnitStore);
                if (stagedRendering && stagedRendering.finalStage !== null) {
                    stagedRendering.waitForStage(stagedRendering.finalStage).then(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scheduleOnNextTick"])(()=>controller.abort()), noop);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scheduleOnNextTick"])(()=>controller.abort());
                }
            }
            return controller.signal;
        case 'prerender-client':
        case 'validation-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'request':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
        case 'generate-static-params':
            return undefined;
        default:
            workUnitStore;
    }
}
function noop() {}
function annotateDynamicAccess(expression, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function useDynamicRouteParams(expression) {
    const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
    const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    if (workStore && workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender-client':
                {
                    const fallbackParams = workUnitStore.fallbackRouteParams;
                    if (fallbackParams && fallbackParams.size > 0) {
                        // We are in a prerender with cacheComponents semantics. We are going to
                        // hang here and never resolve. This will cause the currently
                        // rendering component to effectively be a dynamic hole.
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeClientHookHangingPromise"])(workUnitStore.renderSignal, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClientHookDynamicError"](workStore.route, expression)));
                    }
                    break;
                }
            case 'prerender':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"](`\`${expression}\` was called from a Server Component. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E795",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-ppr':
                {
                    const fallbackParams = workUnitStore.fallbackRouteParams;
                    if (fallbackParams && fallbackParams.size > 0) {
                        return postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
                    }
                    break;
                }
            case 'validation-client':
                {
                    break;
                }
            case 'prerender-runtime':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"](`\`${expression}\` was called during a runtime prerender. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E771",
                    enumerable: false,
                    configurable: true
                });
            case 'cache':
            case 'private-cache':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"](`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E745",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"](`\`${expression}\` was called in \`generateStaticParams\`. Next.js should be preventing ${expression} from being included in server component files statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E1130",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-legacy':
            case 'request':
            case 'unstable-cache':
                break;
            default:
                workUnitStore;
        }
    }
}
function useDynamicSearchParams(expression) {
    const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
    const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    if (!workStore) {
        // We assume pages router context and just return
        return;
    }
    if (!workUnitStore) {
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["throwForMissingRequestStore"])(expression);
    }
    switch(workUnitStore.type){
        case 'validation-client':
            // During instant validation we try to behave as close to client as possible,
            // so this shouldn't hang during SSR.
            return;
        case 'prerender-client':
            {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeClientHookHangingPromise"])(workUnitStore.renderSignal, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClientHookDynamicError"](workStore.route, expression)));
                break;
            }
        case 'prerender-legacy':
        case 'prerender-ppr':
            {
                if (workStore.forceStatic) {
                    return;
                }
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$lazy$2d$dynamic$2f$bailout$2d$to$2d$csr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BailoutToCSRError"](expression), "__NEXT_ERROR_CODE", {
                    value: "E394",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'prerender':
        case 'prerender-runtime':
            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"](`\`${expression}\` was called from a Server Component. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E795",
                enumerable: false,
                configurable: true
            });
        case 'cache':
        case 'unstable-cache':
        case 'private-cache':
            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"](`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E745",
                enumerable: false,
                configurable: true
            });
        case 'generate-static-params':
            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"](`\`${expression}\` was called in \`generateStaticParams\`. Next.js should be preventing ${expression} from being included in server component files statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E1130",
                enumerable: false,
                configurable: true
            });
        case 'request':
            return;
        default:
            workUnitStore;
    }
}
const hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
// Common implicit body tags that React will treat as body when placed directly in html
const bodyAndImplicitTags = 'body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6';
// Detects when RootLayoutBoundary (our framework marker component) appears
// after Suspense in the component stack, indicating the root layout is wrapped
// within a Suspense boundary. Ensures no body/html/implicit-body components are in between.
//
// Example matches:
//   at Suspense (<anonymous>)
//   at __next_root_layout_boundary__ (<anonymous>)
//
// Or with other components in between (but not body/html/implicit-body):
//   at Suspense (<anonymous>)
//   at SomeComponent (<anonymous>)
//   at __next_root_layout_boundary__ (<anonymous>)
const hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex = new RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:${bodyAndImplicitTags}) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$framework$2f$boundary$2d$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROOT_LAYOUT_BOUNDARY_NAME"]} \\([^\\n]*\\)`);
const hasMetadataRegex = new RegExp(`\\n\\s+at ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$framework$2f$boundary$2d$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["METADATA_BOUNDARY_NAME"]}[\\n\\s]`);
const hasViewportRegex = new RegExp(`\\n\\s+at ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$framework$2f$boundary$2d$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VIEWPORT_BOUNDARY_NAME"]}[\\n\\s]`);
const hasOutletRegex = new RegExp(`\\n\\s+at ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$framework$2f$boundary$2d$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OUTLET_BOUNDARY_NAME"]}[\\n\\s]`);
const hasInstantValidationBoundaryRegex = new RegExp(`\\n\\s+at ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$boundary$2d$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INSTANT_VALIDATION_BOUNDARY_NAME"]}[\\n\\s]`);
const slotMarkerRegex = new RegExp(`\\n\\s+at ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$boundary$2d$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INSTANT_SLOT_MARKER_PREFIX"]}(\\d+)${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$boundary$2d$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INSTANT_SLOT_MARKER_SUFFIX"]}[\\n\\s]`);
/** Look up the config factory for the slot this error belongs to.
 * Checks the component stack for a slot marker (__next_instant_slot_N__)
 * and returns the config at that index. Falls back to index 0 (root
 * config) when no slot marker is found or the slot has no config. */ function resolveInstantStack(componentStack, dynamicValidation) {
    const { slotStacks } = dynamicValidation;
    if (slotStacks.length > 1) {
        const match = slotMarkerRegex.exec(componentStack);
        if (match) {
            // Slot markers are 0-indexed in the component name but
            // slotStacks is 1-indexed (index 0 is the root config).
            const slotIndex = parseInt(match[1], 10) + 1;
            const slotStack = slotStacks[slotIndex];
            if (slotStack != null) {
                return slotStack;
            }
        }
    }
    // Fall back to root config (index 0)
    return slotStacks[0] ?? null;
}
/**
 * Inspects the component stack of an outlet boundary to discover whether the
 * user placed a Suspense boundary above the document body, and records the
 * opt-in on `dynamicValidation.hasSuspenseAboveBody` if so.
 *
 * The outlet itself isn't a meaningful source of dynamic — it only resolves
 * when metadata/viewport are dynamic, which we track via their own boundaries.
 * However, the outlet renders alongside the page content, so its stack passes
 * through the user's layout chain (typically reaching into `<body>` via the
 * root layout). That makes the outlet stack our best opportunity to spot a
 * Suspense boundary above the body, even when no real body content is dynamic.
 * Without this, a route whose only dynamic source is `generateViewport()` would
 * miss the Suspense-above-body opt-in, because the viewport's stack lives in
 * the head and never sees the user's root layout.
 *
 * We deliberately only set `hasSuspenseAboveBody`, not `hasAllowedDynamic`. The
 * latter tracks whether the body has dynamic content that's been wrapped in
 * Suspense (i.e., the page is partially dynamic). The outlet rendering tells us
 * about the structural opt-in for an empty shell, not about the body being
 * partially dynamic. The distinction matters because dynamic metadata is only
 * acceptable when the page is partially dynamic (via real body holes), and we
 * don't want this outlet-based detection to mask that case.
 */ function trackOutletSuspenseAboveBody(componentStack, dynamicValidation) {
    if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
        dynamicValidation.hasSuspenseAboveBody = true;
    }
}
function trackAllowedDynamicAccess(dynamicReason, workStore, componentStack, dynamicValidation, clientDynamic) {
    const syncDynamicError = getPendingClientSyncDynamicError(clientDynamic);
    if (hasOutletRegex.test(componentStack)) {
        trackOutletSuspenseAboveBody(componentStack, dynamicValidation);
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        dynamicValidation.hasDynamicMetadata = true;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        dynamicValidation.hasDynamicViewport = true;
        return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
        // For Suspense within body, the prelude wouldn't be empty so it wouldn't violate the empty static shells rule.
        // But if you have Suspense above body, the prelude is empty but we allow that because having Suspense
        // is an explicit signal from the user that they acknowledge the empty shell and want dynamic rendering.
        dynamicValidation.hasAllowedDynamic = true;
        dynamicValidation.hasSuspenseAboveBody = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        // this error had a Suspense boundary above it so we don't need to report it as a source
        // of disallowed
        dynamicValidation.hasAllowedDynamic = true;
        return;
    } else if (syncDynamicError) {
        dynamicValidation.dynamicErrors.push(syncDynamicError);
        return;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isClientHookDynamicError"])(dynamicReason)) {
        dynamicValidation.dynamicErrors.push(addErrorContext(dynamicReason, componentStack, null));
        return;
    }
    const error = addErrorContext((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDynamicOrRuntimeBodyError"])(workStore.route), componentStack, null);
    dynamicValidation.dynamicErrors.push(error);
    return;
}
var DynamicHoleKind = /*#__PURE__*/ function(DynamicHoleKind) {
    /** We know that this hole is caused by link data. */ DynamicHoleKind[DynamicHoleKind["Link"] = 1] = "Link";
    /** We know that this hole is caused by runtime data. */ DynamicHoleKind[DynamicHoleKind["Runtime"] = 2] = "Runtime";
    /** We know that this hole is caused by dynamic data. */ DynamicHoleKind[DynamicHoleKind["Dynamic"] = 3] = "Dynamic";
    return DynamicHoleKind;
}({});
function createInstantValidationState(slotStacks) {
    return {
        hasDynamicMetadata: false,
        hasAllowedClientDynamicAboveBoundary: false,
        dynamicMetadata: null,
        hasDynamicViewport: false,
        hasAllowedDynamic: false,
        dynamicErrors: [],
        validationPreventingErrors: [],
        thrownErrorsOutsideBoundary: [],
        slotStacks
    };
}
function trackDynamicHoleInNavigation(dynamicReason, workStore, componentStack, dynamicValidation, clientDynamic, kind, boundaryState) {
    const syncDynamicError = getPendingClientSyncDynamicError(clientDynamic);
    if (hasOutletRegex.test(componentStack)) {
        // We don't need to track that this is dynamic. It is only so when something else is also dynamic.
        return;
    }
    // Resolve the config stack for this specific error. If the error
    // is inside a slot marker, use that slot's config. Otherwise fall
    // back to the default.
    const effectiveCreateInstantStack = resolveInstantStack(componentStack, dynamicValidation);
    if (hasMetadataRegex.test(componentStack)) {
        const error = addErrorContext(kind === 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLinkMetadataError"])(workStore.route) : kind === 2 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRuntimeMetadataError"])(workStore.route) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDynamicMetadataError"])(workStore.route), componentStack, effectiveCreateInstantStack);
        dynamicValidation.dynamicMetadata = error;
        return;
    }
    if (hasViewportRegex.test(componentStack)) {
        const error = addErrorContext(kind === 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLinkViewportError"])(workStore.route) : kind === 2 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRuntimeViewportError"])(workStore.route) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDynamicViewportError"])(workStore.route), componentStack, effectiveCreateInstantStack);
        dynamicValidation.dynamicErrors.push(error);
        return;
    }
    const boundaryLocation = hasInstantValidationBoundaryRegex.exec(componentStack);
    if (!boundaryLocation) {
        // We don't see the validation boundary in the component stack,
        // so this hole must be coming from a shared parent.
        // Shared parents are fully resolved and don't have RSC holes,
        // but they can still suspend in a client component during SSR.
        // If we managed to render all the validation boundaries, that means
        // that the client holes aren't blocking validation and we can disregard them.
        // Note that we don't even care whether they have suspense or not.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$boundary$2d$tracking$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allRequiredBoundariesRendered"])(boundaryState)) {
            dynamicValidation.hasAllowedClientDynamicAboveBoundary = true;
            dynamicValidation.hasAllowedDynamic = true // Holes outside the boundary contribute to allowing dynamic metadata
            ;
            return;
        } else {
            // TODO(instant-validation) TODO(NAR-787)
            // If shared parents blocked us from validating, we should only log
            // the errors from the innermost (segments), i.e. omit layouts whose
            // slots managed to render (because clearly they didn't block validation)
            const message = `Route "${workStore.route}": Could not validate \`instant\` because a Client Component in a parent segment prevented the page from rendering.`;
            const error = addErrorContext(Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E1331",
                enumerable: false,
                configurable: true
            }), componentStack, effectiveCreateInstantStack);
            dynamicValidation.validationPreventingErrors.push(error);
            return;
        }
    } else {
        // The hole originates inside the validation boundary.
        //
        // Check if we have a Suspense above the hole, but below the validation boundary.
        // If we do, then this dynamic usage wouldn't block a navigation to this subtree.
        // Conversely, if the nearest suspense is above the validation boundary, then this subtree would block.
        //
        // Note that in the component stack, children come before parents.
        //
        // Valid:
        //   ...
        //   at Suspense
        //   ...
        //   at __next_prefetch_validation_boundary__
        //
        // Invalid:
        //   ...
        //   at __next_prefetch_validation_boundary__
        //   ...
        //   at Suspense
        //
        const suspenseLocation = hasSuspenseRegex.exec(componentStack);
        if (suspenseLocation) {
            if (suspenseLocation.index < boundaryLocation.index) {
                dynamicValidation.hasAllowedDynamic = true;
                return;
            } else {
            // invalid - fallthrough
            }
        }
    }
    if (syncDynamicError) {
        if (effectiveCreateInstantStack !== null && syncDynamicError.cause === undefined) {
            syncDynamicError.cause = effectiveCreateInstantStack();
        }
        dynamicValidation.dynamicErrors.push(syncDynamicError);
        return;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isClientHookDynamicError"])(dynamicReason)) {
        dynamicValidation.dynamicErrors.push(addErrorContext(dynamicReason, componentStack, effectiveCreateInstantStack));
        return;
    }
    const error = addErrorContext(kind === 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLinkBodyErrorInNavigation"])(workStore.route) : kind === 2 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRuntimeBodyErrorInNavigation"])(workStore.route) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDynamicBodyErrorInNavigation"])(workStore.route), componentStack, effectiveCreateInstantStack);
    dynamicValidation.dynamicErrors.push(error);
    return;
}
function trackThrownErrorInNavigation(workStore, dynamicValidation, thrownValue, componentStack) {
    const boundaryLocation = hasInstantValidationBoundaryRegex.exec(componentStack);
    if (!boundaryLocation) {
        // There's no validation boundary on the component stack.
        // This error may have blocked a boundary from rendering.
        // Wrap the error to provide component context.
        // This helps for errors from node_modules which would otherwise
        // have no useful stack information due to ignore-listing,
        // e.g. next/dynamic with `ssr: false`.
        const error = addErrorContext(Object.defineProperty(new Error('An error occurred while attempting to validate instant UI. This error may be preventing the validation from completing.', {
            cause: thrownValue
        }), "__NEXT_ERROR_CODE", {
            value: "E1118",
            enumerable: false,
            configurable: true
        }), componentStack, null);
        dynamicValidation.thrownErrorsOutsideBoundary.push(error);
    } else {
        // There's validation boundary on the component stack,
        // so we know this error didn't block a validation boundary from rendering.
        // However, this error might be hiding be hiding dynamic content that would
        // cause validation to fail.
        const suspenseLocation = hasSuspenseRegex.exec(componentStack);
        if (suspenseLocation) {
            if (suspenseLocation.index < boundaryLocation.index) {
                // There's a Suspense below the validation boundary but above this error's location.
                // This subtree can't fail instant validation because any potential
                // dynamic holes would be guarded by the Suspense anyway,
                // so we can allow this.
                return;
            } else {
            // invalid - fallthrough
            }
        }
        const message = `Route "${workStore.route}": Could not validate \`instant\` because an error prevented the target segment from rendering.`;
        const error = addErrorContext(Object.defineProperty(new Error(message, {
            cause: thrownValue
        }), "__NEXT_ERROR_CODE", {
            value: "E1338",
            enumerable: false,
            configurable: true
        }), componentStack, null // TODO(instant-validation-build): conflicting use of cause
        );
        dynamicValidation.validationPreventingErrors.push(error);
    }
}
function trackDynamicHoleInRuntimeShell(dynamicReason, workStore, componentStack, dynamicValidation, clientDynamic) {
    const syncDynamicError = getPendingClientSyncDynamicError(clientDynamic);
    if (hasOutletRegex.test(componentStack)) {
        trackOutletSuspenseAboveBody(componentStack, dynamicValidation);
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        const error = addErrorContext((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDynamicMetadataError"])(workStore.route), componentStack, null);
        dynamicValidation.dynamicMetadata = error;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        const error = addErrorContext((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDynamicViewportError"])(workStore.route), componentStack, null);
        dynamicValidation.dynamicErrors.push(error);
        return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
        // For Suspense within body, the prelude wouldn't be empty so it wouldn't violate the empty static shells rule.
        // But if you have Suspense above body, the prelude is empty but we allow that because having Suspense
        // is an explicit signal from the user that they acknowledge the empty shell and want dynamic rendering.
        dynamicValidation.hasAllowedDynamic = true;
        dynamicValidation.hasSuspenseAboveBody = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        // this error had a Suspense boundary above it so we don't need to report it as a source
        // of disallowed
        dynamicValidation.hasAllowedDynamic = true;
        return;
    } else if (syncDynamicError) {
        dynamicValidation.dynamicErrors.push(syncDynamicError);
        return;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isClientHookDynamicError"])(dynamicReason)) {
        dynamicValidation.dynamicErrors.push(addErrorContext(dynamicReason, componentStack, null));
        return;
    }
    const error = addErrorContext((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDynamicBodyError"])(workStore.route), componentStack, null);
    dynamicValidation.dynamicErrors.push(error);
    return;
}
function trackDynamicHoleInStaticShell(dynamicReason, workStore, componentStack, dynamicValidation, clientDynamic) {
    const syncDynamicError = getPendingClientSyncDynamicError(clientDynamic);
    if (hasOutletRegex.test(componentStack)) {
        trackOutletSuspenseAboveBody(componentStack, dynamicValidation);
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        const error = addErrorContext((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRuntimeMetadataError"])(workStore.route), componentStack, null);
        dynamicValidation.dynamicMetadata = error;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        const error = addErrorContext((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRuntimeViewportError"])(workStore.route), componentStack, null);
        dynamicValidation.dynamicErrors.push(error);
        return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
        // For Suspense within body, the prelude wouldn't be empty so it wouldn't violate the empty static shells rule.
        // But if you have Suspense above body, the prelude is empty but we allow that because having Suspense
        // is an explicit signal from the user that they acknowledge the empty shell and want dynamic rendering.
        dynamicValidation.hasAllowedDynamic = true;
        dynamicValidation.hasSuspenseAboveBody = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        // this error had a Suspense boundary above it so we don't need to report it as a source
        // of disallowed
        dynamicValidation.hasAllowedDynamic = true;
        return;
    } else if (syncDynamicError) {
        dynamicValidation.dynamicErrors.push(syncDynamicError);
        return;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isClientHookDynamicError"])(dynamicReason)) {
        dynamicValidation.dynamicErrors.push(addErrorContext(dynamicReason, componentStack, null));
        return;
    }
    const error = addErrorContext((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRuntimeBodyError"])(workStore.route), componentStack, null);
    dynamicValidation.dynamicErrors.push(error);
    return;
}
/**
 * In dev mode, we prefer using the owner stack, otherwise the provided
 * component stack is used.
 *
 * Accepts an already-created Error so the SWC error-code plugin can see the
 * `new Error(...)` call at each call site and auto-assign error codes.
 */ function addErrorContext(error, componentStack, createInstantStack) {
    const ownerStack = ("TURBOPACK compile-time value", "development") !== 'production' && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].captureOwnerStack ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].captureOwnerStack() : null;
    if (createInstantStack !== null) {
        error.cause = createInstantStack();
    }
    // TODO go back to owner stack here if available. This is temporarily using componentStack to get the right
    //
    error.stack = error.name + ': ' + error.message + (ownerStack || componentStack);
    return error;
}
var PreludeState = /*#__PURE__*/ function(PreludeState) {
    PreludeState[PreludeState["Full"] = 0] = "Full";
    PreludeState[PreludeState["Empty"] = 1] = "Empty";
    PreludeState[PreludeState["Errored"] = 2] = "Errored";
    return PreludeState;
}({});
function logDisallowedDynamicError(workStore, error) {
    console.error(error);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logBuildDebugHint"])(workStore.route);
}
function throwIfSyncIOUsed(workStore, serverDynamic) {
    if (serverDynamic.syncDynamicErrorWithStack) {
        logDisallowedDynamicError(workStore, serverDynamic.syncDynamicErrorWithStack);
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StaticGenBailoutError"]();
    }
}
function throwIfDisallowedDynamic(workStore, prelude, dynamicValidation, serverDynamic, allowEmptyStaticShell) {
    throwIfSyncIOUsed(workStore, serverDynamic);
    // The dynamic metadata error is a mistake-detection signal. It fires when the
    // rest of the shell is otherwise fully static apart from metadata, suggesting
    // the dynamic data access in `generateMetadata` was probably unintentional.
    // That condition is independent of whether the user or build phase accepted
    // an empty shell, so we surface it before any opt-in bypass.
    if (prelude === 0 && dynamicValidation.hasAllowedDynamic === false && dynamicValidation.hasDynamicMetadata) {
        console.error((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDynamicOrRuntimeMetadataError"])(workStore.route).message);
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StaticGenBailoutError"]();
    }
    // Either flag expresses "this shell is allowed to be empty/blocking":
    //   - `allowEmptyStaticShell` covers `instant = false` (user opt-in)
    //     and the build-phase fallback-shell case.
    //   - `hasSuspenseAboveBody` is the structural opt-in inside the user's root
    //     layout.
    // Treat them as synonyms for the purpose of bypassing shell-failure errors.
    if (allowEmptyStaticShell || dynamicValidation.hasSuspenseAboveBody) {
        return;
    }
    if (prelude !== 0) {
        // We didn't have any sync bailouts but there may be user code which
        // blocked the root. We would have captured these during the prerender
        // and can log them here and then terminate the build/validating render
        const dynamicErrors = dynamicValidation.dynamicErrors;
        if (dynamicErrors.length > 0) {
            for(let i = 0; i < dynamicErrors.length; i++){
                logDisallowedDynamicError(workStore, dynamicErrors[i]);
            }
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StaticGenBailoutError"]();
        }
        // If we got this far then the only other thing that could be blocking
        // the root is dynamic Viewport. If this is dynamic then
        // you need to opt into that by adding a Suspense boundary above the body
        // to indicate your are ok with fully dynamic rendering.
        if (dynamicValidation.hasDynamicViewport) {
            console.error((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$blocking$2d$route$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDynamicOrRuntimeViewportError"])(workStore.route).message);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StaticGenBailoutError"]();
        }
        if (prelude === 1) {
            // If we ever get this far then we messed up the tracking of invalid dynamic.
            // We still adhere to the constraint that you must produce a shell but invite the
            // user to report this as a bug in Next.js.
            console.error(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StaticGenBailoutError"]();
        }
    }
}
function getStaticShellDisallowedDynamicReasons(workStore, prelude, dynamicValidation, allowEmptyStaticShell) {
    // The dynamic metadata error is a mistake-detection signal. It fires when the
    // rest of the shell is otherwise fully static apart from metadata, suggesting
    // the dynamic data access in `generateMetadata` was probably unintentional.
    // That condition is independent of whether the user or build phase accepted
    // an empty shell, so we surface it before any opt-in bypass.
    if (prelude === 0 && dynamicValidation.hasAllowedDynamic === false && dynamicValidation.dynamicErrors.length === 0 && dynamicValidation.dynamicMetadata) {
        return [
            dynamicValidation.dynamicMetadata
        ];
    }
    // Either flag expresses "this shell is allowed to be empty/blocking":
    //   - `allowEmptyStaticShell` covers `instant = false` (user opt-in)
    //     and the build-phase fallback-shell case.
    //   - `hasSuspenseAboveBody` is the structural opt-in inside the user's root
    //     layout.
    // Treat them as synonyms for the purpose of bypassing shell-failure errors.
    if (allowEmptyStaticShell || dynamicValidation.hasSuspenseAboveBody) {
        return [];
    }
    if (prelude !== 0) {
        // We didn't have any sync bailouts but there may be user code which
        // blocked the root. We would have captured these during the prerender
        // and can log them here and then terminate the build/validating render
        const dynamicErrors = dynamicValidation.dynamicErrors;
        if (dynamicErrors.length > 0) {
            return dynamicErrors;
        }
        if (prelude === 1) {
            // If we ever get this far then we messed up the tracking of invalid dynamic.
            // We still adhere to the constraint that you must produce a shell but invite the
            // user to report this as a bug in Next.js.
            return [
                Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"](`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason.`), "__NEXT_ERROR_CODE", {
                    value: "E936",
                    enumerable: false,
                    configurable: true
                })
            ];
        }
    }
    // We had a non-empty prelude and there are no dynamic holes
    return [];
}
function getNavigationDisallowedDynamicReasons(workStore, prelude, dynamicValidation, validationSampleTracking, boundaryState, devRenderDidError) {
    // If we have errors related to missing samples, those should take precedence over everything else.
    if (validationSampleTracking) {
        const { missingSampleErrors } = validationSampleTracking;
        if (missingSampleErrors.length > 0) {
            return missingSampleErrors;
        }
    }
    const { validationPreventingErrors } = dynamicValidation;
    if (validationPreventingErrors.length > 0) {
        if (("TURBOPACK compile-time value", "1") && devRenderDidError) {
            // The dev render already surfaced server errors to the user.
            // The same errors likely caused validation to be inconclusive,
            // so reporting them again as validation failures would be noisy.
            return [];
        }
        return validationPreventingErrors;
    }
    // NOTE: We don't care about Suspense above body here,
    // we're only concerned with the validation boundary
    if (prelude !== 0) {
        const dynamicErrors = dynamicValidation.dynamicErrors;
        if (dynamicErrors.length > 0) {
            return dynamicErrors;
        }
        if (prelude === 1 && !dynamicValidation.hasAllowedClientDynamicAboveBoundary && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$boundary$2d$tracking$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allRequiredBoundariesRendered"])(boundaryState)) {
            // If we ever get this far then we messed up the tracking of invalid
            // dynamic. (When boundaries are missing the deferred fallback below
            // will surface a more useful error.)
            return Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"](`Route "${workStore.route}" failed to render during instant validation and Next.js was unable to determine a reason.`), "__NEXT_ERROR_CODE", {
                value: "E1055",
                enumerable: false,
                configurable: true
            });
        }
    } else {
        const dynamicErrors = dynamicValidation.dynamicErrors;
        if (dynamicErrors.length > 0) {
            return dynamicErrors;
        }
        if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.dynamicMetadata) {
            return [
                dynamicValidation.dynamicMetadata
            ];
        }
    }
    // Missing boundaries on their own aren't a strong signal — a parent
    // layout may legitimately omit a slot. Defer this so the caller can
    // try shallower validation depths first; if every depth comes up
    // empty we still want to surface this so the user is made aware that
    // validation didn't complete. When we add a markers API, the
    // marker-based variant of this check can become strict again.
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$boundary$2d$tracking$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allRequiredBoundariesRendered"])(boundaryState)) {
        const { thrownErrorsOutsideBoundary } = dynamicValidation;
        const rootInstantStack = dynamicValidation.slotStacks[0];
        if (thrownErrorsOutsideBoundary.length === 0) {
            const missingFiles = [];
            for (const [id, filePaths] of boundaryState.requiredIds){
                if (!boundaryState.renderedIds.has(id)) {
                    for (const filePath of filePaths){
                        let normalized = filePath.replace(/^\[project\][\\/]?/, '').replace(process.cwd() + '/', '').replace(process.cwd() + '\\', '');
                        missingFiles.push(normalized);
                    }
                }
            }
            missingFiles.sort();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$instant$2d$messages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createUnrenderedSegmentError"])(workStore.route, missingFiles);
        } else if (("TURBOPACK compile-time value", "1") && devRenderDidError) {
            // Errors outside the boundary likely blocked it from rendering,
            // but they're already being reported to the user via the dev
            // render. Suppress the validation failure to avoid noise.
            return [];
        } else if (thrownErrorsOutsideBoundary.length === 1) {
            const message = `Route "${workStore.route}": Could not validate \`instant\` because the target segment was prevented from rendering, likely due to the following error.`;
            const error = rootInstantStack !== null ? rootInstantStack() : new Error();
            error.name = 'Error';
            error.message = message;
            return new AggregateError([
                error,
                thrownErrorsOutsideBoundary[0]
            ]);
        } else {
            const message = `Route "${workStore.route}": Could not validate \`instant\` because the target segment was prevented from rendering, likely due to one of the following errors.`;
            const error = rootInstantStack !== null ? rootInstantStack() : new Error();
            error.name = 'Error';
            error.message = message;
            return new AggregateError([
                error,
                ...thrownErrorsOutsideBoundary
            ]);
        }
    }
    // We had a non-empty prelude and there are no dynamic holes
    return [];
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/instant-validation/boundary-constants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INSTANT_SLOT_MARKER_PREFIX",
    ()=>INSTANT_SLOT_MARKER_PREFIX,
    "INSTANT_SLOT_MARKER_SUFFIX",
    ()=>INSTANT_SLOT_MARKER_SUFFIX,
    "INSTANT_VALIDATION_BOUNDARY_NAME",
    ()=>INSTANT_VALIDATION_BOUNDARY_NAME
]);
const INSTANT_VALIDATION_BOUNDARY_NAME = '__next_instant_validation_boundary__';
const INSTANT_SLOT_MARKER_PREFIX = '__next_instant_slot_';
const INSTANT_SLOT_MARKER_SUFFIX = '__';
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/instant-validation/boundary-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InstantValidationBoundaryContext",
    ()=>InstantValidationBoundaryContext,
    "PlaceValidationBoundaryBelowThisLevel",
    ()=>PlaceValidationBoundaryBelowThisLevel,
    "RenderValidationBoundaryAtThisLevel",
    ()=>RenderValidationBoundaryAtThisLevel,
    "SlotMarker",
    ()=>SlotMarker
]);
/* eslint-disable @next/internal/no-ambiguous-jsx -- React Client */ // Do not put a "use client" directive here. Import this module via the shim in
// `packages/next/src/client/components/instant-validation/boundary.tsx` instead.
// 'use client'
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$boundary$2d$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/instant-validation/boundary-constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
;
;
;
;
;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
function getValidationBoundaryTracking() {
    const store = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    if (!store) return null;
    switch(store.type){
        case 'validation-client':
            return store.boundaryState;
        case 'prerender':
        case 'prerender-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'prerender-runtime':
        case 'request':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
        case 'generate-static-params':
            break;
        default:
            store;
    }
    return null;
}
// We use a namespace object to allow us to recover the name of the function
// at runtime even when production bundling/minification is used.
const NameSpace = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$boundary$2d$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INSTANT_VALIDATION_BOUNDARY_NAME"]]: function({ id, children }) {
        // Track which boundaries we actually managed to render.
        const state = getValidationBoundaryTracking();
        if (state === null) {
            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('Missing boundary tracking state'), "__NEXT_ERROR_CODE", {
                value: "E1060",
                enumerable: false,
                configurable: true
            });
        }
        state.renderedIds.add(id);
        return children;
    }
};
const InstantValidationBoundaryContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function PlaceValidationBoundaryBelowThisLevel({ id, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(InstantValidationBoundaryContext, {
        value: id,
        children: children
    });
}
function RenderValidationBoundaryAtThisLevel({ id, children }) {
    // We got a boundaryId from the context. Clear the context so that the children don't render another boundary.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(InstantValidationBoundary, {
        id: id,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(InstantValidationBoundaryContext, {
            value: null,
            children: children
        })
    });
}
const InstantValidationBoundary = // so it retains the name inferred from the namespace object
NameSpace[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$boundary$2d$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INSTANT_VALIDATION_BOUNDARY_NAME"].slice(0)];
// Slot marker component for attributing validation errors to the
// correct config when a boundary spans multiple parallel slots.
// Renders a dynamically-named inner component so the slot index
// appears in the SSR component stack (__next_instant_slot_N__).
const slotMarkerCache = new Map();
function SlotMarker({ name, children }) {
    let Marker = slotMarkerCache.get(name);
    if (!Marker) {
        const ns = {
            [name]: function({ children: c }) {
                return c;
            }
        };
        Marker = ns[name];
        slotMarkerCache.set(name, Marker);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Marker, {
        children: children
    });
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/instant-validation/boundary-tracking.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "allRequiredBoundariesRendered",
    ()=>allRequiredBoundariesRendered,
    "createValidationBoundaryTracking",
    ()=>createValidationBoundaryTracking
]);
function createValidationBoundaryTracking() {
    return {
        requiredIds: new Map(),
        renderedIds: new Set()
    };
}
function allRequiredBoundariesRendered(state) {
    for (const id of state.requiredIds.keys()){
        if (!state.renderedIds.has(id)) {
            return false;
        }
    }
    return true;
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/instant-validation/instant-samples.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertRootParamInSamples",
    ()=>assertRootParamInSamples,
    "createCookiesFromSample",
    ()=>createCookiesFromSample,
    "createDraftModeForValidation",
    ()=>createDraftModeForValidation,
    "createExhaustiveParamsProxy",
    ()=>createExhaustiveParamsProxy,
    "createExhaustiveSearchParamsProxy",
    ()=>createExhaustiveSearchParamsProxy,
    "createExhaustiveURLSearchParamsProxy",
    ()=>createExhaustiveURLSearchParamsProxy,
    "createHeadersFromSample",
    ()=>createHeadersFromSample,
    "createRelativeURLFromSamples",
    ()=>createRelativeURLFromSamples,
    "createValidationSampleTracking",
    ()=>createValidationSampleTracking,
    "trackMissingSampleError",
    ()=>trackMissingSampleError,
    "trackMissingSampleErrorAndThrow",
    ()=>trackMissingSampleErrorAndThrow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/router/utils/get-segment-param.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$relative$2d$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/router/utils/parse-relative-url.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$instant$2d$validation$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/instant-validation/instant-validation-error.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/utils/reflect-utils.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
function createValidationSampleTracking() {
    return {
        missingSampleErrors: []
    };
}
function getExpectedSampleTracking() {
    let validationSampleTracking = null;
    const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'request':
            case 'validation-client':
                // TODO(instant-validation-build): do we need any special handling for caches?
                validationSampleTracking = workUnitStore.validationSampleTracking ?? null;
                break;
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
            case 'prerender-legacy':
            case 'prerender-ppr':
            case 'prerender-client':
            case 'prerender':
            case 'prerender-runtime':
            case 'generate-static-params':
                break;
            default:
                workUnitStore;
        }
    }
    if (!validationSampleTracking) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('Expected to have a workUnitStore that provides validationSampleTracking'), "__NEXT_ERROR_CODE", {
            value: "E1110",
            enumerable: false,
            configurable: true
        });
    }
    return validationSampleTracking;
}
function trackMissingSampleError(error) {
    const validationSampleTracking = getExpectedSampleTracking();
    validationSampleTracking.missingSampleErrors.push(error);
}
function trackMissingSampleErrorAndThrow(error) {
    // TODO(instant-validation-build): this should abort the render
    trackMissingSampleError(error);
    throw error;
}
function createCookiesFromSample(sampleCookies, route) {
    const declaredNames = new Set();
    const cookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestCookies"](new Headers());
    if (sampleCookies) {
        for (const cookie of sampleCookies){
            declaredNames.add(cookie.name);
            if (cookie.value !== null) {
                cookies.set(cookie.name, cookie.value);
            }
        }
    }
    const sealed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestCookiesAdapter"].seal(cookies);
    return new Proxy(sealed, {
        get (target, prop, receiver) {
            if (prop === 'has') {
                const originalMethod = Reflect.get(target, prop, receiver);
                const wrappedMethod = function(name) {
                    if (!declaredNames.has(name)) {
                        trackMissingSampleErrorAndThrow(createMissingCookieSampleError(route, name));
                    }
                    return originalMethod.call(target, name);
                };
                return wrappedMethod;
            }
            if (prop === 'get') {
                const originalMethod = Reflect.get(target, prop, receiver);
                const wrappedMethod = function(nameOrCookie) {
                    let name;
                    if (typeof nameOrCookie === 'string') {
                        name = nameOrCookie;
                    } else if (nameOrCookie && typeof nameOrCookie === 'object' && typeof nameOrCookie.name === 'string') {
                        name = nameOrCookie.name;
                    } else {
                        // This is an invalid input. Pass it through to the original method so it can error.
                        return originalMethod.call(target, nameOrCookie);
                    }
                    if (!declaredNames.has(name)) {
                        trackMissingSampleErrorAndThrow(createMissingCookieSampleError(route, name));
                    }
                    return originalMethod.call(target, name);
                };
                return wrappedMethod;
            }
            // TODO(instant-validation-build): what should getAll do?
            // Maybe we should only allow it if there's an array (possibly empty?)
            return Reflect.get(target, prop, receiver);
        }
    });
}
function createMissingCookieSampleError(route, name) {
    return Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$instant$2d$validation$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InstantValidationError"](`Route "${route}" accessed cookie "${name}" which is not defined in the \`unstable_samples\` ` + `of \`instant\`. Add it to the sample's \`cookies\` array, ` + `or \`{ name: "${name}", value: null }\` if it should be absent.`), "__NEXT_ERROR_CODE", {
        value: "E1346",
        enumerable: false,
        configurable: true
    });
}
function createHeadersFromSample(rawSampleHeaders, sampleCookies, route) {
    // If we have cookie samples, add a `cookie` header to match.
    // Accessing it will be implicitly allowed by the proxy --
    // if the user defined some cookies, accessing the "cookie" header is also fine.
    const sampleHeaders = rawSampleHeaders ? [
        ...rawSampleHeaders
    ] : [];
    if (sampleHeaders.find(([name])=>name.toLowerCase() === 'cookie')) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$instant$2d$validation$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InstantValidationError"]('Invalid sample: Defining cookies via a "cookie" header is not supported. Use `cookies: [{ name: ..., value: ... }]` instead.'), "__NEXT_ERROR_CODE", {
            value: "E1111",
            enumerable: false,
            configurable: true
        });
    }
    if (sampleCookies) {
        const cookieHeaderValue = sampleCookies.toString();
        sampleHeaders.push([
            'cookie',
            // if the `cookies` samples were empty, or they were all `null`, then we have no cookies,
            // and the header isn't present, but should remains readable, so we set it to null.
            cookieHeaderValue !== '' ? cookieHeaderValue : null
        ]);
    }
    const declaredNames = new Set();
    const headersInit = {};
    for (const [name, value] of sampleHeaders){
        declaredNames.add(name.toLowerCase());
        if (value !== null) {
            headersInit[name.toLowerCase()] = value;
        }
    }
    const sealed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeadersAdapter"].seal(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(headersInit));
    return new Proxy(sealed, {
        get (target, prop, receiver) {
            if (prop === 'get' || prop === 'has') {
                const originalMethod = Reflect.get(target, prop, receiver);
                const patchedMethod = function(rawName) {
                    const name = rawName.toLowerCase();
                    if (!declaredNames.has(name)) {
                        trackMissingSampleErrorAndThrow(Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$instant$2d$validation$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InstantValidationError"](`Route "${route}" accessed header "${name}" which is not defined in the \`unstable_samples\` ` + `of \`instant\`. Add it to the sample's \`headers\` array, ` + `or \`["${name}", null]\` if it should be absent.`), "__NEXT_ERROR_CODE", {
                            value: "E1348",
                            enumerable: false,
                            configurable: true
                        }));
                    }
                    // typescript can't reconcile a union of functions with a union of return types,
                    // so we have to cast the original return type away
                    return originalMethod.call(target, name);
                };
                return patchedMethod;
            }
            return Reflect.get(target, prop, receiver);
        }
    });
}
function createDraftModeForValidation() {
    // Create a minimal DraftModeProvider-compatible object
    // that always reports draft mode as disabled.
    //
    // private properties that can't be set from outside the class.
    return {
        get isEnabled () {
            return false;
        },
        enable () {
            throw Object.defineProperty(new Error('Draft mode cannot be enabled during build-time instant validation.'), "__NEXT_ERROR_CODE", {
                value: "E1092",
                enumerable: false,
                configurable: true
            });
        },
        disable () {
            throw Object.defineProperty(new Error('Draft mode cannot be disabled during build-time instant validation.'), "__NEXT_ERROR_CODE", {
                value: "E1094",
                enumerable: false,
                configurable: true
            });
        }
    };
}
function createExhaustiveParamsProxy(underlyingParams, declaredParamNames, route) {
    return new Proxy(underlyingParams, {
        get (target, prop, receiver) {
            if (typeof prop === 'string' && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wellKnownProperties"].has(prop) && // Only error when accessing a param that is part of the route but wasn't provided.
            // accessing properties that aren't expected to be a valid param value is fine.
            prop in underlyingParams && !declaredParamNames.has(prop)) {
                trackMissingSampleErrorAndThrow(Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$instant$2d$validation$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InstantValidationError"](`Route "${route}" accessed param "${prop}" which is not defined in the \`unstable_samples\` ` + `of \`instant\`. Add it to the sample's \`params\` object.`), "__NEXT_ERROR_CODE", {
                    value: "E1349",
                    enumerable: false,
                    configurable: true
                }));
            }
            return Reflect.get(target, prop, receiver);
        }
    });
}
function createExhaustiveSearchParamsProxy(searchParams, declaredSearchParamNames, route) {
    return new Proxy(searchParams, {
        get (target, prop, receiver) {
            if (typeof prop === 'string' && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wellKnownProperties"].has(prop) && !declaredSearchParamNames.has(prop)) {
                trackMissingSampleErrorAndThrow(createMissingSearchParamSampleError(route, prop));
            }
            return Reflect.get(target, prop, receiver);
        },
        has (target, prop) {
            if (typeof prop === 'string' && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wellKnownProperties"].has(prop) && !declaredSearchParamNames.has(prop)) {
                trackMissingSampleErrorAndThrow(createMissingSearchParamSampleError(route, prop));
            }
            return Reflect.has(target, prop);
        }
    });
}
function createExhaustiveURLSearchParamsProxy(searchParams, declaredSearchParamNames, route) {
    return new Proxy(searchParams, {
        get (target, prop, receiver) {
            // Intercept method calls that access specific param names
            if (prop === 'get' || prop === 'getAll' || prop === 'has') {
                const originalMathod = Reflect.get(target, prop, receiver);
                return (name)=>{
                    if (typeof name === 'string' && !declaredSearchParamNames.has(name)) {
                        trackMissingSampleErrorAndThrow(createMissingSearchParamSampleError(route, name));
                    }
                    return originalMathod.call(target, name);
                };
            }
            const value = Reflect.get(target, prop, receiver);
            // Prevent `TypeError: Value of "this" must be of type URLSearchParams` for methods
            if (typeof value === 'function' && !Object.hasOwn(target, prop)) {
                return value.bind(target);
            }
            return value;
        }
    });
}
function createMissingSearchParamSampleError(route, name) {
    return Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$instant$2d$validation$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InstantValidationError"](`Route "${route}" accessed searchParam "${name}" which is not defined in the \`unstable_samples\` ` + `of \`instant\`. Add it to the sample's \`searchParams\` object, ` + `or \`{ "${name}": null }\` if it should be absent.`), "__NEXT_ERROR_CODE", {
        value: "E1347",
        enumerable: false,
        configurable: true
    });
}
function createRelativeURLFromSamples(route, sampleParams, sampleSearchParams) {
    // Build searchParams query object and URL search string from sample
    const pathname = createPathnameFromRouteAndSampleParams(route, sampleParams ?? {});
    let search = '';
    if (sampleSearchParams) {
        const qs = createURLSearchParamsFromSample(sampleSearchParams).toString();
        if (qs) {
            search = '?' + qs;
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$relative$2d$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseRelativeUrl"])(pathname + search, undefined, true);
}
function createURLSearchParamsFromSample(sampleSearchParams) {
    const result = new URLSearchParams();
    if (sampleSearchParams) {
        for (const [key, value] of Object.entries(sampleSearchParams)){
            if (value === null || value === undefined) continue;
            if (Array.isArray(value)) {
                for (const v of value){
                    result.append(key, v);
                }
            } else {
                result.set(key, value);
            }
        }
    }
    return result;
}
/**
 * Substitute sample params into `workStore.route` to create a plausible pathname.
 * TODO(instant-validation-build): this logic is somewhat hacky and likely incomplete,
 * but it should be good enough for some initial testing.
 */ function createPathnameFromRouteAndSampleParams(route, params) {
    let interpolatedSegments = [];
    const rawSegments = route.split('/');
    for (const rawSegment of rawSegments){
        const param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSegmentParam"])(rawSegment);
        if (param) {
            switch(param.paramType){
                case 'catchall':
                case 'optional-catchall':
                    {
                        let paramValue = params[param.paramName];
                        if (paramValue === undefined) {
                            // The value for the param was not provided. `usePathname` will detect this and throw
                            // before this can surface to userspace. Use `[...NAME]` as a placeholder for the param value
                            // in case it pops up somewhere unexpectedly.
                            paramValue = [
                                rawSegment
                            ];
                        } else if (!Array.isArray(paramValue)) {
                            // NOTE: this happens outside of render, so we don't need `trackMissingSampleErrorAndThrow`
                            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$instant$2d$validation$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InstantValidationError"](`Expected sample param value for segment '${rawSegment}' to be an array of strings, got ${typeof paramValue}`), "__NEXT_ERROR_CODE", {
                                value: "E1104",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        interpolatedSegments.push(...paramValue.map((v)=>encodeURIComponent(v)));
                        break;
                    }
                case 'dynamic':
                    {
                        let paramValue = params[param.paramName];
                        if (paramValue === undefined) {
                            // The value for the param was not provided. `usePathname` will detect this and throw
                            // before this can surface to userspace. Use `[NAME]` as a placeholder for the param value
                            // in case it pops up somewhere unexpectedly.
                            paramValue = rawSegment;
                        } else if (typeof paramValue !== 'string') {
                            // NOTE: this happens outside of render, so we don't need `trackMissingSampleErrorAndThrow`
                            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$instant$2d$validation$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InstantValidationError"](`Expected sample param value for segment '${rawSegment}' to be a string, got ${typeof paramValue}`), "__NEXT_ERROR_CODE", {
                                value: "E1108",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        interpolatedSegments.push(encodeURIComponent(paramValue));
                        break;
                    }
                case 'catchall-intercepted-(..)(..)':
                case 'catchall-intercepted-(.)':
                case 'catchall-intercepted-(..)':
                case 'catchall-intercepted-(...)':
                case 'dynamic-intercepted-(..)(..)':
                case 'dynamic-intercepted-(.)':
                case 'dynamic-intercepted-(..)':
                case 'dynamic-intercepted-(...)':
                    {
                        // TODO(instant-validation-build): i don't know how these are supposed to work, or if we can even get them here
                        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('Not implemented: Validation of interception routes'), "__NEXT_ERROR_CODE", {
                            value: "E1106",
                            enumerable: false,
                            configurable: true
                        });
                    }
                default:
                    {
                        param.paramType;
                    }
            }
        } else {
            interpolatedSegments.push(rawSegment);
        }
    }
    return interpolatedSegments.join('/');
}
function assertRootParamInSamples(workStore, sampleParams, paramName) {
    if (sampleParams && paramName in sampleParams) {
    // The param is defined in the samples.
    } else {
        const route = workStore.route;
        trackMissingSampleErrorAndThrow(Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$instant$2d$validation$2f$instant$2d$validation$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InstantValidationError"](`Route "${route}" accessed root param "${paramName}" which is not defined in the \`unstable_samples\` ` + `of \`instant\`. Add it to the sample's \`params\` object.`), "__NEXT_ERROR_CODE", {
            value: "E1192",
            enumerable: false,
            configurable: true
        }));
    }
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/instant-validation/instant-validation-error.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InstantValidationError",
    ()=>InstantValidationError,
    "isInstantValidationError",
    ()=>isInstantValidationError
]);
const INSTANT_VALIDATION_ERROR_DIGEST = 'INSTANT_VALIDATION_ERROR';
function isInstantValidationError(err) {
    return !!(err && typeof err === 'object' && err instanceof Error && err.digest === INSTANT_VALIDATION_ERROR_DIGEST);
}
class InstantValidationError extends Error {
    constructor(...args){
        super(...args), this.digest = INSTANT_VALIDATION_ERROR_DIGEST;
    }
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/staged-rendering.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RENDER_STAGE_ADVANCE_ORDER",
    ()=>RENDER_STAGE_ADVANCE_ORDER,
    "RenderStage",
    ()=>RenderStage,
    "StagedRenderingController",
    ()=>StagedRenderingController,
    "SyncIOMode",
    ()=>SyncIOMode,
    "getNextStage",
    ()=>getNextStage,
    "isAdvanceableRenderStage",
    ()=>isAdvanceableRenderStage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$promise$2d$with$2d$resolvers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/promise-with-resolvers.js [app-ssr] (ecmascript)");
;
;
var RenderStage = /*#__PURE__*/ function(RenderStage) {
    RenderStage[RenderStage["Before"] = 1] = "Before";
    //
    RenderStage[RenderStage["ShellStatic"] = 11] = "ShellStatic";
    RenderStage[RenderStage["Static"] = 13] = "Static";
    //
    RenderStage[RenderStage["ShellRuntime"] = 21] = "ShellRuntime";
    RenderStage[RenderStage["Runtime"] = 23] = "Runtime";
    //
    RenderStage[RenderStage["Dynamic"] = 30] = "Dynamic";
    //
    RenderStage[RenderStage["Abandoned"] = 40] = "Abandoned";
    return RenderStage;
}({});
const RENDER_STAGE_ADVANCE_ORDER = [
    11,
    13,
    21,
    23,
    30
];
function getNextStage(stage) {
    return RENDER_STAGE_ADVANCE_ORDER[RENDER_STAGE_ADVANCE_ORDER.indexOf(stage) + 1];
}
function isAdvanceableRenderStage(stage) {
    return 1 < stage && stage <= 30;
}
var SyncIOMode = /*#__PURE__*/ function(SyncIOMode) {
    /** Sync IO does not error in any stage. */ SyncIOMode[SyncIOMode["Untracked"] = 1] = "Untracked";
    /** Before `partialPrefetching`: Sync IO errors in static stages, and is allowed otherwise. */ SyncIOMode[SyncIOMode["AllowedInRuntimeOrDynamic"] = 2] = "AllowedInRuntimeOrDynamic";
    /** After `partialPrefetching`: Sync IO errors in all stages other than dynamic. */ SyncIOMode[SyncIOMode["AllowedInDynamic"] = 3] = "AllowedInDynamic";
    return SyncIOMode;
}({});
class StagedRenderingController {
    constructor({ abortSignal, abandonController, syncIO, finalStage }){
        this.currentStage = 1;
        this.syncInterruptReason = null;
        this.triggers = {
            [11]: createStageTrigger(),
            [13]: createStageTrigger(),
            //
            [21]: createStageTrigger(),
            [23]: createStageTrigger(),
            //
            [30]: createStageTrigger()
        };
        this.abortSignal = abortSignal;
        this.abandonController = abandonController;
        this.syncIOMode = syncIO;
        this.finalStage = finalStage;
        if (abortSignal) {
            abortSignal.addEventListener('abort', ()=>{
                // Reject all stage promises that haven't already been resolved.
                // `cancelStageTrigger` is a noop if the trigger already resolved.
                const { reason } = abortSignal;
                for (const trigger of Object.values(this.triggers)){
                    cancelStageTrigger(trigger, reason);
                }
            }, {
                once: true
            });
        }
        if (abandonController) {
            abandonController.signal.addEventListener('abort', ()=>{
                this.abandonRender();
            }, {
                once: true
            });
        }
    }
    onStage(stage, callback) {
        addSyncTriggerListener(this.triggers[stage], callback);
    }
    shouldTrackSyncInterrupt() {
        if (this.syncIOMode === 1) {
            return false;
        }
        switch(this.currentStage){
            case 1:
                // If we haven't started the render yet, it can't be interrupted.
                return false;
            case 11:
            case 13:
                return true;
            case 21:
            case 23:
                {
                    switch(this.syncIOMode){
                        case 2:
                            {
                                // Before `partialPrefetching`: Sync IO only errors in static stages.
                                return false;
                            }
                        case 3:
                            {
                                return true;
                            }
                    }
                // NOT a fallthrough, but eslint doesn't understand that
                }
            case 30:
            case 40:
                return false;
            default:
                this.currentStage;
                return false;
        }
    }
    /** Note: only call this if `shouldTrackSyncInterrupt()` returned true */ syncInterruptCurrentStageWithReason(reason) {
        const { currentStage } = this;
        if (currentStage === 1 || currentStage === 30 || currentStage === 40) {
            // Not interruptible. Defensive noop.
            return;
        }
        // If Sync IO occurs during an abandonable render, we trigger the abandon.
        // The abandon listener will call abandonRender which advances through
        // stages to let caches fill before marking as Abandoned.
        if (this.abandonController) {
            this.abandonController.abort();
            return;
        }
        if (this.abortSignal) {
            // If this is an abortable render, we capture the interruption reason and stop advancing.
            // We don't release any more promises.
            // The caller is expected to abort the signal.
            this.syncInterruptReason = reason;
            this.currentStage = 40;
            return;
        }
        // If we're in a non-abandonable & non-abortable render,
        // we need to advance to the Dynamic stage and capture the interruption reason.
        // (in dev, this will be the restarted render)
        this.syncInterruptReason = reason;
        this.advanceStage(30);
    }
    getSyncInterruptReason() {
        return this.syncInterruptReason;
    }
    getStageEndTime(stage) {
        return this.triggers[getNextStage(stage)].triggeredAt ?? Infinity;
    }
    abandonRender() {
        // In staged rendering, only the initial render is abandonable.
        // We can abandon the initial render if
        //   1. We notice a cache miss, and need to wait for caches to fill
        //   2. A sync IO error occurs, and the render should be interrupted
        //      (this might be a lazy intitialization of a module,
        //       so we still want to restart in this case and see if it still occurs)
        // In either case, we'll be doing another render after this one,
        // so we only want to unblock the next stage, not Dynamic, because
        // unblocking the dynamic stage would likely lead to wasted (uncached) IO.
        const { currentStage } = this;
        if (currentStage === 1) {
            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]("A render that hasn't started yet cannot be abandoned"), "__NEXT_ERROR_CODE", {
                value: "E1300",
                enumerable: false,
                configurable: true
            });
        }
        if (currentStage === 30 || currentStage === 40) {
            // We shouldn't ever trigger an abandon in these. Defensive noop.
            return;
        }
        // Resolve all stages after the current one, up to runtime (excluding dynamic)
        const nextStageIx = RENDER_STAGE_ADVANCE_ORDER.indexOf(currentStage) + 1;
        const dynamicStageIx = RENDER_STAGE_ADVANCE_ORDER.indexOf(30);
        for(let i = nextStageIx; i < dynamicStageIx; i++){
            this.resolveStage(RENDER_STAGE_ADVANCE_ORDER[i]);
        }
        this.currentStage = 40;
    }
    advanceStage(targetStage) {
        if (this.finalStage !== null && targetStage > this.finalStage) {
            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"](`Attempted to advance to stage ${RenderStage[targetStage]} but the render is limited to ${RenderStage[this.finalStage]}`), "__NEXT_ERROR_CODE", {
                value: "E1302",
                enumerable: false,
                configurable: true
            });
        }
        const { currentStage } = this;
        if (currentStage === 30 || currentStage === 40) {
            // Terminal stages, nowhere left to advance.
            return;
        }
        // If we're already at the target stage or beyond, do nothing.
        if (targetStage <= currentStage) {
            return;
        }
        this.currentStage = targetStage;
        // Resolve all stages between the current stage and the target.
        const nextStageIx = currentStage === 1 ? 0 : RENDER_STAGE_ADVANCE_ORDER.indexOf(currentStage) + 1;
        const targetStageIx = RENDER_STAGE_ADVANCE_ORDER.indexOf(targetStage);
        for(let i = nextStageIx; i <= targetStageIx; i++){
            this.resolveStage(RENDER_STAGE_ADVANCE_ORDER[i]);
        }
    }
    resolveStage(stage) {
        fireStageTrigger(this.triggers[stage]);
    }
    getStagePromise(stage) {
        return this.triggers[stage].promise;
    }
    waitForStage(stage) {
        return this.getStagePromise(stage);
    }
    delayUntilStage(stage, displayName, resolvedValue) {
        const stagePromise = this.getStagePromise(stage);
        const promise = ("TURBOPACK compile-time truthy", 1) ? makeDevtoolsIOPromiseFromIOTrigger(stagePromise, displayName, resolvedValue) : "TURBOPACK unreachable";
        // Analogously to `makeDynamicHangingPromise`, we might reject this promise if the signal is invoked.
        // (e.g. in the case where we don't want want the render to proceed to the dynamic stage and abort it).
        // We shouldn't consider this an unhandled rejection, so we attach a noop catch handler here to suppress this warning.
        if (this.abortSignal) {
            promise.catch(ignoreReject);
        }
        return promise;
    }
}
function ignoreReject() {}
// TODO(restart-on-cache-miss): the layering of `delayUntilStage`,
// `makeDevtoolsIOPromiseFromIOTrigger` and and `makeDevtoolsIOAwarePromise`
// is confusing, we should clean it up.
function makeDevtoolsIOPromiseFromIOTrigger(ioTrigger, displayName, resolvedValue) {
    // If we create a `new Promise` and give it a displayName
    // (with no userspace code above us in the stack)
    // React Devtools will use it as the IO cause when determining "suspended by".
    // In particular, it should shadow any inner IO that resolved/rejected the promise
    // (in case of staged rendering, this will be the `setTimeout` that triggers the relevant stage)
    const promise = new Promise((resolve, reject)=>{
        ioTrigger.then(resolve.bind(null, resolvedValue), reject);
    });
    if (displayName !== undefined) {
        // @ts-expect-error
        promise.displayName = displayName;
    }
    return promise;
}
function addSyncTriggerListener(trigger, listener) {
    if (trigger.state === 'pending') {
        trigger._listeners.push(listener);
    } else {
        listener();
    }
}
function createStageTrigger() {
    const { promise, resolve, reject } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$promise$2d$with$2d$resolvers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPromiseWithResolvers"])();
    return {
        state: 'pending',
        triggeredAt: null,
        promise,
        _listeners: [],
        _resolvePromise: resolve,
        _rejectPromise: reject
    };
}
function fireStageTrigger(trigger) {
    if (trigger.state !== 'pending') {
        return;
    }
    trigger.state = 'triggered';
    trigger.triggeredAt = performance.now() + performance.timeOrigin;
    try {
        const { _listeners: listeners } = trigger;
        for(let i = 0; i < listeners.length; i++){
            listeners[i]();
        }
        listeners.length = 0;
    } finally{
        trigger._resolvePromise();
    }
}
function cancelStageTrigger(trigger, reason) {
    if (trigger.state !== 'pending') {
        return;
    }
    trigger.state = 'cancelled';
    // we didn't trigger, so don't save `triggeredAt`.
    // We're not gonna fire the listeners, we may as well free them.
    trigger._listeners.length = 0;
    // Suppress unhandled rejection warnings for promises that no one is awaiting.
    trigger.promise.catch(ignoreReject);
    trigger._rejectPromise(reason);
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/vary-params.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VaryParamsAccumulator",
    ()=>VaryParamsAccumulator,
    "accumulateRootVaryParam",
    ()=>accumulateRootVaryParam,
    "accumulateVaryParam",
    ()=>accumulateVaryParam,
    "createResponseVaryParamsAccumulator",
    ()=>createResponseVaryParamsAccumulator,
    "createVaryParamsAccumulator",
    ()=>createVaryParamsAccumulator,
    "createVaryingParams",
    ()=>createVaryingParams,
    "createVaryingSearchParams",
    ()=>createVaryingSearchParams,
    "emptyVaryParamsAccumulator",
    ()=>emptyVaryParamsAccumulator,
    "finishAccumulatingVaryParams",
    ()=>finishAccumulatingVaryParams,
    "getMetadataVaryParamsAccumulator",
    ()=>getMetadataVaryParamsAccumulator,
    "getRootParamsVaryParamsAccumulator",
    ()=>getRootParamsVaryParamsAccumulator,
    "getViewportVaryParamsAccumulator",
    ()=>getViewportVaryParamsAccumulator
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
;
class VaryParamsAccumulator {
    /**
   * Records that a param was accessed. Yields the name into the stream the
   * first time it's seen; subsequent accesses of the same name are no-ops.
   */ add(paramName) {
        if (this._done || this._seen.has(paramName)) {
            return;
        }
        this._seen.add(paramName);
        if (this._resolve !== null) {
            this._resolve({
                value: paramName,
                done: false
            });
            this._resolve = null;
        } else {
            this._buffer.push(paramName);
        }
    }
    /** Ends the iteration. Best-effort: if skipped (e.g. on a sync-I/O abort),
   * the consumer simply reads the params yielded so far. */ close() {
        if (this._done) {
            return;
        }
        this._done = true;
        if (this._resolve !== null) {
            this._resolve({
                value: undefined,
                done: true
            });
            this._resolve = null;
        }
    }
    [Symbol.asyncIterator]() {
        return {
            next: ()=>{
                if (this._buffer.length > 0) {
                    return Promise.resolve({
                        value: this._buffer.shift(),
                        done: false
                    });
                }
                if (this._done) {
                    return Promise.resolve({
                        value: undefined,
                        done: true
                    });
                }
                return new Promise((resolve)=>{
                    this._resolve = resolve;
                });
            }
        };
    }
    constructor(){
        this._resolve = null;
        this._done = false;
        this._buffer = [];
        // The set of param names already yielded. Doubles as the dedupe guard so the
        // same name is never emitted twice.
        this._seen = new Set();
    }
}
const emptyVaryParamsAccumulator = new VaryParamsAccumulator();
emptyVaryParamsAccumulator.close();
function createResponseVaryParamsAccumulator() {
    // Create the head and rootParams accumulators as top-level fields.
    // Segment accumulators are added to the segments set as they are created.
    const head = new VaryParamsAccumulator();
    const rootParams = new VaryParamsAccumulator();
    const segments = new Set();
    return {
        head,
        rootParams,
        segments
    };
}
function createVaryParamsAccumulator() {
    const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    if (!workUnitStore) {
        return null;
    }
    const responseAccumulator = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["getVaryParamsAccumulator"])(workUnitStore);
    if (!responseAccumulator) {
        return null;
    }
    const accumulator = new VaryParamsAccumulator();
    responseAccumulator.segments.add(accumulator);
    return accumulator;
}
function getMetadataVaryParamsAccumulator() {
    var _getVaryParamsAccumulator;
    const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    if (!workUnitStore) {
        return null;
    }
    return ((_getVaryParamsAccumulator = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["getVaryParamsAccumulator"])(workUnitStore)) == null ? void 0 : _getVaryParamsAccumulator.head) ?? null;
}
const getViewportVaryParamsAccumulator = getMetadataVaryParamsAccumulator;
function getRootParamsVaryParamsAccumulator() {
    var _getVaryParamsAccumulator;
    const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    if (!workUnitStore) {
        return null;
    }
    return ((_getVaryParamsAccumulator = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["getVaryParamsAccumulator"])(workUnitStore)) == null ? void 0 : _getVaryParamsAccumulator.rootParams) ?? null;
}
function accumulateVaryParam(accumulator, paramName) {
    accumulator.add(paramName);
}
function accumulateRootVaryParam(paramName) {
    const rootParamsAccumulator = getRootParamsVaryParamsAccumulator();
    if (rootParamsAccumulator !== null) {
        accumulateVaryParam(rootParamsAccumulator, paramName);
    }
}
function createVaryingParams(accumulator, originalParamsObject, optionalCatchAllParamName) {
    if (optionalCatchAllParamName !== null) {
        // When there's an optional catch-all param with no value (e.g.,
        // [[...slug]] at /), the param doesn't exist as a property on the params
        // object. Use a Proxy to track all param access — both existing params
        // and the missing optional param — including enumeration patterns like
        // Object.keys(), spread, for...in, and `in` checks.
        return new Proxy(originalParamsObject, {
            get (target, prop, receiver) {
                if (typeof prop === 'string') {
                    if (prop === optionalCatchAllParamName || Object.prototype.hasOwnProperty.call(target, prop)) {
                        accumulateVaryParam(accumulator, prop);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },
            has (target, prop) {
                if (prop === optionalCatchAllParamName) {
                    accumulateVaryParam(accumulator, optionalCatchAllParamName);
                }
                return Reflect.has(target, prop);
            },
            ownKeys (target) {
                // Enumerating the params object means the user's code may depend on
                // which params are present, so conservatively track the optional
                // param as accessed.
                accumulateVaryParam(accumulator, optionalCatchAllParamName);
                return Reflect.ownKeys(target);
            }
        });
    }
    // When there's no optional catch-all, all params exist as properties on the
    // object, so we can use defineProperty getters instead of a Proxy. This is
    // faster because the engine can optimize property access on regular objects
    // more aggressively than Proxy trap calls.
    const underlyingParamsWithVarying = {};
    for(const paramName in originalParamsObject){
        Object.defineProperty(underlyingParamsWithVarying, paramName, {
            get () {
                accumulateVaryParam(accumulator, paramName);
                return originalParamsObject[paramName];
            },
            enumerable: true
        });
    }
    return underlyingParamsWithVarying;
}
function createVaryingSearchParams(accumulator, originalSearchParamsObject) {
    // Search params have no fixed schema, so any access — missing-key reads, `in`
    // checks, or enumeration — must register as varying. A Proxy is required
    // (rather than per-property getters) so that enumeration of an empty
    // searchParams object still triggers a vary. All accesses bucket into the
    // single sentinel '?'; the segment is keyed by the whole query string.
    // TODO: Split into per-param tracking if the cache key evolves.
    return new Proxy(originalSearchParamsObject, {
        get (target, prop, receiver) {
            if (typeof prop === 'string') {
                accumulateVaryParam(accumulator, '?');
            }
            return Reflect.get(target, prop, receiver);
        },
        has (target, prop) {
            if (typeof prop === 'string') {
                accumulateVaryParam(accumulator, '?');
            }
            return Reflect.has(target, prop);
        },
        ownKeys (target) {
            accumulateVaryParam(accumulator, '?');
            return Reflect.ownKeys(target);
        }
    });
}
function finishAccumulatingVaryParams(responseAccumulator) {
    responseAccumulator.head.close();
    responseAccumulator.rootParams.close();
    for (const segmentAccumulator of responseAccumulator.segments){
        segmentAccumulator.close();
    }
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/create-deduped-by-callsite-server-error-logger.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDedupedByCallsiteServerErrorLoggerDev",
    ()=>createDedupedByCallsiteServerErrorLoggerDev
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const errorRef = {
    current: null
};
// React.cache is currently only available in canary/experimental React channels.
const cache = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cache"] === 'function' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cache"] : (fn)=>fn;
// When Cache Components is enabled, we record these as errors so that they
// are captured by the dev overlay as it's more critical to fix these
// when enabled.
const logErrorOrWarn = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : console.warn;
// We don't want to dedupe across requests.
// The developer might've just attempted to fix the warning so we should warn again if it still happens.
const flushCurrentErrorIfNew = cache((key)=>{
    try {
        logErrorOrWarn(errorRef.current);
    } finally{
        errorRef.current = null;
    }
});
function createDedupedByCallsiteServerErrorLoggerDev(getMessage) {
    return function logDedupedError(...args) {
        const message = getMessage(...args);
        if ("TURBOPACK compile-time truthy", 1) {
            var _stack;
            const callStackFrames = (_stack = new Error().stack) == null ? void 0 : _stack.split('\n');
            if (callStackFrames === undefined || callStackFrames.length < 4) {
                logErrorOrWarn(message);
            } else {
                // Error:
                //   logDedupedError
                //   asyncApiBeingAccessedSynchronously
                //   <userland callsite>
                // TODO: This breaks if sourcemaps with ignore lists are enabled.
                const key = callStackFrames[4];
                errorRef.current = message;
                flushCurrentErrorIfNew(key);
            }
        } else //TURBOPACK unreachable
        ;
    };
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/dynamic-rendering-utils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientHookDynamicError",
    ()=>ClientHookDynamicError,
    "RENDER_STAGES_BY_DATA_KIND",
    ()=>RENDER_STAGES_BY_DATA_KIND,
    "applyOwnerStack",
    ()=>applyOwnerStack,
    "isClientHookDynamicError",
    ()=>isClientHookDynamicError,
    "isHangingPromiseRejectionError",
    ()=>isHangingPromiseRejectionError,
    "makeClientHookHangingPromise",
    ()=>makeClientHookHangingPromise,
    "makeDevtoolsIOAwarePromise",
    ()=>makeDevtoolsIOAwarePromise,
    "makeDynamicHangingPromise",
    ()=>makeDynamicHangingPromise,
    "makeFallbackParamsHangingPromise",
    ()=>makeFallbackParamsHangingPromise,
    "makePromiseFromTrigger",
    ()=>makePromiseFromTrigger,
    "makeRuntimeHangingPromise",
    ()=>makeRuntimeHangingPromise,
    "makeStageHangingPromise",
    ()=>makeStageHangingPromise,
    "makeUntrackedHangingPromise",
    ()=>makeUntrackedHangingPromise,
    "trackFallbackParamsAccessed",
    ()=>trackFallbackParamsAccessed,
    "trackRuntimeDataAccessed",
    ()=>trackRuntimeDataAccessed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$staged$2d$rendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/staged-rendering.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$runtime$2d$reacts$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$runtime$2d$reacts$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)");
;
;
;
function isHangingPromiseRejectionError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === HANGING_PROMISE_REJECTION;
}
const HANGING_PROMISE_REJECTION = 'HANGING_PROMISE_REJECTION';
class HangingPromiseRejectionError extends Error {
    constructor(route, expression){
        super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${route}".`), this.route = route, this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
    }
}
const CLIENT_HOOK_DYNAMIC = 'CLIENT_HOOK_DYNAMIC';
class ClientHookDynamicError extends Error {
    constructor(route, expression){
        super(`Route "${route}": Next.js encountered URL data \`${expression}\` in a Client Component outside of \`<Suspense>\`.\n\n` + `This blocks prerendering because the value is only available at runtime.\n\n` + `Ways to fix this:\n` + `  - [stream] Wrap the component in \`<Suspense fallback={...}>\` so the hook value streams in after prerendering\n` + `  - [block] Set \`export const instant = false\` to allow a blocking route\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-client-hook`), this.digest = CLIENT_HOOK_DYNAMIC;
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E1433",
            enumerable: false,
            configurable: true
        });
    }
}
function isClientHookDynamicError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === CLIENT_HOOK_DYNAMIC;
}
const abortListenersBySignal = new WeakMap();
function makeDynamicHangingPromise(signal, route, expression) {
    return makeHangingPromiseWithError(signal, new HangingPromiseRejectionError(route, expression));
}
function makeUntrackedHangingPromise(signal, route, expression) {
    return makeHangingPromiseWithError(signal, new HangingPromiseRejectionError(route, expression));
}
function makeRuntimeHangingPromise(signal, route, expression, workUnitStore) {
    if (workUnitStore !== null) {
        trackRuntimeDataAccessed(workUnitStore);
    }
    return makeHangingPromiseWithError(signal, new HangingPromiseRejectionError(route, expression));
}
function makeFallbackParamsHangingPromise(signal, route, expression, workUnitStore) {
    if (workUnitStore !== null) {
        trackFallbackParamsAccessed(workUnitStore);
    }
    return makeHangingPromiseWithError(signal, new HangingPromiseRejectionError(route, expression));
}
function makeStageHangingPromise(signal, route, expression, workUnitStore) {
    trackRuntimeDataAccessed(workUnitStore);
    return makeHangingPromiseWithError(signal, new HangingPromiseRejectionError(route, expression));
}
function trackRuntimeDataAccessed(workUnitStore) {
    trackRuntimeDataAccessedImpl(workUnitStore, false);
}
function trackFallbackParamsAccessed(workUnitStore) {
    trackRuntimeDataAccessedImpl(workUnitStore, true);
}
function trackRuntimeDataAccessedImpl(workUnitStore, isFallbackParamAccess) {
    switch(workUnitStore.type){
        case 'prerender':
            {
                var // responses as `needsRuntimeRequest`): resolved for every kind of
                // access — a pre-upgrade fallback response must keep reporting that
                // a runtime request would return more. The fulfillment row lands at
                // the current position in the Flight stream, which is what makes the
                // value rewindable per stage. Promise resolution is idempotent, so
                // repeated accesses are free.
                _workUnitStore_runtimeDataAccessed;
                (_workUnitStore_runtimeDataAccessed = workUnitStore.runtimeDataAccessed) == null ? void 0 : _workUnitStore_runtimeDataAccessed.resolve(true);
                // Hint cell (holds the build-constant
                // PrefetchHint.ShouldAttemptStaticPrefetch value directly): a
                // fallback-param access is transient when the route is
                // fallback-upgradeable — ISR later produces the concrete prerender a
                // static prefetch attempt would hit — so it leaves the hint intact.
                // (Until that upgrade, the response-level flag above keeps directing
                // the client to a runtime fallback; the hint only costs a wasted
                // static attempt in the interim.) Every other access clears it.
                const hintCell = workUnitStore.shouldAttemptStaticPrefetch;
                if (hintCell !== null && (!isFallbackParamAccess || !workUnitStore.isFallbackUpgradeable)) {
                    hintCell.current = false;
                }
                break;
            }
        case 'prerender-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'prerender-runtime':
        case 'validation-client':
        case 'request':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
        case 'generate-static-params':
            break;
        default:
            workUnitStore;
    }
}
function makeClientHookHangingPromise(signal, error) {
    return makeHangingPromiseWithError(signal, error);
}
function makeHangingPromiseWithError(signal, error) {
    if (signal.aborted) {
        return Promise.reject(error);
    } else {
        const hangingPromise = new Promise((_, reject)=>{
            const boundRejection = reject.bind(null, error);
            let currentListeners = abortListenersBySignal.get(signal);
            if (currentListeners) {
                currentListeners.push(boundRejection);
            } else {
                const listeners = [
                    boundRejection
                ];
                abortListenersBySignal.set(signal, listeners);
                signal.addEventListener('abort', ()=>{
                    for(let i = 0; i < listeners.length; i++){
                        listeners[i]();
                    }
                }, {
                    once: true
                });
            }
        });
        // We are fine if no one actually awaits this promise. We shouldn't consider this an unhandled rejection so
        // we attach a noop catch handler here to suppress this warning. If you actually await somewhere or construct
        // your own promise out of it you'll need to ensure you handle the error when it rejects.
        hangingPromise.catch(ignoreReject);
        return hangingPromise;
    }
}
function ignoreReject() {}
function makePromiseFromTrigger(trigger, value) {
    const promise = trigger.then(()=>value);
    promise.catch(ignoreReject);
    return promise;
}
function makeDevtoolsIOAwarePromise(underlying, requestStore, stage) {
    if (requestStore.stagedRendering) {
        // We resolve each stage in a timeout, so React DevTools will pick this up as IO.
        return requestStore.stagedRendering.delayUntilStage(stage, undefined, underlying);
    }
    // in React DevTools if we resolve in a setTimeout we will observe
    // the promise resolution as something that can suspend a boundary or root.
    return new Promise((resolve)=>{
        // Must use setTimeout to be considered IO React DevTools. setImmediate will not work.
        setTimeout(()=>{
            resolve(underlying);
        }, 0);
    });
}
const RENDER_STAGES_BY_DATA_KIND = {
    sessionData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$staged$2d$rendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderStage"].ShellRuntime,
    staticLinkData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$staged$2d$rendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderStage"].Static,
    runtimeLinkData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$staged$2d$rendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderStage"].Runtime
};
function applyOwnerStack(error) {
    if ("TURBOPACK compile-time truthy", 1) {
        var _getClientReact_captureOwnerStack, _getClientReact, _getServerReact_captureOwnerStack, _getServerReact;
        let ownerStack;
        const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
        // captureOwnerStack() returns the owner stack for the current React
        // rendering context. Inside a cache scope this only includes the inner
        // component tree. The outer owner stack (captured before entering the
        // cache boundary in use-cache-wrapper.ts) is stored on the cache store.
        // We concatenate both to get the full component tree.
        const innerOwnerStack = ((_getClientReact = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$runtime$2d$reacts$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$runtime$2d$reacts$2e$external$2e$js$2c$__cjs$29$__["getClientReact"])()) == null ? void 0 : (_getClientReact_captureOwnerStack = _getClientReact.captureOwnerStack) == null ? void 0 : _getClientReact_captureOwnerStack.call(_getClientReact)) ?? ((_getServerReact = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$runtime$2d$reacts$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$runtime$2d$reacts$2e$external$2e$js$2c$__cjs$29$__["getServerReact"])()) == null ? void 0 : (_getServerReact_captureOwnerStack = _getServerReact.captureOwnerStack) == null ? void 0 : _getServerReact_captureOwnerStack.call(_getServerReact));
        switch(workUnitStore == null ? void 0 : workUnitStore.type){
            case 'cache':
            case 'private-cache':
                ownerStack = (innerOwnerStack || '') + (workUnitStore.outerOwnerStack || '') || undefined;
                break;
            case 'unstable-cache':
            case 'request':
            case 'prerender':
            case 'prerender-ppr':
            case 'prerender-legacy':
            case 'prerender-runtime':
            case 'prerender-client':
            case 'validation-client':
            case 'generate-static-params':
            case undefined:
                ownerStack = innerOwnerStack;
                break;
            default:
                workUnitStore;
        }
        if (ownerStack) {
            let stack = ownerStack;
            if (error.stack) {
                const frames = [];
                for (const frame of error.stack.split('\n').slice(1)){
                    if (frame.includes('react_stack_bottom_frame')) {
                        break;
                    }
                    frames.push(frame);
                }
                stack = '\n' + frames.join('\n') + stack;
            }
            error.stack = error.name + ': ' + error.message + stack;
        }
    }
    return error;
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/lib/params-utils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "allParamsAreRootParams",
    ()=>allParamsAreRootParams,
    "hasFallbackRouteParams",
    ()=>hasFallbackRouteParams,
    "hasNonRootStaticParams",
    ()=>hasNonRootStaticParams,
    "isEmptyParams",
    ()=>isEmptyParams
]);
function hasNonRootStaticParams(params, rootParams, fallbackParams) {
    for(const paramName in params){
        if (!Object.hasOwn(rootParams, paramName) && isStaticParam(paramName, fallbackParams)) {
            return true;
        }
    }
    return false;
}
function isStaticParam(paramName, fallbackParams) {
    // NOTE: Assume that undefined fallback params mean that all of the params are static.
    if (!fallbackParams) return true;
    // If the param isn't a fallback param, it must be static.
    return !fallbackParams.has(paramName);
}
function allParamsAreRootParams(underlyingParams, rootParams) {
    for(const paramName in underlyingParams){
        if (!Object.hasOwn(rootParams, paramName)) {
            return false;
        }
    }
    return true;
}
function isEmptyParams(params) {
    for(const _paramKey in params){
        return false;
    }
    return true;
}
function hasFallbackRouteParams(underlyingParams, fallbackParams) {
    if (fallbackParams) {
        for(let key in underlyingParams){
            if (fallbackParams.has(key)) {
                return true;
            }
        }
    }
    return false;
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/lib/router-utils/is-postpone.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isPostpone",
    ()=>isPostpone
]);
const REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
function isPostpone(error) {
    return typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/request/params.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createParamsFromClient",
    ()=>createParamsFromClient,
    "createPrerenderParamsForClientSegment",
    ()=>createPrerenderParamsForClientSegment,
    "createServerParamsForMetadata",
    ()=>createServerParamsForMetadata,
    "createServerParamsForRoute",
    ()=>createServerParamsForRoute,
    "createServerParamsForServerSegment",
    ()=>createServerParamsForServerSegment
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$vary$2d$params$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/vary-params.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/utils/reflect-utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/dynamic-rendering-utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$create$2d$deduped$2d$by$2d$callsite$2d$server$2d$error$2d$logger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/create-deduped-by-callsite-server-error-logger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$dynamic$2d$access$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$dynamic$2d$access$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$params$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/lib/params-utils.js [app-ssr] (ecmascript)");
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
function createParamsFromClient(underlyingParams) {
    const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
    if (!workStore) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('Expected workStore to be initialized'), "__NEXT_ERROR_CODE", {
            value: "E1068",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-client':
            case 'prerender-ppr':
            case 'prerender-legacy':
                // Client params don't need additional vary tracking because by the
                // time they reach the client, the access would have already been
                // tracked by the server.
                const varyParamsAccumulator = null;
                return createStaticPrerenderParams(underlyingParams, null, workStore, workUnitStore, varyParamsAccumulator);
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createParamsFromClient should not be called in cache contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E736",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-runtime':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createParamsFromClient should not be called in a runtime prerender.'), "__NEXT_ERROR_CODE", {
                    value: "E770",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createParamsFromClient should not be called inside generateStaticParams.'), "__NEXT_ERROR_CODE", {
                    value: "E1122",
                    enumerable: false,
                    configurable: true
                });
            case 'validation-client':
                {
                    if (workUnitStore.validationSamples) {
                        return createClientParamsInInstantValidation(underlyingParams, workStore, workUnitStore.validationSamples);
                    }
                    return makeUntrackedParams(underlyingParams);
                }
            case 'request':
                {
                    if (workUnitStore.validationSamples) {
                        return createClientParamsInInstantValidation(underlyingParams, workStore, workUnitStore.validationSamples);
                    }
                    if ("TURBOPACK compile-time truthy", 1) {
                        const fallbackParams = workUnitStore.fallbackParams;
                        const userspaceParams = underlyingParams;
                        return createRenderParamsInDev(underlyingParams, userspaceParams, fallbackParams, workStore, workUnitStore);
                    } else //TURBOPACK unreachable
                    ;
                }
            default:
                workUnitStore;
        }
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["throwInvariantForMissingStore"])();
}
function createServerParamsForMetadata(underlyingParams, optionalCatchAllParamName) {
    const metadataVaryParamsAccumulator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$vary$2d$params$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMetadataVaryParamsAccumulator"])();
    return createServerParamsForServerSegment(underlyingParams, optionalCatchAllParamName, metadataVaryParamsAccumulator);
}
function createServerParamsForRoute(underlyingParams, varyParamsAccumulator = null) {
    const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
    if (!workStore) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('Expected workStore to be initialized'), "__NEXT_ERROR_CODE", {
            value: "E1068",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-ppr':
            case 'prerender-legacy':
                return createStaticPrerenderParams(underlyingParams, null, workStore, workUnitStore, varyParamsAccumulator);
            case 'prerender-client':
            case 'validation-client':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createServerParamsForRoute should not be called in client contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E1064",
                    enumerable: false,
                    configurable: true
                });
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createServerParamsForRoute should not be called in cache contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E738",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createServerParamsForRoute should not be called inside generateStaticParams.'), "__NEXT_ERROR_CODE", {
                    value: "E1131",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-runtime':
                {
                    throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createServerParamsForRoute should not be called in runtime prerenders.'), "__NEXT_ERROR_CODE", {
                        value: "E1367",
                        enumerable: false,
                        configurable: true
                    });
                }
            case 'request':
                if ("TURBOPACK compile-time truthy", 1) {
                    const fallbackParams = workUnitStore.fallbackParams;
                    const userspaceParams = underlyingParams;
                    return createRenderParamsInDev(underlyingParams, userspaceParams, fallbackParams, workStore, workUnitStore);
                } else //TURBOPACK unreachable
                ;
            default:
                workUnitStore;
        }
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["throwInvariantForMissingStore"])();
}
function createServerParamsForServerSegment(underlyingParams, optionalCatchAllParamName, varyParamsAccumulator) {
    const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
    if (!workStore) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('Expected workStore to be initialized'), "__NEXT_ERROR_CODE", {
            value: "E1068",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-client':
            case 'prerender-ppr':
            case 'prerender-legacy':
                return createStaticPrerenderParams(underlyingParams, optionalCatchAllParamName, workStore, workUnitStore, varyParamsAccumulator);
            case 'validation-client':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createServerParamsForServerSegment should not be called in client contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E1101",
                    enumerable: false,
                    configurable: true
                });
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createServerParamsForServerSegment should not be called in cache contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E743",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createServerParamsForServerSegment should not be called inside generateStaticParams.'), "__NEXT_ERROR_CODE", {
                    value: "E1120",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-runtime':
                return createRuntimePrerenderParams(underlyingParams, optionalCatchAllParamName, workStore, workUnitStore, varyParamsAccumulator);
            case 'request':
                {
                    return createRenderParamsForPage(workStore, workUnitStore, underlyingParams, optionalCatchAllParamName, varyParamsAccumulator);
                }
            default:
                workUnitStore;
        }
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["throwInvariantForMissingStore"])();
}
function createPrerenderParamsForClientSegment(underlyingParams) {
    const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
    if (!workStore) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('Missing workStore in createPrerenderParamsForClientSegment'), "__NEXT_ERROR_CODE", {
            value: "E773",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-client':
                const fallbackParams = workUnitStore.fallbackRouteParams;
                if (fallbackParams) {
                    for(let key in underlyingParams){
                        if (fallbackParams.has(key)) {
                            // This params object has one or more fallback params, so we need
                            // to consider the awaiting of this params object "dynamic". Since
                            // we are in cacheComponents mode we encode this as a promise that never
                            // resolves.
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeFallbackParamsHangingPromise"])(workUnitStore.renderSignal, workStore.route, '`params`', workUnitStore);
                        }
                    }
                }
                break;
            case 'validation-client':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createPrerenderParamsForClientSegment should not be called in validation contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E1099",
                    enumerable: false,
                    configurable: true
                });
                break;
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createPrerenderParamsForClientSegment should not be called in cache contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E734",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createPrerenderParamsForClientSegment should not be called inside generateStaticParams.'), "__NEXT_ERROR_CODE", {
                    value: "E1126",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-runtime':
            case 'prerender-ppr':
            case 'prerender-legacy':
            case 'request':
                break;
            default:
                workUnitStore;
        }
    }
    // We're prerendering in a mode that does not abort. We resolve the promise without
    // any tracking because we're just transporting a value from server to client where the tracking
    // will be applied.
    return Promise.resolve(underlyingParams);
}
function createStaticPrerenderParams(underlyingParams, optionalCatchAllParamName, workStore, prerenderStore, varyParamsAccumulator) {
    switch(prerenderStore.type){
        case 'prerender':
            {
                let userspaceParams = underlyingParams;
                if (varyParamsAccumulator !== null) {
                    userspaceParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$vary$2d$params$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createVaryingParams"])(varyParamsAccumulator, underlyingParams, optionalCatchAllParamName);
                }
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$params$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmptyParams"])(underlyingParams)) {
                    // This route has no params.
                    return makeUntrackedParams(userspaceParams);
                }
                const fallbackParams = prerenderStore.fallbackRouteParams;
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$params$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasFallbackRouteParams"])(underlyingParams, fallbackParams)) {
                    // This params object has one or more fallback params, so we need
                    // to consider the awaiting of this params object dynamic.
                    return makeHangingParams(underlyingParams, workStore, prerenderStore);
                }
                // All params are static.
                const { stagedRendering } = prerenderStore;
                if (stagedRendering) {
                    // Even if all params are static, we need to exclude them from the app shell
                    // by delaying them to the static stage. However, root params are allowed in shells,
                    // so if all the params are root params, they can be included as well.
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$params$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allParamsAreRootParams"])(underlyingParams, prerenderStore.rootParams)) {
                        const staticParamsStage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RENDER_STAGES_BY_DATA_KIND"].staticLinkData;
                        return stagedRendering.delayUntilStage(staticParamsStage, 'params', userspaceParams);
                    }
                }
                return makeUntrackedParams(userspaceParams);
            }
        case 'prerender-client':
            {
                const fallbackParams = prerenderStore.fallbackRouteParams;
                if (fallbackParams) {
                    for(const key in underlyingParams){
                        if (fallbackParams.has(key)) {
                            // This params object has one or more fallback params, so we need
                            // to consider the awaiting of this params object "dynamic". Since
                            // we are in cacheComponents mode we encode this as a promise that never
                            // resolves.
                            return makeHangingParams(underlyingParams, workStore, prerenderStore);
                        }
                    }
                }
                break;
            }
        case 'prerender-ppr':
            {
                const fallbackParams = prerenderStore.fallbackRouteParams;
                if (fallbackParams) {
                    for(const key in underlyingParams){
                        if (fallbackParams.has(key)) {
                            return makeErroringParams(underlyingParams, fallbackParams, workStore, prerenderStore);
                        }
                    }
                }
                break;
            }
        case 'prerender-legacy':
            break;
        default:
            prerenderStore;
    }
    let userspaceParams = underlyingParams;
    if (varyParamsAccumulator !== null) {
        userspaceParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$vary$2d$params$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createVaryingParams"])(varyParamsAccumulator, underlyingParams, optionalCatchAllParamName);
    }
    return makeUntrackedParams(userspaceParams);
}
function createRuntimePrerenderParams(underlyingParams, optionalCatchAllParamName, workStore, workUnitStore, varyParamsAccumulator) {
    let userspaceParams = underlyingParams;
    if (varyParamsAccumulator !== null) {
        userspaceParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$vary$2d$params$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createVaryingParams"])(varyParamsAccumulator, underlyingParams, optionalCatchAllParamName);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$params$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmptyParams"])(underlyingParams)) {
        // This route has no params.
        return makeUntrackedParams(userspaceParams);
    }
    const { stagedRendering } = workUnitStore;
    if (!stagedRendering) {
        // If there's no staging, we're in a prospective runtime prerender.
        if (workUnitStore.isSessionShell) {
            // If we're warming up for a session shell, params should be hanging,
            // because they'll be a hanging input in the final prerender.
            return makeHangingParams(underlyingParams, workStore, workUnitStore);
        } else {
            return makeUntrackedParams(userspaceParams);
        }
    }
    // We don't have fallbackParams in runtime prerenders, so we don't know
    // when params are static. However, root params are static by definition,
    // so we can at least check for that.
    // Note that resolving them without a delay is valid because root params are
    // allowed in shells.
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$params$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allParamsAreRootParams"])(underlyingParams, workUnitStore.rootParams)) {
        return makeUntrackedParams(userspaceParams);
    }
    // Semantically, we should resolve static params in the static stage.
    // But params are link data, and we need to recover a param-less session shell,
    // so we delay all params until the runtime stage instead.
    const staticParamsStage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RENDER_STAGES_BY_DATA_KIND"].runtimeLinkData;
    return stagedRendering.delayUntilStage(staticParamsStage, 'params', userspaceParams);
}
function createRenderParamsForPage(workStore, workUnitStore, underlyingParams, optionalCatchAllParamName, varyParamsAccumulator) {
    const { stagedRendering, asyncApiPromises, validationSamples } = workUnitStore;
    // Distinguish the params that we expose to userspace (potentially wrapped in proxies)
    // and the underlying object containing params values. We do this because wrappers
    // like `instrumentParamsPromiseWithDevWarnings` need to be able to get the known param names
    // without triggering other wrapper proxies.
    let userspaceParams = underlyingParams;
    if (validationSamples) {
        userspaceParams = createServerParamsProxyForInstantValidation(underlyingParams, workStore, validationSamples);
    }
    if (varyParamsAccumulator) {
        userspaceParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$vary$2d$params$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createVaryingParams"])(varyParamsAccumulator, userspaceParams, optionalCatchAllParamName);
    }
    if (stagedRendering && asyncApiPromises) {
        return createStagedRenderParams(workStore, workUnitStore, stagedRendering, asyncApiPromises, underlyingParams, userspaceParams);
    }
    // No staged rendering = no cacheComponents, or cacheComponents prod without cachedNavigations
    if ("TURBOPACK compile-time truthy", 1) {
        const fallbackParams = workUnitStore.fallbackParams;
        return createRenderParamsInDev(underlyingParams, userspaceParams, fallbackParams, workStore, workUnitStore);
    } else //TURBOPACK unreachable
    ;
}
function createStagedRenderParams(workStore, workUnitStore, stagedRendering, asyncApiPromises, underlyingParams, userspaceParams) {
    const promise = createStagedRenderParamsImpl(workUnitStore, stagedRendering, asyncApiPromises, underlyingParams, userspaceParams);
    if ("TURBOPACK compile-time truthy", 1) {
        return instrumentParamsPromiseWithDevWarnings(underlyingParams, promise, workStore);
    } else //TURBOPACK unreachable
    ;
}
function createStagedRenderParamsImpl(workUnitStore, stagedRendering, asyncApiPromises, /** The actual param values, without any instrumentation */ underlyingParams, /** The params object to return to userspace, possibly wrapped in a proxy */ userspaceParams) {
    // If the route has no params, they should resolve immediately.
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$params$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmptyParams"])(underlyingParams)) {
        return makeUntrackedParams(userspaceParams);
    }
    // If we have fallback params, then they should always resolve in the runtime link data stage.
    // We do this indirectly via the shared params parent for better debug info.
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$params$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasFallbackRouteParams"])(underlyingParams, workUnitStore.fallbackParams)) {
        return createParamsPromiseFromTrigger(asyncApiPromises.sharedParamsParent, userspaceParams);
    }
    // All params are static.
    // If we're rendering with shells, even static params must be delayed to exclude them from the shell.
    // However, root params are allowed in shells, so if all the params are root params, they can be included as well.
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$params$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allParamsAreRootParams"])(underlyingParams, workUnitStore.rootParams)) {
        // For a dynamic request we generally want to recover a static shell,
        // so static params can resolve in the static stage, because session
        // shells are handled with a separate render.
        // However, in dev we might need to recover a session shell for instant validation.
        // This is indicated by `needsSessionShell`.
        const staticParamsStage = workUnitStore.needsSessionShell ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RENDER_STAGES_BY_DATA_KIND"].runtimeLinkData : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RENDER_STAGES_BY_DATA_KIND"].staticLinkData;
        return stagedRendering.delayUntilStage(staticParamsStage, 'params', userspaceParams);
    }
    return makeUntrackedParams(userspaceParams);
}
function createParamsPromiseFromTrigger(trigger, userspaceParams) {
    if ("TURBOPACK compile-time truthy", 1) {
        // We wrap each instance of params in a `new Promise()`, which lets us show each
        // await a different set of values. This is important when all awaits
        // are in third party which would otherwise track all the way to the
        // internal params.
        const promise = new Promise((resolve, reject)=>{
            trigger.then(()=>resolve(userspaceParams), reject);
        });
        promise.catch(noop);
        // @ts-expect-error
        promise.displayName = 'params';
        return promise;
    } else //TURBOPACK unreachable
    ;
}
function noop() {}
function createServerParamsProxyForInstantValidation(underlyingParams, workStore, validationSamples) {
    const { createExhaustiveParamsProxy } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/instant-validation/instant-samples.js [app-ssr] (ecmascript)");
    const declaredParams = new Set(Object.keys(validationSamples.params ?? {}));
    return createExhaustiveParamsProxy(underlyingParams, declaredParams, workStore.route);
}
function createClientParamsInInstantValidation(underlyingParams, workStore, validationSamples) {
    const { createExhaustiveParamsProxy } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/instant-validation/instant-samples.js [app-ssr] (ecmascript)");
    const declaredParams = new Set(Object.keys((validationSamples == null ? void 0 : validationSamples.params) ?? {}));
    const proxiedUnderlying = createExhaustiveParamsProxy(underlyingParams, declaredParams, workStore.route);
    return Promise.resolve(proxiedUnderlying);
}
function createRenderParamsInProd(userspaceParams) {
    return makeUntrackedParams(userspaceParams);
}
function createRenderParamsInDev(underlyingParams, userpaceParams, fallbackParams, workStore, requestStore) {
    return makeDynamicallyTrackedParamsWithDevWarnings(underlyingParams, userpaceParams, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$params$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasFallbackRouteParams"])(underlyingParams, fallbackParams), workStore, requestStore);
}
const CachedParams = new WeakMap();
const fallbackParamsProxyHandler = {
    get: function get(target, prop, receiver) {
        if (prop === 'then' || prop === 'catch' || prop === 'finally') {
            const originalMethod = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
            return ({
                [prop]: (...args)=>{
                    // Record against the store that's active at access time: the
                    // hanging promise is cached by params object across prerender
                    // stores, so the store that created it may not be the one that's
                    // rendering when it's finally awaited.
                    const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
                    if (workUnitStore !== undefined) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackFallbackParamsAccessed"])(workUnitStore);
                    }
                    const store = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$dynamic$2d$access$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$dynamic$2d$access$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["dynamicAccessAsyncStorage"].getStore();
                    if (store) {
                        store.abortController.abort(Object.defineProperty(new Error(`Accessed fallback \`params\` during prerendering.`), "__NEXT_ERROR_CODE", {
                            value: "E691",
                            enumerable: false,
                            configurable: true
                        }));
                    }
                    return new Proxy(originalMethod.apply(target, args), fallbackParamsProxyHandler);
                }
            })[prop];
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
    }
};
function makeHangingParams(underlyingParams, workStore, prerenderStore) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    const promise = new Proxy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeFallbackParamsHangingPromise"])(prerenderStore.renderSignal, workStore.route, '`params`', // or not it reads params, so recording the access at creation would mark
    // every render. The access is tracked in the proxy traps instead.
    null), fallbackParamsProxyHandler);
    CachedParams.set(underlyingParams, promise);
    return promise;
}
function makeErroringParams(underlyingParams, fallbackParams, workStore, prerenderStore) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    const augmentedUnderlying = {
        ...underlyingParams
    };
    // We don't use makeResolvedReactPromise here because params
    // supports copying with spread and we don't want to unnecessarily
    // instrument the promise with spreadable properties of ReactPromise.
    const promise = Promise.resolve(augmentedUnderlying);
    CachedParams.set(underlyingParams, promise);
    Object.keys(underlyingParams).forEach((prop)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wellKnownProperties"].has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            if (fallbackParams.has(prop)) {
                Object.defineProperty(augmentedUnderlying, prop, {
                    get () {
                        const expression = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["describeStringPropertyAccess"])('params', prop);
                        // In most dynamic APIs we also throw if `dynamic = "error"` however
                        // for params is only dynamic when we're generating a fallback shell
                        // and even when `dynamic = "error"` we still support generating dynamic
                        // fallback shells
                        // TODO remove this comment when cacheComponents is the default since there
                        // will be no `dynamic = "error"`
                        if (prerenderStore.type === 'prerender-ppr') {
                            // PPR Prerender (no cacheComponents)
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["postponeWithTracking"])(workStore.route, expression, prerenderStore.dynamicTracking);
                        } else {
                            // Legacy Prerender
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["throwToInterruptStaticGeneration"])(expression, workStore, prerenderStore);
                        }
                    },
                    enumerable: true
                });
            }
        }
    });
    return promise;
}
function makeUntrackedParams(underlyingParams) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    const promise = Promise.resolve(underlyingParams);
    CachedParams.set(underlyingParams, promise);
    return promise;
}
function makeDynamicallyTrackedParamsWithDevWarnings(underlyingParams, userspaceParams, hasFallbackParams, workStore, requestStore) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    // We don't use makeResolvedReactPromise here because params
    // supports copying with spread and we don't want to unnecessarily
    // instrument the promise with spreadable properties of ReactPromise.
    const promise = hasFallbackParams ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeDevtoolsIOAwarePromise"])(userspaceParams, requestStore, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RENDER_STAGES_BY_DATA_KIND"].runtimeLinkData) : Promise.resolve(userspaceParams);
    const proxiedPromise = instrumentParamsPromiseWithDevWarnings(underlyingParams, promise, workStore);
    CachedParams.set(underlyingParams, proxiedPromise);
    return proxiedPromise;
}
function instrumentParamsPromiseWithDevWarnings(underlyingParams, promise, workStore) {
    // Track which properties we should warn for.
    const proxiedProperties = new Set();
    Object.keys(underlyingParams).forEach((prop)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wellKnownProperties"].has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            proxiedProperties.add(prop);
        }
    });
    return new Proxy(promise, {
        get (target, prop, receiver) {
            if (typeof prop === 'string') {
                if (proxiedProperties.has(prop)) {
                    const expression = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["describeStringPropertyAccess"])('params', prop);
                    warnForSyncAccess(workStore.route, expression);
                }
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
        },
        set (target, prop, value, receiver) {
            if (typeof prop === 'string') {
                proxiedProperties.delete(prop);
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].set(target, prop, value, receiver);
        },
        ownKeys (target) {
            const expression = '`...params` or similar expression';
            warnForSyncAccess(workStore.route, expression);
            return Reflect.ownKeys(target);
        }
    });
}
const warnForSyncAccess = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$create$2d$deduped$2d$by$2d$callsite$2d$server$2d$error$2d$logger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDedupedByCallsiteServerErrorLoggerDev"])(createParamsAccessError);
function createParamsAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`params\` is a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E834",
        enumerable: false,
        configurable: true
    });
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/request/params.js [app-ssr] (ecmascript) <export createParamsFromClient as createClientParams>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClientParams",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$params$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createParamsFromClient"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$params$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/request/params.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/request/search-params.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPrerenderSearchParamsForClientPage",
    ()=>createPrerenderSearchParamsForClientPage,
    "createSearchParamsFromClient",
    ()=>createSearchParamsFromClient,
    "createServerSearchParamsForMetadata",
    ()=>createServerSearchParamsForMetadata,
    "createServerSearchParamsForServerPage",
    ()=>createServerSearchParamsForServerPage,
    "makeErroringSearchParamsForUseCache",
    ()=>makeErroringSearchParamsForUseCache
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$vary$2d$params$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/vary-params.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$dynamic$2d$access$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$dynamic$2d$access$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/dynamic-rendering-utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$create$2d$deduped$2d$by$2d$callsite$2d$server$2d$error$2d$logger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/create-deduped-by-callsite-server-error-logger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/utils/reflect-utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/request/utils.js [app-ssr] (ecmascript)");
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
function createSearchParamsFromClient(underlyingSearchParams) {
    const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
    if (!workStore) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('Expected workStore to be initialized'), "__NEXT_ERROR_CODE", {
            value: "E1068",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-client':
            case 'prerender-ppr':
            case 'prerender-legacy':
                return createStaticPrerenderSearchParams(workStore, workUnitStore);
            case 'prerender-runtime':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createSearchParamsFromClient should not be called in a runtime prerender.'), "__NEXT_ERROR_CODE", {
                    value: "E769",
                    enumerable: false,
                    configurable: true
                });
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createSearchParamsFromClient should not be called in cache contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E739",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createSearchParamsFromClient should not be called inside generateStaticParams.'), "__NEXT_ERROR_CODE", {
                    value: "E1133",
                    enumerable: false,
                    configurable: true
                });
            case 'validation-client':
                {
                    if (workUnitStore.validationSamples) {
                        return createClientSearchParamsInValidation(underlyingSearchParams, workStore, workUnitStore);
                    }
                    return makeUntrackedSearchParams(underlyingSearchParams);
                }
            case 'request':
                return createRenderSearchParams(underlyingSearchParams, workStore, workUnitStore);
            default:
                workUnitStore;
        }
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["throwInvariantForMissingStore"])();
}
function createServerSearchParamsForMetadata(underlyingSearchParams) {
    const metadataVaryParamsAccumulator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$vary$2d$params$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMetadataVaryParamsAccumulator"])();
    return createServerSearchParamsForServerPage(underlyingSearchParams, metadataVaryParamsAccumulator);
}
function createServerSearchParamsForServerPage(underlyingSearchParams, varyParamsAccumulator) {
    const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
    if (!workStore) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('Expected workStore to be initialized'), "__NEXT_ERROR_CODE", {
            value: "E1068",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-client':
            case 'prerender-ppr':
            case 'prerender-legacy':
                return createStaticPrerenderSearchParams(workStore, workUnitStore);
            case 'validation-client':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createServerSearchParamsForServerPage should not be called in a client validation.'), "__NEXT_ERROR_CODE", {
                    value: "E1066",
                    enumerable: false,
                    configurable: true
                });
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createServerSearchParamsForServerPage should not be called in cache contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E747",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createServerSearchParamsForServerPage should not be called inside generateStaticParams.'), "__NEXT_ERROR_CODE", {
                    value: "E1128",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-runtime':
                return createRuntimePrerenderSearchParams(underlyingSearchParams, workStore, workUnitStore, varyParamsAccumulator);
            case 'request':
                return createRenderSearchParams(underlyingSearchParams, workStore, workUnitStore);
            default:
                workUnitStore;
        }
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["throwInvariantForMissingStore"])();
}
function createPrerenderSearchParamsForClientPage() {
    const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
    if (!workStore) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('Expected workStore to be initialized'), "__NEXT_ERROR_CODE", {
            value: "E1068",
            enumerable: false,
            configurable: true
        });
    }
    if (workStore.forceStatic) {
        // When using forceStatic we override all other logic and always just return an empty
        // dictionary object.
        return Promise.resolve({});
    }
    const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-client':
                // We're prerendering in a mode that aborts (cacheComponents) and should stall
                // the promise to ensure the RSC side is considered dynamic
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeRuntimeHangingPromise"])(workUnitStore.renderSignal, workStore.route, '`searchParams`', workUnitStore);
            case 'validation-client':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createPrerenderSearchParamsForClientPage should not be called in a client validation.'), "__NEXT_ERROR_CODE", {
                    value: "E1061",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-runtime':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createPrerenderSearchParamsForClientPage should not be called in a runtime prerender.'), "__NEXT_ERROR_CODE", {
                    value: "E768",
                    enumerable: false,
                    configurable: true
                });
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createPrerenderSearchParamsForClientPage should not be called in cache contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E746",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('createPrerenderSearchParamsForClientPage should not be called inside generateStaticParams.'), "__NEXT_ERROR_CODE", {
                    value: "E1124",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-ppr':
            case 'prerender-legacy':
            case 'request':
                return Promise.resolve({});
            default:
                workUnitStore;
        }
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["throwInvariantForMissingStore"])();
}
function createStaticPrerenderSearchParams(workStore, prerenderStore) {
    if (workStore.forceStatic) {
        // When using forceStatic we override all other logic and always just return an empty
        // dictionary object.
        return Promise.resolve({});
    }
    switch(prerenderStore.type){
        case 'prerender':
        case 'prerender-client':
            // We are in a cacheComponents (PPR or otherwise) prerender
            return makeHangingSearchParams(workStore, prerenderStore);
        case 'prerender-ppr':
        case 'prerender-legacy':
            // We are in a legacy static generation and need to interrupt the
            // prerender when search params are accessed.
            return makeErroringSearchParams(workStore, prerenderStore);
        default:
            return prerenderStore;
    }
}
function createRuntimePrerenderSearchParams(underlyingSearchParams, workStore, workUnitStore, varyParamsAccumulator) {
    const userspaceSearchParams = varyParamsAccumulator !== null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$vary$2d$params$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createVaryingSearchParams"])(varyParamsAccumulator, underlyingSearchParams) : underlyingSearchParams;
    const result = makeUntrackedSearchParams(userspaceSearchParams);
    const { stagedRendering } = workUnitStore;
    if (!stagedRendering) {
        // If there's no staging, we're in a prospective runtime prerender.
        if (workUnitStore.isSessionShell) {
            // If we're warming up for a session shell, search params should hang,
            // because they'll be a hanging input in the final prerender.
            return makeHangingSearchParams(workStore, workUnitStore);
        }
        return result;
    }
    // Unlike `createRuntimePrerenderParams`, which uses `delayUntilStage`, we
    // resolve with `waitForStage(...).then(...)` here. Switching search params to
    // `delayUntilStage` drops the source code frame from the instant-validation
    // "URL data outside of Suspense" error when a page awaits `searchParams` at
    // the top level (params, read via a nested component, is unaffected). See the
    // `missing suspense around search params` cases in the instant-validation
    // `suspense-boundaries` tests. The underlying reason in React's async I/O
    // await tracking isn't understood yet. TODO: align search params with params
    // on `delayUntilStage` once resolved.
    const searchParamsStage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RENDER_STAGES_BY_DATA_KIND"].runtimeLinkData;
    return stagedRendering.waitForStage(searchParamsStage).then(()=>result);
}
function createRenderSearchParams(underlyingSearchParams, workStore, requestStore) {
    const { asyncApiPromises, validationSamples } = requestStore;
    if (asyncApiPromises) {
        let userspaceSearchParams = underlyingSearchParams;
        if (validationSamples) {
            userspaceSearchParams = createSearchParamsProxyForInstantValidation(workStore, validationSamples, underlyingSearchParams);
        }
        return createStagedRenderSearchParams(workStore, asyncApiPromises, underlyingSearchParams, userspaceSearchParams);
    }
    // No staged rendering = no cacheComponents, or cacheComponents prod without cachedNavigations
    if (workStore.forceStatic) {
        // When using forceStatic we override all other logic and always just return an empty
        // dictionary object.
        return Promise.resolve({});
    }
    if ("TURBOPACK compile-time truthy", 1) {
        // Semantically we only need the dev tracking when running in `next dev`
        // but since you would never use next dev with production NODE_ENV we use this
        // as a proxy so we can statically exclude this code from production builds.
        return makeUntrackedSearchParamsWithDevWarnings(underlyingSearchParams, workStore, requestStore);
    } else //TURBOPACK unreachable
    ;
}
function createStagedRenderSearchParams(workStore, asyncApiPromises, underlyingSearchParams, userspaceSearchParams) {
    const trigger = asyncApiPromises.sharedSearchParamsParent;
    if ("TURBOPACK compile-time truthy", 1) {
        // We wrap each instance of searchParams in a `new Promise()`.
        // This is important when all awaits are in third party which would otherwise
        // track all the way to the internal params.
        const promise = new Promise((resolve, reject)=>{
            trigger.then(()=>resolve(userspaceSearchParams), reject);
        });
        // @ts-expect-error
        promise.displayName = 'searchParams';
        promise.catch(ignoreReject);
        return instrumentSearchParamsPromiseWithDevWarnings(underlyingSearchParams, promise, workStore);
    } else //TURBOPACK unreachable
    ;
}
function createSearchParamsProxyForInstantValidation(workStore, validationSamples, underlyingSearchParams) {
    const { createExhaustiveSearchParamsProxy } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/instant-validation/instant-samples.js [app-ssr] (ecmascript)");
    const declaredKeys = new Set(Object.keys(validationSamples.searchParams ?? {}));
    return createExhaustiveSearchParamsProxy(underlyingSearchParams, declaredKeys, workStore.route);
}
const CachedSearchParams = new WeakMap();
const CachedSearchParamsForUseCache = new WeakMap();
function makeHangingSearchParams(workStore, prerenderStore) {
    const cachedSearchParams = CachedSearchParams.get(prerenderStore);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    const promise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeRuntimeHangingPromise"])(prerenderStore.renderSignal, workStore.route, '`searchParams`', // params, so recording the access at creation would mark every render.
    // The access is tracked in the proxy traps below instead.
    null);
    const trackSearchParamsAccessed = ()=>{
        // Record against the store that's active at access time: the promise is
        // created while the RSC payload is constructed, but typically accessed
        // later, during the render, under a different store.
        const workUnitStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workUnitAsyncStorage"].getStore();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackRuntimeDataAccessed"])(workUnitStore ?? prerenderStore);
    };
    const proxyHandler = {
        get (target, prop, receiver) {
            if (Object.hasOwn(target, prop)) {
                // The promise has this property directly. we must return it.
                // We know it isn't a dynamic access because it can only be something
                // that was previously written to the promise and thus not an underlying searchParam value
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
            }
            switch(prop){
                case 'then':
                case 'catch':
                case 'finally':
                    {
                        const originalMethod = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                        return ({
                            [prop]: (...args)=>{
                                const expression = '`await searchParams`, `searchParams.then`, or similar';
                                trackSearchParamsAccessed();
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["annotateDynamicAccess"])(expression, prerenderStore);
                                // Mirror `makeHangingParams`: when this never-resolving promise
                                // is awaited while a `use cache` key is being encoded
                                // (dynamicAccessAsyncStorage is set), abort so the surrounding
                                // cache bails out to a dynamic hole instead of hanging on it.
                                // Without this, a private cache that reads `searchParams` would
                                // stall the App Shell cache-warming render. Re-wrapping the
                                // result propagates the same behavior to promises derived via
                                // `.then`/`.catch`/`.finally` that are then passed into a cache.
                                const dynamicAccessStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$dynamic$2d$access$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$dynamic$2d$access$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["dynamicAccessAsyncStorage"].getStore();
                                if (dynamicAccessStore) {
                                    dynamicAccessStore.abortController.abort(Object.defineProperty(new Error('Accessed `searchParams` during prerendering.'), "__NEXT_ERROR_CODE", {
                                        value: "E1449",
                                        enumerable: false,
                                        configurable: true
                                    }));
                                }
                                return new Proxy(originalMethod.apply(target, args), proxyHandler);
                            }
                        })[prop];
                    }
                case 'status':
                    {
                        const expression = '`use(searchParams)`, `searchParams.status`, or similar';
                        trackSearchParamsAccessed();
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["annotateDynamicAccess"])(expression, prerenderStore);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                    }
                default:
                    {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                    }
            }
        }
    };
    const proxiedPromise = new Proxy(promise, proxyHandler);
    CachedSearchParams.set(prerenderStore, proxiedPromise);
    return proxiedPromise;
}
function makeErroringSearchParams(workStore, prerenderStore) {
    const cachedSearchParams = CachedSearchParams.get(workStore);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    const underlyingSearchParams = {};
    // For search params we don't construct a ReactPromise because we want to interrupt
    // rendering on any property access that was not set from outside and so we only want
    // to have properties like value and status if React sets them.
    const promise = Promise.resolve(underlyingSearchParams);
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            if (Object.hasOwn(promise, prop)) {
                // The promise has this property directly. we must return it.
                // We know it isn't a dynamic access because it can only be something
                // that was previously written to the promise and thus not an underlying searchParam value
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
            }
            if (typeof prop === 'string' && prop === 'then') {
                const expression = '`await searchParams`, `searchParams.then`, or similar';
                if (workStore.dynamicShouldError) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["throwWithStaticGenerationBailoutErrorWithDynamicError"])(workStore.route, expression);
                } else if (prerenderStore.type === 'prerender-ppr') {
                    // PPR Prerender (no cacheComponents)
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["postponeWithTracking"])(workStore.route, expression, prerenderStore.dynamicTracking);
                } else {
                    // Legacy Prerender
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["throwToInterruptStaticGeneration"])(expression, workStore, prerenderStore);
                }
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
        }
    });
    CachedSearchParams.set(workStore, proxiedPromise);
    return proxiedPromise;
}
function makeErroringSearchParamsForUseCache() {
    const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
    if (!workStore) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvariantError"]('Expected workStore to be initialized'), "__NEXT_ERROR_CODE", {
            value: "E1068",
            enumerable: false,
            configurable: true
        });
    }
    const cachedSearchParams = CachedSearchParamsForUseCache.get(workStore);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    const promise = Promise.resolve({});
    const proxiedPromise = new Proxy(promise, {
        get: function get(target, prop, receiver) {
            if (Object.hasOwn(promise, prop)) {
                // The promise has this property directly. we must return it. We know it
                // isn't a dynamic access because it can only be something that was
                // previously written to the promise and thus not an underlying
                // searchParam value
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
            }
            if (typeof prop === 'string' && (prop === 'then' || !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wellKnownProperties"].has(prop))) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["throwForSearchParamsAccessInUseCache"])(workStore, get);
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
        }
    });
    CachedSearchParamsForUseCache.set(workStore, proxiedPromise);
    return proxiedPromise;
}
function makeUntrackedSearchParams(underlyingSearchParams) {
    const cachedSearchParams = CachedSearchParams.get(underlyingSearchParams);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    const promise = Promise.resolve(underlyingSearchParams);
    CachedSearchParams.set(underlyingSearchParams, promise);
    return promise;
}
function makeUntrackedSearchParamsWithDevWarnings(underlyingSearchParams, workStore, requestStore) {
    const cachedSearchParams = CachedSearchParams.get(underlyingSearchParams);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    const promise = makeUntrackedSearchParamsWithDevWarningsImpl(underlyingSearchParams, workStore, requestStore);
    CachedSearchParams.set(requestStore, promise);
    return promise;
}
function makeUntrackedSearchParamsWithDevWarningsImpl(underlyingSearchParams, workStore, requestStore) {
    const promiseInitialized = {
        current: false
    };
    const proxiedUnderlying = instrumentSearchParamsObjectWithDevWarnings(underlyingSearchParams, workStore, promiseInitialized);
    const promise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeDevtoolsIOAwarePromise"])(proxiedUnderlying, requestStore, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RENDER_STAGES_BY_DATA_KIND"].runtimeLinkData);
    promise.then(()=>{
        promiseInitialized.current = true;
    }, // is aborted before it can reach the runtime stage.
    // In that case, we have to prevent an unhandled rejection from the promise
    // created by this `.then()` call.
    // This does not affect the `promiseInitialized` logic above,
    // because `proxiedUnderlying` will not be used to resolve the promise,
    // so there's no risk of any of its properties being accessed and triggering
    // an undesireable warning.
    ignoreReject);
    return instrumentSearchParamsPromiseWithDevWarnings(underlyingSearchParams, promise, workStore);
}
function ignoreReject() {}
function instrumentSearchParamsObjectWithDevWarnings(underlyingSearchParams, workStore, promiseInitialized) {
    // We have an unfortunate sequence of events that requires this initialization logic. We want to instrument the underlying
    // searchParams object to detect if you are accessing values in dev. This is used for warnings and for things like the static prerender
    // indicator. However when we pass this proxy to our Promise.resolve() below the VM checks if the resolved value is a promise by looking
    // at the `.then` property. To our dynamic tracking logic this is indistinguishable from a `then` searchParam and so we would normally trigger
    // dynamic tracking. However we know that this .then is not real dynamic access, it's just how thenables resolve in sequence. So we introduce
    // this initialization concept so we omit the dynamic check until after we've constructed our resolved promise.
    return new Proxy(underlyingSearchParams, {
        get (target, prop, receiver) {
            if (typeof prop === 'string' && promiseInitialized.current) {
                if (workStore.dynamicShouldError) {
                    const expression = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["describeStringPropertyAccess"])('searchParams', prop);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["throwWithStaticGenerationBailoutErrorWithDynamicError"])(workStore.route, expression);
                }
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
        },
        has (target, prop) {
            if (typeof prop === 'string') {
                if (workStore.dynamicShouldError) {
                    const expression = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["describeHasCheckingStringProperty"])('searchParams', prop);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["throwWithStaticGenerationBailoutErrorWithDynamicError"])(workStore.route, expression);
                }
            }
            return Reflect.has(target, prop);
        },
        ownKeys (target) {
            if (workStore.dynamicShouldError) {
                const expression = '`{...searchParams}`, `Object.keys(searchParams)`, or similar';
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["throwWithStaticGenerationBailoutErrorWithDynamicError"])(workStore.route, expression);
            }
            return Reflect.ownKeys(target);
        }
    });
}
function instrumentSearchParamsPromiseWithDevWarnings(underlyingSearchParams, promise, workStore) {
    // Track which properties we should warn for.
    const proxiedProperties = new Set();
    Object.keys(underlyingSearchParams).forEach((prop)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wellKnownProperties"].has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            proxiedProperties.add(prop);
        }
    });
    return new Proxy(promise, {
        get (target, prop, receiver) {
            if (prop === 'then' && workStore.dynamicShouldError) {
                const expression = '`searchParams.then`';
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["throwWithStaticGenerationBailoutErrorWithDynamicError"])(workStore.route, expression);
            }
            if (typeof prop === 'string') {
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wellKnownProperties"].has(prop) && (proxiedProperties.has(prop) || // We are accessing a property that doesn't exist on the promise nor
                // the underlying searchParams.
                Reflect.has(target, prop) === false)) {
                    const expression = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["describeStringPropertyAccess"])('searchParams', prop);
                    warnForSyncAccess(workStore.route, expression);
                }
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
        },
        set (target, prop, value, receiver) {
            if (typeof prop === 'string') {
                proxiedProperties.delete(prop);
            }
            return Reflect.set(target, prop, value, receiver);
        },
        has (target, prop) {
            if (typeof prop === 'string') {
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wellKnownProperties"].has(prop) && (proxiedProperties.has(prop) || // We are accessing a property that doesn't exist on the promise nor
                // the underlying searchParams.
                Reflect.has(target, prop) === false)) {
                    const expression = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["describeHasCheckingStringProperty"])('searchParams', prop);
                    warnForSyncAccess(workStore.route, expression);
                }
            }
            return Reflect.has(target, prop);
        },
        ownKeys (target) {
            const expression = '`Object.keys(searchParams)` or similar';
            warnForSyncAccess(workStore.route, expression);
            return Reflect.ownKeys(target);
        }
    });
}
const warnForSyncAccess = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$create$2d$deduped$2d$by$2d$callsite$2d$server$2d$error$2d$logger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDedupedByCallsiteServerErrorLoggerDev"])(createSearchAccessError);
function createSearchAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`searchParams\` is a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E848",
        enumerable: false,
        configurable: true
    });
}
function createClientSearchParamsInValidation(underlyingSearchParams, workStore, workUnitStore) {
    var _workUnitStore_validationSamples;
    const { createExhaustiveSearchParamsProxy } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/app-render/instant-validation/instant-samples.js [app-ssr] (ecmascript)");
    const declaredKeys = new Set(Object.keys(((_workUnitStore_validationSamples = workUnitStore.validationSamples) == null ? void 0 : _workUnitStore_validationSamples.searchParams) ?? {}));
    underlyingSearchParams = createExhaustiveSearchParamsProxy(underlyingSearchParams, declaredKeys, workStore.route);
    return Promise.resolve(underlyingSearchParams);
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/request/search-params.js [app-ssr] (ecmascript) <export createSearchParamsFromClient as createClientSearchParams>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClientSearchParams",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$search$2d$params$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSearchParamsFromClient"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$search$2d$params$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/request/search-params.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/request/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isRequestApiAllowedInCurrentPhase",
    ()=>isRequestApiAllowedInCurrentPhase,
    "throwForSearchParamsAccessInUseCache",
    ()=>throwForSearchParamsAccessInUseCache,
    "throwWithStaticGenerationBailoutErrorWithDynamicError",
    ()=>throwWithStaticGenerationBailoutErrorWithDynamicError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/client/components/static-generation-bailout.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$action$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$action$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)");
;
;
;
function throwWithStaticGenerationBailoutErrorWithDynamicError(route, expression) {
    throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${route} with \`dynamic = "error"\` couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E543",
        enumerable: false,
        configurable: true
    });
}
function throwForSearchParamsAccessInUseCache(workStore, constructorOpt) {
    const error = Object.defineProperty(new Error(`Route ${workStore.route} used \`searchParams\` inside "use cache". Accessing dynamic request data inside a cache scope is not supported. If you need some search params inside a cached function await \`searchParams\` outside of the cached function and pass only the required search params as arguments to the cached function. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
        value: "E842",
        enumerable: false,
        configurable: true
    });
    Error.captureStackTrace(error, constructorOpt);
    workStore.invalidDynamicUsageError ??= error;
    throw error;
}
function isRequestApiAllowedInCurrentPhase(workUnitStore) {
    switch(workUnitStore.phase){
        case 'action':
        case 'render':
            {
                // The request is still in progress. The API may be disallowed for other reasons,
                // but not because of phase.
                return true;
            }
        case 'after':
            {
                // The request has finished.
                // If we're in a Route Handler or a Server Action,
                // request APIs can be called everywhere, even in after().
                const actionStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$action$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$action$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["actionAsyncStorage"].getStore();
                if (actionStore && (actionStore.isAppRoute || actionStore.isAction)) {
                    return true;
                }
                const afterTaskStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["afterTaskAsyncStorage"].getStore();
                if (afterTaskStore) {
                    // We're in an `after` callback. Request APIs are callable if
                    // the `after()` call happened in an action phase:
                    // - in a Route Handler
                    // - in a Server Action's body (but not the render after)
                    //
                    // TODO(after): Is it even possible to have `phase === 'action'` but no `actionStore`?
                    // We should revisit this setup and simplify this.
                    return afterTaskStore.rootTaskSpawnPhase === 'action';
                }
                // Otherwise, we must be in a page, in the `after` phase.
                // We don't allow calling request APIs here because we'd miss
                // them during prerendering and wouldn't know that the page is dynamic.
                return false;
            }
    }
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeadersAdapter",
    ()=>HeadersAdapter,
    "ReadonlyHeadersError",
    ()=>ReadonlyHeadersError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [app-ssr] (ecmascript)");
;
class ReadonlyHeadersError extends Error {
    constructor(){
        super('Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers');
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E1176",
            enumerable: false,
            configurable: true
        });
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
/**
 * Builds the read methods for a sealed view that exposes all of `target`.
 */ function createPassThroughMethods(target, sealed) {
    return {
        get: target.get.bind(target),
        has: target.has.bind(target),
        getSetCookie: target.getSetCookie.bind(target),
        keys: target.keys.bind(target),
        values: target.values.bind(target),
        entries: target.entries.bind(target),
        [Symbol.iterator]: target[Symbol.iterator].bind(target),
        // The native method passes the unsealed target as the callback's `parent`
        // argument. That is a mutable handle on the underlying headers. Pass the
        // sealed view instead.
        forEach (callbackfn, thisArg) {
            for (const [name, value] of target.entries()){
                callbackfn.call(thisArg, value, name, sealed);
            }
        }
    };
}
/**
 * Builds the read methods for a sealed view that omits the header names matched
 * by `isHidden`.
 */ function createHidingMethods(target, sealed, isHidden) {
    function* entries() {
        for (const entry of target.entries()){
            if (!isHidden(entry[0])) {
                yield entry;
            }
        }
    }
    return {
        entries,
        [Symbol.iterator]: entries,
        get: (name)=>isHidden(name) ? null : target.get(name),
        has: (name)=>isHidden(name) ? false : target.has(name),
        getSetCookie: ()=>isHidden('set-cookie') ? [] : target.getSetCookie(),
        *keys () {
            for (const name of target.keys()){
                if (!isHidden(name)) {
                    yield name;
                }
            }
        },
        *values () {
            for (const [, value] of entries()){
                yield value;
            }
        },
        // The native method passes the unsealed target as the callback's `parent`
        // argument. That is a mutable handle on the underlying headers. Pass the
        // sealed view instead.
        forEach (callbackfn, thisArg) {
            for (const [name, value] of entries()){
                callbackfn.call(thisArg, value, name, sealed);
            }
        }
    };
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === 'symbol') {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === 'undefined') return;
                // If the original casing exists, return the value.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === 'symbol') {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === 'symbol') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === 'undefined') return false;
                // If the original casing exists, return true.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === 'symbol') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === 'undefined') return true;
                // If the original casing exists, delete the property.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   *
   * The sealed view stays live. Later writes to `headers` remain visible
   * through it.
   *
   * `hidden` omits the given header names from every read operation (`get`,
   * `has`, `getSetCookie`, `forEach`, and iteration). The names must be
   * lowercase. The underlying headers are neither copied nor mutated, so hidden
   * headers remain available to the framework.
   */ static seal(headers, hidden) {
        const isHidden = hidden && hidden.size > 0 ? (name)=>hidden.has(name.toLowerCase()) : null;
        // The methods are built once per sealed view and reused, so repeated access
        // returns the same function instead of a fresh closure. They are assigned
        // after the proxy exists because `forEach` hands the proxy to its callback.
        // Creating the proxy runs no trap, so nothing can read them before then.
        let methods;
        const sealed = new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'append':
                    case 'delete':
                    case 'set':
                        return ReadonlyHeadersError.callable;
                    case Symbol.iterator:
                        return methods[Symbol.iterator];
                    case 'get':
                    case 'has':
                    case 'getSetCookie':
                    case 'keys':
                    case 'values':
                    case 'entries':
                    case 'forEach':
                        return methods[prop];
                    default:
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
            }
        });
        methods = isHidden ? createHidingMethods(headers, sealed, isHidden) : createPassThroughMethods(headers, sealed);
        return sealed;
    }
    /**
   * @param headers
   * @returns A fresh object identity backed by the original value
   */ static fresh(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(', ');
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === 'string') {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== 'undefined') return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== 'undefined';
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReflectAdapter",
    ()=>ReflectAdapter
]);
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MutableRequestCookiesAdapter",
    ()=>MutableRequestCookiesAdapter,
    "ReadonlyRequestCookiesError",
    ()=>ReadonlyRequestCookiesError,
    "RequestCookiesAdapter",
    ()=>RequestCookiesAdapter,
    "appendMutableCookies",
    ()=>appendMutableCookies,
    "areCookiesMutableInCurrentPhase",
    ()=>areCookiesMutableInCurrentPhase,
    "createCookiesWithMutableAccessCheck",
    ()=>createCookiesWithMutableAccessCheck,
    "getModifiedCookieValues",
    ()=>getModifiedCookieValues,
    "responseCookiesToRequestCookies",
    ()=>responseCookiesToRequestCookies
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$action$2d$revalidation$2d$kind$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/shared/lib/action-revalidation-kind.js [app-ssr] (ecmascript)");
;
;
;
;
;
class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super('Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options');
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E1180",
            enumerable: false,
            configurable: true
        });
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'clear':
                    case 'delete':
                    case 'set':
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * @param cookies
   * @returns A fresh object identity backed by the original value
   */ static fresh(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
            }
        });
    }
}
const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for('next.mutated.cookies');
function getModifiedCookieValues(cookies) {
    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
    if (!modified || !Array.isArray(modified) || modified.length === 0) {
        return [];
    }
    return modified;
}
function appendMutableCookies(headers, mutableCookies) {
    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
    if (modifiedCookieValues.length === 0) {
        return false;
    }
    // Return a new response that extends the response with
    // the modified cookies as fallbacks. `res` cookies
    // will still take precedence.
    const resCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponseCookies"](headers);
    const returnedCookies = resCookies.getAll();
    // Set the modified cookies as fallbacks.
    for (const cookie of modifiedCookieValues){
        resCookies.set(cookie);
    }
    // Set the original cookies as the final values.
    for (const cookie of returnedCookies){
        resCookies.set(cookie);
    }
    return true;
}
class MutableRequestCookiesAdapter {
    static wrap(cookies, onUpdateCookies) {
        const responseCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponseCookies"](new Headers());
        for (const cookie of cookies.getAll()){
            responseCookies.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            // TODO-APP: change method of getting workStore
            const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
            if (workStore) {
                workStore.pathWasRevalidated = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$action$2d$revalidation$2d$kind$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionDidRevalidateStaticAndDynamic"];
            }
            const allCookies = responseCookies.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponseCookies"](new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                }
                onUpdateCookies(serializedCookies);
            }
        };
        const wrappedCookies = new Proxy(responseCookies, {
            get (target, prop, receiver) {
                switch(prop){
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                        return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case 'delete':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.delete(...args);
                                return wrappedCookies;
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    case 'set':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.set(...args);
                                return wrappedCookies;
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    default:
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
            }
        });
        return wrappedCookies;
    }
}
function createCookiesWithMutableAccessCheck(requestStore) {
    const wrappedCookies = new Proxy(requestStore.mutableCookies, {
        get (target, prop, receiver) {
            switch(prop){
                case 'delete':
                    return function(...args) {
                        ensureCookiesAreStillMutable(requestStore, 'cookies().delete');
                        target.delete(...args);
                        return wrappedCookies;
                    };
                case 'set':
                    return function(...args) {
                        ensureCookiesAreStillMutable(requestStore, 'cookies().set');
                        target.set(...args);
                        return wrappedCookies;
                    };
                default:
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
            }
        }
    });
    return wrappedCookies;
}
function areCookiesMutableInCurrentPhase(requestStore) {
    return requestStore.phase === 'action';
}
/** Ensure that cookies() starts throwing on mutation
 * if we changed phases and can no longer mutate.
 *
 * This can happen when going:
 *   'render' -> 'after'
 *   'action' -> 'render'
 * */ function ensureCookiesAreStillMutable(requestStore, _callingExpression) {
    if (!areCookiesMutableInCurrentPhase(requestStore)) {
        // TODO: maybe we can give a more precise error message based on callingExpression?
        throw new ReadonlyRequestCookiesError();
    }
}
function responseCookiesToRequestCookies(responseCookies) {
    const requestCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestCookies"](new Headers());
    for (const cookie of responseCookies.getAll()){
        requestCookies.set(cookie);
    }
    return requestCookies;
}
}),
"[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [app-ssr] (ecmascript)");
;
}),
];

//# sourceMappingURL=1rpl_next_dist_esm_server_00ct-fk._.js.map