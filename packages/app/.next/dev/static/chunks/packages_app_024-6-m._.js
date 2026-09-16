(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/packages/app/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$demos$2f$gauntlet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/demos/gauntlet.tsx [app-client] (ecmascript)");
"use client";
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$demos$2f$gauntlet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GauntletPage"], {}, void 0, false, {
        fileName: "[project]/packages/app/app/page.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/app/src/Boundary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Boundary",
    ()=>Boundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
class Boundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    state = {
        error: null
    };
    static getDerivedStateFromError(error) {
        return {
            error
        };
    }
    componentDidCatch(error) {
        this.props.onCaught?.(error);
    }
    componentDidUpdate(previous) {
        const before = previous.resetKeys ?? [];
        const now = this.props.resetKeys ?? [];
        if (this.state.error !== null && (before.length !== now.length || before.some((key, i)=>!Object.is(key, now[i])))) {
            this.setState({
                error: null
            });
        }
    }
    reset = ()=>this.setState({
            error: null
        });
    render() {
        return this.state.error === null ? this.props.children : this.props.fallback(this.state.error, this.reset);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/app/src/demos/gauntlet.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GauntletPage",
    ()=>GauntletPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$Boundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/Boundary.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/ui.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$scenarios$2f$rebasing$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/scenarios/rebasing.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$scenarios$2f$suspense$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/scenarios/suspense.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$scenarios$2f$errors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/scenarios/errors.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$scenarios$2f$tearing$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/scenarios/tearing.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$scenarios$2f$selectors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/scenarios/selectors.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$scenarios$2f$roots$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/scenarios/roots.tsx [app-client] (ecmascript)");
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
/** One panel throwing must not take the page with it. */ function Panel({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$Boundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Boundary"], {
        fallback: (error, reset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "This panel threw"
                            }, void 0, false, {
                                fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                                lineNumber: 18,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "proves",
                                children: error.message
                            }, void 0, false, {
                                fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                                lineNumber: 19,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                        lineNumber: 17,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "controls",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: reset,
                            children: "retry"
                        }, void 0, false, {
                            fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                            lineNumber: 22,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "card",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "loading…"
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                        lineNumber: 31,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                    lineNumber: 30,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                lineNumber: 29,
                columnNumber: 11
            }, this),
            children: children
        }, void 0, false, {
            fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = Panel;
function GauntletPage() {
    // One after another: see runEveryScenario for why not all at once.
    const runAll = ()=>{
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runEveryScenario"])();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lede",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Does it do the right thing?"
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Six panels, each one live. Drive them with the buttons, or press Run to watch a scripted sequence play out slowly and end in a verdict. Real React, real roots, no test harness and no ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                children: "act()"
                            }, void 0, false, {
                                fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                                lineNumber: 60,
                                columnNumber: 58
                            }, this),
                            " — this is the browser’s own scheduler."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "run",
                        onClick: runAll,
                        children: "Run all"
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Panel, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$scenarios$2f$rebasing$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RebasingScenario"], {}, void 0, false, {
                            fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Panel, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$scenarios$2f$tearing$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TearingScenario"], {}, void 0, false, {
                            fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Panel, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$scenarios$2f$suspense$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuspenseScenario"], {}, void 0, false, {
                            fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Panel, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$scenarios$2f$errors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorResetScenario"], {}, void 0, false, {
                            fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Panel, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$scenarios$2f$selectors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectorScenario"], {}, void 0, false, {
                            fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Panel, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$scenarios$2f$roots$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RootsScenario"], {}, void 0, false, {
                            fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/app/src/demos/gauntlet.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c1 = GauntletPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "Panel");
__turbopack_context__.k.register(_c1, "GauntletPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/app/src/gate.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeGate",
    ()=>makeGate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/ui.tsx [app-client] (ecmascript)");
;
function makeGate() {
    const held = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSignal"])(false);
    let release = null;
    let promise = null;
    return {
        held,
        promise: ()=>promise,
        hold () {
            if (promise !== null) return;
            promise = new Promise((r)=>release = r);
            held.set(true);
        },
        release () {
            release?.();
            release = null;
            promise = null;
            held.set(false);
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/app/src/scenarios/errors.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorResetScenario",
    ()=>ErrorResetScenario
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'react-concurrent-store'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$Boundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/Boundary.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/ui.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
;
;
const settled = (value)=>Promise.resolve(value);
const rejecting = (message)=>{
    const p = Promise.reject(new Error(message));
    // The handle carries the promise without adopting it. This only quiets the
    // browser's unhandled-rejection warning for the copy held here.
    p.catch(()=>{});
    return p;
};
function Reader({ store, recorder, probe }) {
    _s();
    const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(useStore(store));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"])(probe, recorder, "reader", name);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        name: "reader",
        value: name
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/errors.tsx",
        lineNumber: 38,
        columnNumber: 10
    }, this);
}
_s(Reader, "6BDhdZk+U9ylrWLwfrslevPqtkA=", false, function() {
    return [
        useStore,
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"]
    ];
});
_c = Reader;
function Guarded({ store, recorder, probe, onCaught }) {
    _s1();
    // The promise currently in the store is the reset key. A boundary reset
    // while the store still holds the rejected promise just throws again, so
    // moving the store on is what actually clears it.
    const current = useStore(store);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$Boundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Boundary"], {
        resetKeys: [
            current
        ],
        onCaught: onCaught,
        fallback: (error, reset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
                        name: "boundary",
                        value: `caught: ${error.message}`,
                        probe: false
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/errors.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        "data-role": "reset-only",
                        onClick: reset,
                        children: "reset only"
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/errors.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "run",
                        onClick: ()=>{
                            store.dispatch(settled("grace"));
                            reset();
                        },
                        children: "reset + retry"
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/errors.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/scenarios/errors.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Reader, {
            store: store,
            recorder: recorder,
            probe: probe
        }, void 0, false, {
            fileName: "[project]/packages/app/src/scenarios/errors.tsx",
            lineNumber: 78,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/errors.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s1(Guarded, "d5D+idBSP3j6fcBydQjnYwuhMnM=", false, function() {
    return [
        useStore
    ];
});
_c1 = Guarded;
function ErrorResetScenario() {
    _s2();
    const [{ store, recorder, probe, catches }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ErrorResetScenario.useState": ()=>({
                store: createStore(settled("ada")),
                recorder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRecorder"])(),
                probe: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createProbe"])(),
                // The count lives in a closure, not as a field on a value React handed
                // back: mutating one of those is what react-hooks/immutability is for.
                catches: ({
                    "ErrorResetScenario.useState": ()=>{
                        let count = 0;
                        return {
                            bump: ({
                                "ErrorResetScenario.useState": ()=>count += 1
                            })["ErrorResetScenario.useState"],
                            count: ({
                                "ErrorResetScenario.useState": ()=>count
                            })["ErrorResetScenario.useState"]
                        };
                    }
                })["ErrorResetScenario.useState"]()
            })
    }["ErrorResetScenario.useState"]);
    const onCaught = (error)=>{
        catches.bump();
        recorder.push("note", `caught ${error.message}`);
    };
    const { verdict, run } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScript"])(recorder, {
        "ErrorResetScenario.useScript": async (script)=>{
            store.dispatch(settled("ada"));
            await script.step("start on a resolved promise");
            script.check("reader shows the value", probe.value("reader"), "ada");
            const before = catches.count();
            store.dispatch(rejecting("network"));
            await script.step("dispatch a rejecting promise");
            script.check("the boundary caught it", catches.count() - before, 1);
            document.querySelector("[data-scenario='error-reset'] [data-role='reset-only']")?.click();
            await script.step("reset the boundary without moving the store on");
            script.check("it throws straight back", catches.count() - before, 2);
            store.dispatch(settled("grace"));
            await script.step("dispatch a good promise, which is the reset key");
            script.check("recovered", probe.value("reader"), "grace");
            script.check("and stayed recovered", catches.count() - before, 2);
        }
    }["ErrorResetScenario.useScript"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-scenario": "error-reset",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            title: "An error boundary that can actually be reset",
            proves: "use() throws the same rejection every time it reads it, so resetting " + "a boundary on its own puts you straight back in the fallback — watch " + "the catch count go up. The store's current promise is the reset key, " + "so moving the store on is what clears it.",
            recorder: recorder,
            stage: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "readers",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Guarded, {
                    store: store,
                    recorder: recorder,
                    probe: probe,
                    onCaught: onCaught
                }, void 0, false, {
                    fileName: "[project]/packages/app/src/scenarios/errors.tsx",
                    lineNumber: 138,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/errors.tsx",
                lineNumber: 137,
                columnNumber: 11
            }, this),
            controls: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>store.dispatch(settled("ada")),
                        children: "resolve ada"
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/errors.tsx",
                        lineNumber: 148,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>store.dispatch(rejecting("network")),
                        children: "reject"
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/errors.tsx",
                        lineNumber: 151,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startTransition"])(()=>store.dispatch(rejecting("slow fail"))),
                        children: "reject in a transition"
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/errors.tsx",
                        lineNumber: 154,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "run",
                        onClick: run,
                        children: "Run"
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/errors.tsx",
                        lineNumber: 161,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/scenarios/errors.tsx",
                lineNumber: 147,
                columnNumber: 11
            }, this),
            verdict: verdict
        }, void 0, false, {
            fileName: "[project]/packages/app/src/scenarios/errors.tsx",
            lineNumber: 127,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/errors.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_s2(ErrorResetScenario, "XbMUkk6VGt19YG3IjQvcNRCA+lc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScript"]
    ];
});
_c2 = ErrorResetScenario;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Reader");
__turbopack_context__.k.register(_c1, "Guarded");
__turbopack_context__.k.register(_c2, "ErrorResetScenario");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/app/src/scenarios/rebasing.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RebasingScenario",
    ()=>RebasingScenario
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'react-concurrent-store'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$gate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/gate.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/ui.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
;
;
;
;
const show = (s)=>s === "" ? "∅" : String(s);
function Reader({ store, gate, probe, recorder }) {
    _s();
    const applied = useStore(store);
    // Uppercase is the slow letter: it holds until the gate is released.
    const held = gate.promise();
    if (held !== null && /[A-Z]/.test(applied)) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(held);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"])(probe, recorder, "on screen", applied);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        ref: ref,
        name: "on screen",
        value: show(applied)
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, this);
}
_s(Reader, "YJpXvgraqzXzD6fd1uGZipEygl0=", false, function() {
    return [
        useStore,
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"]
    ];
});
_c = Reader;
function Held({ probe, recorder }) {
    _s1();
    // reader = false: worth seeing arrive and leave, but not a reader of the
    // store, so it stays out of agreement.
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"])(probe, recorder, "fallback", "held", false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        ref: ref,
        name: "fallback",
        value: "held…",
        state: "pending",
        probe: false
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s1(Held, "gRUb57t6C3PlSal1iHHYLuEVJYs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"]
    ];
});
_c1 = Held;
function Controls({ gate, onSync, onSlow, onReset, run }) {
    _s2();
    const held = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSignal"])(gate.held);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onSync("b"),
                children: "append b (sync)"
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onSync("c"),
                children: "append c (sync)"
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onSlow("A"),
                children: "append A (transition, holds)"
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>gate.release(),
                disabled: !held,
                children: "release"
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onReset,
                children: "reset"
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "run",
                onClick: run,
                children: "Run"
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s2(Controls, "ymuYQRR+0UIRwNGgHfb7668YbrE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSignal"]
    ];
});
_c2 = Controls;
function RebasingScenario() {
    _s3();
    const [{ store, recorder, probe, gate }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "RebasingScenario.useState": ()=>({
                // No reducer, so an action is a replacement value or an updater. That lets
                // a rerun start from a known state instead of accumulating.
                store: createStore(""),
                recorder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRecorder"])(),
                probe: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createProbe"])(),
                gate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$gate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeGate"])()
            })
    }["RebasingScenario.useState"]);
    const held = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSignal"])(gate.held);
    const sync = (letter)=>{
        recorder.push("dispatch", `${letter} sync`);
        store.dispatch((s)=>s + letter);
    };
    const slow = (letter)=>{
        gate.hold();
        recorder.push("dispatch", `${letter} transition`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startTransition"])(()=>store.dispatch((s)=>s + letter));
    };
    const reset = ()=>{
        gate.release();
        store.dispatch("");
    };
    const onScreen = ()=>probe.value("on screen") ?? "";
    const { verdict, run } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScript"])(recorder, {
        "RebasingScenario.useScript": async (script)=>{
            reset();
            // Counts are cumulative over the panel's life; a rerun measures itself.
            probe.resetCounts();
            await script.wait(300);
            script.check("starts empty", onScreen(), "");
            slow("A");
            await script.step("append A inside a held transition");
            script.check("chronological has A", store.getState(), "A");
            script.check("the screen does not", onScreen(), "");
            sync("b");
            await script.step("append b synchronously");
            script.check("chronological is A then b", store.getState(), "Ab");
            script.check("the screen rebased onto what it shows", onScreen(), "b");
            script.check("and never showed a fallback", probe.commits("fallback", "ref"), 0);
            sync("c");
            await script.step("append c synchronously");
            script.check("chronological is A b c", store.getState(), "Abc");
            script.check("the screen still has no A", onScreen(), "bc");
            gate.release();
            await script.step("release the transition");
            script.check("the screen takes the dispatch order", onScreen(), "Abc");
            script.check("and agrees with the store", onScreen(), store.getState());
        }
    }["RebasingScenario.useScript"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-scenario": "rebasing",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            title: "Rebasing, in the order you can see",
            proves: "A sync action applies to the state on screen, not to the state a " + "held transition is waiting on. When the transition commits, the " + "actions are re-ordered into the order they were dispatched — the " + "screen goes from bc to Abc without ever showing a state nobody " + "asked for, and without the fallback ever appearing.",
            recorder: recorder,
            stage: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "readers",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Held, {
                            probe: probe,
                            recorder: recorder
                        }, void 0, false, {
                            fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
                            lineNumber: 158,
                            columnNumber: 33
                        }, this),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Reader, {
                            store: store,
                            gate: gate,
                            probe: probe,
                            recorder: recorder
                        }, void 0, false, {
                            fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
                            lineNumber: 159,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
                        lineNumber: 158,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chronological"], {
                        store: store,
                        pending: held,
                        format: show
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
                        lineNumber: 166,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
                lineNumber: 157,
                columnNumber: 11
            }, this),
            controls: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Controls, {
                gate: gate,
                onSync: sync,
                onSlow: slow,
                onReset: reset,
                run: run
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
                lineNumber: 170,
                columnNumber: 11
            }, this),
            verdict: verdict
        }, void 0, false, {
            fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
            lineNumber: 146,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/rebasing.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
_s3(RebasingScenario, "SL2sAs0n2+0HNQY1HXxbXX7sYN4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSignal"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScript"]
    ];
});
_c3 = RebasingScenario;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Reader");
__turbopack_context__.k.register(_c1, "Held");
__turbopack_context__.k.register(_c2, "Controls");
__turbopack_context__.k.register(_c3, "RebasingScenario");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/app/src/scenarios/roots.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RootsScenario",
    ()=>RootsScenario
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react-dom/client.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'react-concurrent-store'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$gate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/gate.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/ui.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
;
;
;
;
;
function ReaderA({ store, probe, recorder, gate }) {
    _s();
    const n = useStore(store);
    const held = gate.promise();
    if (held !== null && n > 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(held);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"])(probe, recorder, "root A", n);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        ref: ref,
        name: "root A",
        value: n
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/roots.tsx",
        lineNumber: 35,
        columnNumber: 10
    }, this);
}
_s(ReaderA, "wxjwR4bnNGf9L21PUjvhp21uDHY=", false, function() {
    return [
        useStore,
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"]
    ];
});
_c = ReaderA;
/** Rendered into the second root, so it takes what it needs as props. */ function ReaderB({ store, probe, recorder }) {
    _s1();
    const n = useStore(store);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"])(probe, recorder, "root B", n);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        ref: ref,
        name: "root B (strict)",
        value: n
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/roots.tsx",
        lineNumber: 42,
        columnNumber: 10
    }, this);
}
_s1(ReaderB, "wxjwR4bnNGf9L21PUjvhp21uDHY=", false, function() {
    return [
        useStore,
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"]
    ];
});
_c1 = ReaderB;
function Held({ probe, recorder }) {
    _s2();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"])(probe, recorder, "fallback", "held", false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        ref: ref,
        name: "fallback",
        value: "held…",
        state: "pending",
        probe: false
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/roots.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s2(Held, "gRUb57t6C3PlSal1iHHYLuEVJYs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"]
    ];
});
_c2 = Held;
function Controls({ gate, onSync, onBlockedBump, onReset, run }) {
    _s3();
    const held = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSignal"])(gate.held);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onSync,
                children: "+1 sync"
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onBlockedBump,
                disabled: held,
                children: "+1 in a blocked transition"
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>gate.release(),
                disabled: !held,
                children: "release"
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onReset,
                children: "reset"
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "run",
                onClick: run,
                children: "Run"
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/app/src/scenarios/roots.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s3(Controls, "ymuYQRR+0UIRwNGgHfb7668YbrE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSignal"]
    ];
});
_c3 = Controls;
function RootsScenario() {
    _s4();
    const [{ store, recorder, probe, gate }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "RootsScenario.useState": ()=>({
                store: createStore(1),
                recorder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRecorder"])(),
                probe: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createProbe"])(),
                gate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$gate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeGate"])()
            })
    }["RootsScenario.useState"]);
    const mount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RootsScenario.useEffect": ()=>{
            const host = mount.current;
            if (host === null) return;
            // Its own container: passing the same node to createRoot twice is an
            // error, and this effect can run again.
            const container = document.createElement("div");
            host.appendChild(container);
            const root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRoot"])(container);
            root.render(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StrictMode"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "readers",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReaderB, {
                        store: store,
                        probe: probe,
                        recorder: recorder
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this));
            return ({
                "RootsScenario.useEffect": ()=>{
                    // Out of the commit React is in while this cleanup runs.
                    setTimeout({
                        "RootsScenario.useEffect": ()=>{
                            root.unmount();
                            container.remove();
                        }
                    }["RootsScenario.useEffect"], 0);
                }
            })["RootsScenario.useEffect"];
        }
    }["RootsScenario.useEffect"], [
        store,
        probe,
        recorder
    ]);
    const blockedBump = ()=>{
        gate.hold();
        recorder.push("dispatch", "+1 transition");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startTransition"])(()=>store.dispatch((n)=>n + 1));
    };
    const { verdict, run } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScript"])(recorder, {
        "RootsScenario.useScript": async (script)=>{
            gate.release();
            store.dispatch(1);
            await script.wait(350);
            script.check("both roots start together", probe.agree(), true);
            script.check("on the same value", probe.snapshot(), {
                "root A": 1,
                "root B": 1
            });
            store.dispatch({
                "RootsScenario.useScript": (n)=>n + 1
            }["RootsScenario.useScript"]);
            await script.step("dispatch once, synchronously");
            script.check("both roots moved together", probe.snapshot(), {
                "root A": 2,
                "root B": 2
            });
            blockedBump();
            await script.step("dispatch in a transition root A blocks on");
            script.check("root B does not run ahead", probe.agree(), true);
            store.dispatch({
                "RootsScenario.useScript": (n)=>n + 1
            }["RootsScenario.useScript"]);
            await script.step("interrupt it with a sync dispatch");
            script.check("still one value across both roots", probe.agree(), true);
            gate.release();
            await script.step("release");
            script.check("both land together", probe.agree(), true);
            script.check("on the chronological value", probe.value("root A"), store.getState());
            // Eventual convergence is not the claim. No commit in between disagreed.
            script.check("no commit was ever torn", probe.tears(), []);
        }
    }["RootsScenario.useScript"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-scenario": "roots",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            title: "Two roots, one store, no provider",
            proves: "Separate createRoot trees share a store and stay in step, including " + "while one is blocked on a transition and the other is not, and with " + "StrictMode double-rendering only one of them.",
            recorder: recorder,
            stage: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "readers",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Held, {
                                probe: probe,
                                recorder: recorder
                            }, void 0, false, {
                                fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                                lineNumber: 179,
                                columnNumber: 35
                            }, this),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReaderA, {
                                store: store,
                                probe: probe,
                                recorder: recorder,
                                gate: gate
                            }, void 0, false, {
                                fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                                lineNumber: 180,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                            lineNumber: 179,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                        lineNumber: 178,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: mount
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                        lineNumber: 188,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "readers",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Agreement"], {
                            probe: probe
                        }, void 0, false, {
                            fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                            lineNumber: 190,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                        lineNumber: 189,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                lineNumber: 177,
                columnNumber: 11
            }, this),
            controls: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Controls, {
                gate: gate,
                onSync: ()=>store.dispatch((n)=>n + 1),
                onBlockedBump: blockedBump,
                onReset: ()=>{
                    gate.release();
                    store.dispatch(1);
                },
                run: run
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/roots.tsx",
                lineNumber: 195,
                columnNumber: 11
            }, this),
            verdict: verdict
        }, void 0, false, {
            fileName: "[project]/packages/app/src/scenarios/roots.tsx",
            lineNumber: 168,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/roots.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
_s4(RootsScenario, "OCpBYDw4W10DYKoU8Xo2H7FnOEA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScript"]
    ];
});
_c4 = RootsScenario;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "ReaderA");
__turbopack_context__.k.register(_c1, "ReaderB");
__turbopack_context__.k.register(_c2, "Held");
__turbopack_context__.k.register(_c3, "Controls");
__turbopack_context__.k.register(_c4, "RootsScenario");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/app/src/scenarios/selectors.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectorScenario",
    ()=>SelectorScenario
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'react-concurrent-store'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/ui.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
;
;
;
const makeCounts = ()=>{
    const seen = {
        name: 0,
        unread: 0,
        badge: 0
    };
    return {
        bump: (slot)=>{
            seen[slot] += 1;
        },
        of: (slot)=>seen[slot]
    };
};
const reduce = (state, action)=>({
        ...state,
        ...action
    });
/**
 * The readers are memoised because the panel around them re-renders on every
 * scripted step. Without that, the counts would measure the harness rather
 * than the store.
 */ /**
 * Counted from an effect, not from the render body. Writing during render is a
 * rules violation, and a render React threw away is not one anybody saw — a
 * commit is.
 */ function useCount(counts, slot, recorder, text) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCount.useEffect": ()=>{
            counts.bump(slot);
            recorder.push("render", text);
        }
    }["useCount.useEffect"]);
}
_s(useCount, "OD7bBpZva5O2jO+Puf00hKivP7c=");
const NameReader = /*#__PURE__*/ _s1((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = _s1(function NameReader({ store, counts, recorder }) {
    _s1();
    const name = useStore(store, {
        "NameReader.NameReader.useStore[name]": (s)=>s.name
    }["NameReader.NameReader.useStore[name]"]);
    useCount(counts, "name", recorder, `name ${name}`);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        name: "name",
        value: name
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
        lineNumber: 54,
        columnNumber: 10
    }, this);
}, "YB50j+e1hqDQBQSMaWgDyFihR9A=", false, function() {
    return [
        useStore,
        useCount
    ];
})), "YB50j+e1hqDQBQSMaWgDyFihR9A=", false, function() {
    return [
        useStore,
        useCount
    ];
});
_c1 = NameReader;
const UnreadReader = /*#__PURE__*/ _s2((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c2 = _s2(function UnreadReader({ store, counts, recorder }) {
    _s2();
    const unread = useStore(store, {
        "UnreadReader.UnreadReader.useStore[unread]": (s)=>s.unread
    }["UnreadReader.UnreadReader.useStore[unread]"]);
    useCount(counts, "unread", recorder, `unread ${unread}`);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        name: "unread",
        value: unread
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
        lineNumber: 68,
        columnNumber: 10
    }, this);
}, "YTN4Q9YDhXHfGg6YL9Iw4DNHfKc=", false, function() {
    return [
        useStore,
        useCount
    ];
})), "YTN4Q9YDhXHfGg6YL9Iw4DNHfKc=", false, function() {
    return [
        useStore,
        useCount
    ];
});
_c3 = UnreadReader;
const BadgeReader = /*#__PURE__*/ _s3((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c4 = _s3(function BadgeReader({ store, counts, recorder }) {
    _s3();
    // Returns `previous` whenever the slice is equivalent, so neither the render
    // nor the object identity downstream consumers depend on churns.
    const badge = useStore(store, {
        "BadgeReader.BadgeReader.useStore[badge]": (s, previous)=>{
            const label = s.unread > 0 ? "some" : "none";
            return previous !== undefined && previous.label === label ? previous : {
                label
            };
        }
    }["BadgeReader.BadgeReader.useStore[badge]"]);
    useCount(counts, "badge", recorder, `badge ${badge.label}`);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        name: "badge",
        value: badge.label
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
        lineNumber: 92,
        columnNumber: 10
    }, this);
}, "Xl7ySnCl/I9MR/rN6SNTFeMqytU=", false, function() {
    return [
        useStore,
        useCount
    ];
})), "Xl7ySnCl/I9MR/rN6SNTFeMqytU=", false, function() {
    return [
        useStore,
        useCount
    ];
});
_c5 = BadgeReader;
/**
 * Selects the slice nobody else does. If a bail-out ever left the store's
 * commit pointer behind, the state later readers are built from would be
 * missing whatever happened while nothing was listening — and this is the
 * reader that would show it.
 */ const ThemeReader = /*#__PURE__*/ _s4((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c6 = _s4(function ThemeReader({ store }) {
    _s4();
    const theme = useStore(store, {
        "ThemeReader.ThemeReader.useStore[theme]": (s)=>s.theme
    }["ThemeReader.ThemeReader.useStore[theme]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        name: "theme",
        value: theme
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
        lineNumber: 107,
        columnNumber: 10
    }, this);
}, "xrByVUKQaTCN2wfC1ZJdqW3tWXI=", false, function() {
    return [
        useStore
    ];
})), "xrByVUKQaTCN2wfC1ZJdqW3tWXI=", false, function() {
    return [
        useStore
    ];
});
_c7 = ThemeReader;
function SelectorScenario() {
    _s5();
    const [{ store, recorder, counts }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SelectorScenario.useState": ()=>({
                store: createStore({
                    name: "ada",
                    unread: 0,
                    theme: "dark"
                }, reduce),
                recorder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRecorder"])(),
                counts: makeCounts()
            })
    }["SelectorScenario.useState"]);
    const { verdict, run } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScript"])(recorder, {
        "SelectorScenario.useScript": async (script)=>{
            store.dispatch({
                name: "ada",
                unread: 0,
                theme: "dark"
            });
            await script.wait(250);
            const base = {
                name: counts.of("name"),
                unread: counts.of("unread"),
                badge: counts.of("badge")
            };
            store.dispatch({
                theme: "light"
            });
            await script.step("change a slice nobody selected");
            script.check("name did not render", counts.of("name") - base.name, 0);
            script.check("unread did not render", counts.of("unread") - base.unread, 0);
            script.check("badge did not render", counts.of("badge") - base.badge, 0);
            store.dispatch({
                unread: 1
            });
            await script.step("change unread from 0 to 1");
            script.check("unread rendered once", counts.of("unread") - base.unread, 1);
            script.check("name still did not", counts.of("name") - base.name, 0);
            script.check("badge rendered: none to some", counts.of("badge") - base.badge, 1);
            store.dispatch({
                unread: 2
            });
            await script.step("change unread from 1 to 2");
            script.check("unread rendered again", counts.of("unread") - base.unread, 2);
            // Still "some", so the selector hands back its previous object.
            script.check("badge held its previous result", counts.of("badge") - base.badge, 1);
            script.check("name never rendered at all", counts.of("name") - base.name, 0);
            // The slice nobody watched while the others were bailing out is still
            // there: a stranded commit pointer would have lost it.
            script.check("the unwatched slice survived", store.getState().theme, "light");
        }
    }["SelectorScenario.useScript"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        title: "Selectors skip the render, without an equality function",
        proves: "A slice nobody selected moves nothing. A selector that returns its " + "previous result when the slice is equivalent keeps both the render and " + "the object identity stable. Renders are counted on commit, so a render " + "React discarded is not counted against it.",
        recorder: recorder,
        stage: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "readers",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NameReader, {
                    store: store,
                    counts: counts,
                    recorder: recorder
                }, void 0, false, {
                    fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
                    lineNumber: 164,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UnreadReader, {
                    store: store,
                    counts: counts,
                    recorder: recorder
                }, void 0, false, {
                    fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
                    lineNumber: 165,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BadgeReader, {
                    store: store,
                    counts: counts,
                    recorder: recorder
                }, void 0, false, {
                    fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
                    lineNumber: 166,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeReader, {
                    store: store
                }, void 0, false, {
                    fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
                    lineNumber: 167,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
            lineNumber: 163,
            columnNumber: 9
        }, this),
        controls: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>store.dispatch({
                            theme: "light"
                        }),
                    children: "toggle theme (unselected)"
                }, void 0, false, {
                    fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
                    lineNumber: 172,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>store.dispatch({
                            unread: store.getState().unread + 1
                        }),
                    children: "unread +1"
                }, void 0, false, {
                    fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
                    lineNumber: 175,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>store.dispatch({
                            unread: 0
                        }),
                    children: "unread = 0"
                }, void 0, false, {
                    fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
                    lineNumber: 180,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>store.dispatch({
                            name: "grace"
                        }),
                    children: "rename"
                }, void 0, false, {
                    fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
                    lineNumber: 181,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "run",
                    onClick: run,
                    children: "Run"
                }, void 0, false, {
                    fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
                    lineNumber: 182,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
            lineNumber: 171,
            columnNumber: 9
        }, this),
        verdict: verdict
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/selectors.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
_s5(SelectorScenario, "nBKFI8GObXZp+hOfF4w/+Lc24mI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScript"]
    ];
});
_c8 = SelectorScenario;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "NameReader$memo");
__turbopack_context__.k.register(_c1, "NameReader");
__turbopack_context__.k.register(_c2, "UnreadReader$memo");
__turbopack_context__.k.register(_c3, "UnreadReader");
__turbopack_context__.k.register(_c4, "BadgeReader$memo");
__turbopack_context__.k.register(_c5, "BadgeReader");
__turbopack_context__.k.register(_c6, "ThemeReader$memo");
__turbopack_context__.k.register(_c7, "ThemeReader");
__turbopack_context__.k.register(_c8, "SelectorScenario");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/app/src/scenarios/suspense.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SuspenseScenario",
    ()=>SuspenseScenario
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'react-concurrent-store'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/ui.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
;
const deferred = ()=>{
    let resolve;
    const promise = new Promise((r)=>resolve = r);
    return {
        promise,
        resolve
    };
};
function Reader({ store, probe, recorder }) {
    _s();
    const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(useStore(store));
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"])(probe, recorder, "reader", name);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        ref: ref,
        name: "reader",
        value: name
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/suspense.tsx",
        lineNumber: 34,
        columnNumber: 10
    }, this);
}
_s(Reader, "jmvUqzPQZXCN7ITeZhN95DmjbHI=", false, function() {
    return [
        useStore,
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"]
    ];
});
_c = Reader;
/**
 * The fallback reports through its own ref callback. Its attach and detach are
 * the only honest signal that the tree went to the fallback — counting renders
 * would also count renders React discarded while retrying.
 */ function Fallback({ probe, recorder }) {
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"])(probe, recorder, "fallback", "loading", false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        ref: ref,
        name: "fallback",
        value: "loading…",
        state: "pending",
        probe: false
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/suspense.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s1(Fallback, "gRUb57t6C3PlSal1iHHYLuEVJYs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"]
    ];
});
_c1 = Fallback;
function SuspenseScenario() {
    _s2();
    const [{ store, recorder, probe }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SuspenseScenario.useState": ()=>({
                store: createStore(Promise.resolve("ada")),
                recorder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRecorder"])(),
                probe: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createProbe"])()
            })
    }["SuspenseScenario.useState"]);
    const [pending, setPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const load = (inTransition)=>{
        const next = deferred();
        setPending(next);
        recorder.push("dispatch", inTransition ? "load (transition)" : "load (sync)");
        if (inTransition) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startTransition"])(()=>store.dispatch(next.promise));
        } else {
            store.dispatch(next.promise);
        }
    };
    // How many times the fallback has been attached to the DOM.
    const fallbacks = ()=>probe.commits("fallback", "ref");
    const { verdict, run } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScript"])(recorder, {
        "SuspenseScenario.useScript": async (script)=>{
            store.dispatch(Promise.resolve("ada"));
            setPending(null);
            await script.step("start on a resolved promise");
            script.check("reader shows it", probe.value("reader"), "ada");
            // --- the fallback you asked for ---------------------------------------
            let seen = fallbacks();
            const first = deferred();
            store.dispatch(first.promise);
            await script.step("dispatch a pending promise synchronously");
            script.check("the fallback was shown", fallbacks() > seen, true);
            script.check("and it is on screen now", probe.present("fallback", "ref"), true);
            first.resolve("bob");
            setPending(null);
            await script.step("resolve it");
            script.check("reader shows the new value", probe.value("reader"), "bob");
            script.check("the fallback is gone", probe.present("fallback", "ref"), false);
            // --- the one you did not ----------------------------------------------
            seen = fallbacks();
            const second = deferred();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startTransition"])({
                "SuspenseScenario.useScript": ()=>store.dispatch(second.promise)
            }["SuspenseScenario.useScript"]);
            setPending(second);
            await script.step("dispatch a pending promise inside a transition");
            script.check("no fallback this time", fallbacks(), seen);
            script.check("the old value stays on screen", probe.value("reader"), "bob");
            second.resolve("cleo");
            setPending(null);
            await script.step("resolve it");
            script.check("reader moves on", probe.value("reader"), "cleo");
            script.check("still no fallback", fallbacks(), seen);
        }
    }["SuspenseScenario.useScript"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-scenario": "suspense",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            title: "Suspense: the fallback you asked for, and the one you did not",
            proves: "A sync update to a pending promise shows the fallback. The same " + "update inside a transition keeps the current content and waits. " + "That second half is what useSyncExternalStore gives up: it de-opts " + "the transition to sync and drops to the fallback regardless. The " + "fallback is counted by DOM attach, not by render.",
            recorder: recorder,
            stage: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "readers",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Fallback, {
                            probe: probe,
                            recorder: recorder
                        }, void 0, false, {
                            fileName: "[project]/packages/app/src/scenarios/suspense.tsx",
                            lineNumber: 127,
                            columnNumber: 33
                        }, this),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Reader, {
                            store: store,
                            probe: probe,
                            recorder: recorder
                        }, void 0, false, {
                            fileName: "[project]/packages/app/src/scenarios/suspense.tsx",
                            lineNumber: 128,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/suspense.tsx",
                        lineNumber: 127,
                        columnNumber: 13
                    }, this),
                    pending !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
                        name: "in flight",
                        value: "unresolved",
                        state: "pending",
                        probe: false
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/suspense.tsx",
                        lineNumber: 131,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/scenarios/suspense.tsx",
                lineNumber: 126,
                columnNumber: 11
            }, this),
            controls: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>load(false),
                        disabled: pending !== null,
                        children: "load (sync)"
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/suspense.tsx",
                        lineNumber: 142,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>load(true),
                        disabled: pending !== null,
                        children: "load (transition)"
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/suspense.tsx",
                        lineNumber: 145,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            pending?.resolve("bob");
                            setPending(null);
                        },
                        disabled: pending === null,
                        children: "resolve"
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/suspense.tsx",
                        lineNumber: 148,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "run",
                        onClick: run,
                        children: "Run"
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/suspense.tsx",
                        lineNumber: 157,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/scenarios/suspense.tsx",
                lineNumber: 141,
                columnNumber: 11
            }, this),
            verdict: verdict
        }, void 0, false, {
            fileName: "[project]/packages/app/src/scenarios/suspense.tsx",
            lineNumber: 115,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/suspense.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s2(SuspenseScenario, "qpUtoowMLoQEKdT/vcPzNa1p4NQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScript"]
    ];
});
_c2 = SuspenseScenario;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Reader");
__turbopack_context__.k.register(_c1, "Fallback");
__turbopack_context__.k.register(_c2, "SuspenseScenario");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/app/src/scenarios/tearing.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TearingScenario",
    ()=>TearingScenario
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'react-concurrent-store'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$gate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/gate.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/src/ui.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
;
;
;
;
function Gated({ store, probe, recorder, gate }) {
    _s();
    const n = useStore(store);
    const held = gate.promise();
    if (held !== null && n > 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(held);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"])(probe, recorder, "gated", n);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        ref: ref,
        name: "gated",
        value: n
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
        lineNumber: 25,
        columnNumber: 10
    }, this);
}
_s(Gated, "wxjwR4bnNGf9L21PUjvhp21uDHY=", false, function() {
    return [
        useStore,
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"]
    ];
});
_c = Gated;
function Late({ store, probe, recorder }) {
    _s1();
    const n = useStore(store);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"])(probe, recorder, "revealed", n);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        ref: ref,
        name: "revealed",
        value: n
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
        lineNumber: 31,
        columnNumber: 10
    }, this);
}
_s1(Late, "wxjwR4bnNGf9L21PUjvhp21uDHY=", false, function() {
    return [
        useStore,
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"]
    ];
});
_c1 = Late;
function Hiding({ store, probe, recorder }) {
    _s2();
    const n = useStore(store);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"])(probe, recorder, "activity", n);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        ref: ref,
        name: "activity",
        value: n
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, this);
}
_s2(Hiding, "wxjwR4bnNGf9L21PUjvhp21uDHY=", false, function() {
    return [
        useStore,
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"]
    ];
});
_c2 = Hiding;
function Held({ probe, recorder }) {
    _s3();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"])(probe, recorder, "fallback", "held", false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
        ref: ref,
        name: "fallback",
        value: "held…",
        state: "pending",
        probe: false
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s3(Held, "gRUb57t6C3PlSal1iHHYLuEVJYs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReport"]
    ];
});
_c3 = Held;
function Controls({ gate, revealed, hidden, onReveal, onHide, onBlockedBump, run }) {
    _s4();
    const held = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSignal"])(gate.held);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onBlockedBump,
                disabled: held,
                children: "+1 in a blocked transition"
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onReveal,
                children: [
                    revealed ? "hide" : "reveal",
                    " second reader"
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onHide,
                children: [
                    hidden ? "show" : "hide",
                    " Activity tree"
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>gate.release(),
                disabled: !held,
                children: "release"
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "run",
                onClick: run,
                children: "Run"
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s4(Controls, "ymuYQRR+0UIRwNGgHfb7668YbrE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSignal"]
    ];
});
_c4 = Controls;
function TearingScenario() {
    _s5();
    const [{ store, recorder, probe, gate }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "TearingScenario.useState": ()=>({
                store: createStore(1),
                recorder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRecorder"])(),
                probe: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createProbe"])(),
                gate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$gate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeGate"])()
            })
    }["TearingScenario.useState"]);
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hidden, setHidden] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const props = {
        store,
        probe,
        recorder
    };
    const blockedBump = ()=>{
        gate.hold();
        recorder.push("dispatch", "+1 transition");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startTransition"])(()=>store.dispatch((n)=>n + 1));
    };
    const { verdict, run } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScript"])(recorder, {
        "TearingScenario.useScript": async (script)=>{
            gate.release();
            setRevealed(false);
            setHidden(true);
            store.dispatch(1);
            probe.resetCounts();
            // Watch what each painted frame actually showed, not just what committed.
            const stopWatching = probe.watchFrames();
            await script.wait(350);
            blockedBump();
            await script.step("dispatch inside a transition the gated reader blocks");
            script.check("nothing moved", probe.snapshot(), {
                gated: 1
            });
            setRevealed(true);
            await script.step("reveal a second reader while it is still blocked");
            script.check("every reader agrees", probe.agree(), true);
            script.check("on the value already on screen", probe.snapshot(), {
                gated: 1,
                revealed: 1
            });
            setHidden(false);
            await script.step("show the hidden Activity tree as well");
            script.check("still one value committed", probe.agree(), true);
            // A hidden tree has no attached nodes; showing it is what attaches them.
            script.check("and it is attached now", probe.value("activity", "ref"), 1);
            gate.release();
            await script.step("release the transition");
            script.check("all three move together", probe.snapshot(), {
                gated: 2,
                revealed: 2,
                activity: 2
            });
            script.check("and agree once attached too", probe.agree("ref"), true);
            script.check("no fallback was ever shown", probe.commits("fallback", "ref"), 0);
            // Not "do they agree now" — no commit along the way disagreed either.
            script.check("no commit was ever torn", probe.tears(), []);
            stopWatching();
            // The repair a reader makes when it lands behind runs in a layout effect,
            // which flushes before paint — so it should never get a frame of its own.
            const painted = probe.frames();
            script.check("no painted frame was torn", painted.filter({
                "TearingScenario.useScript": (f)=>new Set(Object.values(f)).size > 1
            }["TearingScenario.useScript"]), []);
            script.check("every painted frame showed a value the tree committed", painted.every({
                "TearingScenario.useScript": (f)=>Object.values(f).every({
                        "TearingScenario.useScript": (v)=>v === 1 || v === 2
                    }["TearingScenario.useScript"])
            }["TearingScenario.useScript"]), true);
        }
    }["TearingScenario.useScript"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-scenario": "tearing",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            title: "Nobody arrives early",
            proves: "A reader revealed while a transition is blocked — by a sibling " + "appearing, or by an Activity tree being shown — displays what the " + "rest of the page displays. It waits for the tree to commit rather " + "than starting a transition of its own and arriving first. Readings " + "come from layout effects and ref callbacks, never from the DOM.",
            recorder: recorder,
            stage: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "readers",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Held, {
                                probe: probe,
                                recorder: recorder
                            }, void 0, false, {
                                fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                                lineNumber: 182,
                                columnNumber: 35
                            }, this),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Gated, {
                                    ...props,
                                    gate: gate
                                }, void 0, false, {
                                    fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                                    lineNumber: 183,
                                    columnNumber: 17
                                }, this),
                                revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Late, {
                                    ...props
                                }, void 0, false, {
                                    fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                                    lineNumber: 184,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Activity"], {
                                    mode: hidden ? "hidden" : "visible",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Hiding, {
                                        ...props
                                    }, void 0, false, {
                                        fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                                        lineNumber: 186,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                                    lineNumber: 185,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                            lineNumber: 182,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                        lineNumber: 181,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "readers",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Agreement"], {
                            probe: probe
                        }, void 0, false, {
                            fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                            lineNumber: 191,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                        lineNumber: 190,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                lineNumber: 180,
                columnNumber: 11
            }, this),
            controls: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Controls, {
                gate: gate,
                revealed: revealed,
                hidden: hidden,
                onReveal: ()=>setRevealed((r)=>!r),
                onHide: ()=>setHidden((h)=>!h),
                onBlockedBump: blockedBump,
                run: run
            }, void 0, false, {
                fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
                lineNumber: 196,
                columnNumber: 11
            }, this),
            verdict: verdict
        }, void 0, false, {
            fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/app/src/scenarios/tearing.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
_s5(TearingScenario, "BXien4Fr4wD7/EvlOdbj/gCP2u4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$src$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScript"]
    ];
});
_c5 = TearingScenario;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Gated");
__turbopack_context__.k.register(_c1, "Late");
__turbopack_context__.k.register(_c2, "Hiding");
__turbopack_context__.k.register(_c3, "Held");
__turbopack_context__.k.register(_c4, "Controls");
__turbopack_context__.k.register(_c5, "TearingScenario");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/app/src/ui.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Agreement",
    ()=>Agreement,
    "Card",
    ()=>Card,
    "Chip",
    ()=>Chip,
    "Chronological",
    ()=>Chronological,
    "RecorderProvider",
    ()=>RecorderProvider,
    "Track",
    ()=>Track,
    "createProbe",
    ()=>createProbe,
    "createRecorder",
    ()=>createRecorder,
    "createSignal",
    ()=>createSignal,
    "runEveryScenario",
    ()=>runEveryScenario,
    "settle",
    ()=>settle,
    "useRecorder",
    ()=>useRecorder,
    "useReport",
    ()=>useReport,
    "useScript",
    ()=>useScript,
    "useSignal",
    ()=>useSignal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.5_@types+node@22.20.3_react-dom@19.3.0_react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature();
;
function createRecorder() {
    const marks = [];
    const listeners = new Set();
    let queued = false;
    let version = 0;
    // Readers record from inside their own render, so telling the track about it
    // straight away would be a setState during someone else's render. The mark
    // is kept immediately; only the notification waits for the microtask.
    const announce = ()=>{
        version += 1;
        if (queued) return;
        queued = true;
        queueMicrotask(()=>{
            queued = false;
            for (const l of listeners)l();
        });
    };
    return {
        version: ()=>version,
        marks,
        push (kind, text) {
            marks.push({
                kind,
                text,
                at: performance.now()
            });
            announce();
        },
        clear () {
            marks.length = 0;
            announce();
        },
        subscribe (listener) {
            listeners.add(listener);
            return ()=>listeners.delete(listener);
        }
    };
}
function createProbe() {
    const cells = new Map([
        [
            "ref",
            new Map()
        ],
        [
            "layout",
            new Map()
        ],
        [
            "effect",
            new Map()
        ]
    ]);
    const counts = new Map();
    const readers = new Set();
    const order = [];
    const listeners = new Set();
    const tears = [];
    const frames = [];
    let queued = false;
    let version = 0;
    const cell = (phase)=>cells.get(phase);
    const key = (name, phase)=>`${phase}:${name}`;
    const readerNames = (phase)=>order.filter((name)=>readers.has(name) && cell(phase).has(name));
    // Reported from effects, so a listener is told on a microtask rather than
    // synchronously inside someone else's commit.
    // One check per commit, on a microtask: every layout effect in that commit
    // has run by then, and paint has not happened yet. Checking inside a report
    // would see the commit half-applied and call every commit torn.
    const announce = ()=>{
        version += 1;
        if (queued) return;
        queued = true;
        queueMicrotask(()=>{
            queued = false;
            const names = order.filter((name)=>readers.has(name) && cell("layout").has(name));
            const shown = names.map((name)=>cell("layout").get(name));
            if (new Set(shown).size > 1) {
                tears.push(Object.fromEntries(names.map((n, i)=>[
                        n,
                        shown[i]
                    ])));
            }
            for (const l of listeners)l();
        });
    };
    const snapshotOf = (phase)=>{
        const names = order.filter((name)=>readers.has(name) && cell(phase).has(name));
        return Object.fromEntries(names.map((n)=>[
                n,
                cell(phase).get(n)
            ]));
    };
    return {
        version: ()=>version,
        tears: ()=>tears,
        frames: ()=>frames,
        watchFrames () {
            let live = true;
            let previous = "";
            const sample = ()=>{
                if (!live) return;
                // Sampled in a frame callback, so this is what the frame showed.
                const shown = JSON.stringify(snapshotOf("ref"));
                if (shown !== previous) {
                    previous = shown;
                    frames.push(JSON.parse(shown));
                }
                requestAnimationFrame(sample);
            };
            requestAnimationFrame(sample);
            return ()=>{
                live = false;
            };
        },
        report (name, phase, value, reader) {
            if (!order.includes(name)) order.push(name);
            if (reader) readers.add(name);
            cell(phase).set(name, value);
            const k = key(name, phase);
            counts.set(k, (counts.get(k) ?? 0) + 1);
            announce();
        },
        forget (name, phase) {
            cell(phase).delete(name);
            announce();
        },
        value: (name, phase = "layout")=>cell(phase).get(name),
        values: (phase = "layout")=>readerNames(phase).map((name)=>cell(phase).get(name)),
        agree (phase = "layout") {
            return new Set(readerNames(phase).map((n)=>cell(phase).get(n))).size <= 1;
        },
        commits: (name, phase = "layout")=>counts.get(key(name, phase)) ?? 0,
        snapshot: (phase = "layout")=>Object.fromEntries(readerNames(phase).map((name)=>[
                    name,
                    cell(phase).get(name)
                ])),
        present: (name, phase = "layout")=>cell(phase).has(name),
        resetCounts () {
            counts.clear();
            tears.length = 0;
            frames.length = 0;
            announce();
        },
        subscribe (listener) {
            listeners.add(listener);
            return ()=>listeners.delete(listener);
        }
    };
}
function useReport(probe, recorder, name, value, reader = true) {
    _s();
    const attach = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useReport.useCallback[attach]": (node)=>{
            if (node === null) return;
            probe.report(name, "ref", value, reader);
            return ({
                "useReport.useCallback[attach]": ()=>probe.forget(name, "ref")
            })["useReport.useCallback[attach]"];
        }
    }["useReport.useCallback[attach]"], [
        probe,
        name,
        value,
        reader
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "useReport.useLayoutEffect": ()=>{
            probe.report(name, "layout", value, reader);
            return ({
                "useReport.useLayoutEffect": ()=>probe.forget(name, "layout")
            })["useReport.useLayoutEffect"];
        }
    }["useReport.useLayoutEffect"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useReport.useEffect": ()=>{
            probe.report(name, "effect", value, reader);
            recorder.push("render", `${name} ${String(value)}`);
            return ({
                "useReport.useEffect": ()=>probe.forget(name, "effect")
            })["useReport.useEffect"];
        }
    }["useReport.useEffect"]);
    return attach;
}
_s(useReport, "xOMJ3QlLfTAc/D0WyC4bGvA9G3Q=");
function Agreement({ probe }) {
    _s1();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(probe.subscribe, probe.version, probe.version);
    const torn = !probe.agree();
    const values = probe.values();
    const history = probe.tears();
    const everTorn = history.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
        name: "agreement",
        probe: false,
        value: values.length === 0 ? "no readers" : torn ? `TORN ${JSON.stringify(probe.snapshot())}` : everTorn ? `repaired, but torn in ${history.length} commit(s): ${JSON.stringify(history[0])}` : `consistent · ${String(values[0])}`,
        state: torn || everTorn ? "torn" : undefined
    }, void 0, false, {
        fileName: "[project]/packages/app/src/ui.tsx",
        lineNumber: 279,
        columnNumber: 5
    }, this);
}
_s1(Agreement, "FpwL93IKMLJZuQQXefVtWynbBPQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
_c = Agreement;
function createSignal(initial) {
    let value = initial;
    const listeners = new Set();
    return {
        get: ()=>value,
        set (next) {
            if (Object.is(next, value)) return;
            value = next;
            for (const l of listeners)l();
        },
        subscribe (listener) {
            listeners.add(listener);
            return ()=>listeners.delete(listener);
        }
    };
}
function useSignal(signal) {
    _s2();
    // Three arguments, not two. A `useSyncExternalStore` read without a server
    // snapshot throws during SSR, which is the ceremony `useStore` does not need
    // because the value a store was created with *is* the snapshot. A signal is
    // not a store, so it pays it: the value is the same on both sides here, so
    // the client getter serves.
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(signal.subscribe, signal.get, signal.get);
}
_s2(useSignal, "FpwL93IKMLJZuQQXefVtWynbBPQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
function Chronological({ store, pending, format = String }) {
    _s3();
    const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])({
        "Chronological.useSyncExternalStore[state]": (onChange)=>store.subscribe(onChange)
    }["Chronological.useSyncExternalStore[state]"], {
        "Chronological.useSyncExternalStore[state]": ()=>store.getState()
    }["Chronological.useSyncExternalStore[state]"], {
        "Chronological.useSyncExternalStore[state]": // Deliberately reading the chronological fold the old way, so it needs the
        // server snapshot that useStore does not.
        ()=>store.getState()
    }["Chronological.useSyncExternalStore[state]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
        name: "chronological",
        probe: false,
        value: format(state),
        state: pending ? "pending" : undefined
    }, void 0, false, {
        fileName: "[project]/packages/app/src/ui.tsx",
        lineNumber: 364,
        columnNumber: 5
    }, this);
}
_s3(Chronological, "k5lLvDpimy+p0C4C3bMaFVMfQ6Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
_c1 = Chronological;
const RecorderContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
_c2 = RecorderContext;
function RecorderProvider({ recorder, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RecorderContext, {
        value: recorder,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/app/src/ui.tsx",
        lineNumber: 382,
        columnNumber: 10
    }, this);
}
_c3 = RecorderProvider;
function useRecorder() {
    const recorder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(RecorderContext);
    if (recorder === null) throw new Error("No recorder in scope");
    return recorder;
}
function Track({ recorder }) {
    _s4();
    // Debug readouts mirroring a mutable source outside React, which is exactly
    // what useSyncExternalStore is for. The store itself avoids it because of
    // the transition de-opt; a readout of what already happened does not care.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(recorder.subscribe, recorder.version, recorder.version);
    const shown = recorder.marks.slice(-26);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "track",
        children: shown.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "t",
            children: "idle"
        }, void 0, false, {
            fileName: "[project]/packages/app/src/ui.tsx",
            lineNumber: 401,
            columnNumber: 9
        }, this) : shown.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `t ${m.kind}`,
                children: m.text
            }, i, false, {
                fileName: "[project]/packages/app/src/ui.tsx",
                lineNumber: 404,
                columnNumber: 11
            }, this))
    }, void 0, false, {
        fileName: "[project]/packages/app/src/ui.tsx",
        lineNumber: 399,
        columnNumber: 5
    }, this);
}
_s4(Track, "FpwL93IKMLJZuQQXefVtWynbBPQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
_c4 = Track;
function Chip({ name, value, state, probe = true, ref }) {
    _s5();
    const node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Composed, so the caller's ref still gets the node and still gets to return
    // its own cleanup.
    const attach = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Chip.useCallback[attach]": (element)=>{
            node.current = element;
            const release = ref?.(element);
            return ({
                "Chip.useCallback[attach]": ()=>{
                    node.current = null;
                    release?.();
                }
            })["Chip.useCallback[attach]"];
        }
    }["Chip.useCallback[attach]"], [
        ref
    ]);
    // The flash is decoration, so it is driven straight on the element rather
    // than through state — setting state here would schedule a render for every
    // value a reader shows. Reading offsetWidth restarts the CSS animation.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Chip.useEffect": ()=>{
            const element = node.current;
            if (element === null) return;
            element.classList.remove("flash");
            void element.offsetWidth;
            element.classList.add("flash");
        }
    }["Chip.useEffect"], [
        value
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: attach,
        className: `chip${state ? ` ${state}` : ""}`,
        "data-reader": probe ? name : undefined,
        "data-value": String(value),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "name",
                children: name
            }, void 0, false, {
                fileName: "[project]/packages/app/src/ui.tsx",
                lineNumber: 476,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "value",
                children: value
            }, void 0, false, {
                fileName: "[project]/packages/app/src/ui.tsx",
                lineNumber: 477,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/app/src/ui.tsx",
        lineNumber: 470,
        columnNumber: 5
    }, this);
}
_s5(Chip, "kq/fMTR5rMn0nSLS/lJP5A9D9dE=");
_c5 = Chip;
/**
 * The verdict is its own component reading its own signal. If the panel
 * re-rendered on every step, that would be a *sync* render of a subtree whose
 * pending transition state suspends — which makes React commit a fallback the
 * concurrent path would never have shown. The harness must not be able to
 * change the thing it is measuring.
 */ function VerdictRow({ verdict: signal }) {
    _s6();
    const verdict = useSignal(signal);
    const light = verdict.kind === "running" ? "wait" : verdict.kind === "done" ? verdict.ok ? "ok" : "bad" : "";
    const message = verdict.kind === "running" ? verdict.step : verdict.kind === "done" ? verdict.error ?? (verdict.ok ? "every reading matched" : "a reading did not match") : "drive it by hand, or press Run";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "verdict",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `light ${light}`
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/ui.tsx",
                        lineNumber: 518,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `msg${verdict.kind === "done" ? verdict.ok ? " ok" : " bad" : ""}`,
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/ui.tsx",
                        lineNumber: 519,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/ui.tsx",
                lineNumber: 517,
                columnNumber: 7
            }, this),
            verdict.kind === "done" && verdict.checks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "checks",
                children: verdict.checks.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: c.ok ? "ok" : "bad",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mark",
                                children: c.ok ? "✓" : "✗"
                            }, void 0, false, {
                                fileName: "[project]/packages/app/src/ui.tsx",
                                lineNumber: 529,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "label",
                                children: c.label
                            }, void 0, false, {
                                fileName: "[project]/packages/app/src/ui.tsx",
                                lineNumber: 530,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "got",
                                children: c.ok ? c.got : `${c.got} ≠ ${c.want}`
                            }, void 0, false, {
                                fileName: "[project]/packages/app/src/ui.tsx",
                                lineNumber: 531,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/packages/app/src/ui.tsx",
                        lineNumber: 528,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/packages/app/src/ui.tsx",
                lineNumber: 526,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/app/src/ui.tsx",
        lineNumber: 516,
        columnNumber: 5
    }, this);
}
_s6(VerdictRow, "yaCFV7nQVW2YbiKG0EK+jVj87B4=", false, function() {
    return [
        useSignal
    ];
});
_c6 = VerdictRow;
function Card({ title, proves, stage, controls, recorder, verdict }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/ui.tsx",
                        lineNumber: 558,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "proves",
                        children: proves
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/ui.tsx",
                        lineNumber: 559,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/ui.tsx",
                lineNumber: 557,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "stage",
                children: [
                    stage,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Track, {
                        recorder: recorder
                    }, void 0, false, {
                        fileName: "[project]/packages/app/src/ui.tsx",
                        lineNumber: 563,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/app/src/ui.tsx",
                lineNumber: 561,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "controls",
                children: controls
            }, void 0, false, {
                fileName: "[project]/packages/app/src/ui.tsx",
                lineNumber: 565,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VerdictRow, {
                verdict: verdict
            }, void 0, false, {
                fileName: "[project]/packages/app/src/ui.tsx",
                lineNumber: 566,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/app/src/ui.tsx",
        lineNumber: 556,
        columnNumber: 5
    }, this);
}
_c7 = Card;
/* ----------------------------------------------------------------- script */ /**
 * Every panel's scripted run, in mount order. They run one after another
 * rather than together: six panels driving transitions at once contend for the
 * main thread, and a scripted wait that was long enough alone stops being long
 * enough under that load. Sequential is also what you want to watch.
 */ const runners = new Map();
let nextRunnerId = 0;
async function runEveryScenario() {
    for (const id of Array.from(runners.keys()).sort((a, b)=>a - b)){
        await runners.get(id)?.();
    }
}
const settle = ()=>new Promise((resolve)=>requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(resolve, 0))));
function useScript(recorder, body, beat = 520) {
    _s7();
    const [verdict] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useScript.useState": ()=>createSignal({
                kind: "idle"
            })
    }["useScript.useState"]);
    const running = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [id] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useScript.useState": ()=>nextRunnerId++
    }["useScript.useState"]);
    const latest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        "useScript.useRef[latest]": async ()=>{}
    }["useScript.useRef[latest]"]);
    const run = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useScript.useCallback[run]": async ()=>{
            if (running.current) return;
            running.current = true;
            recorder.clear();
            const checks = [];
            const script = {
                async step (label) {
                    verdict.set({
                        kind: "running",
                        step: label
                    });
                    recorder.push("note", label);
                    await settle();
                    await new Promise({
                        "useScript.useCallback[run]": (r)=>setTimeout(r, beat)
                    }["useScript.useCallback[run]"]);
                },
                check (label, got, want) {
                    const g = JSON.stringify(got);
                    const w = JSON.stringify(want);
                    const ok = g === w;
                    checks.push({
                        label,
                        got: g,
                        want: w,
                        ok
                    });
                    // On the track as well, so a reading can be placed in the sequence
                    // that produced it rather than only in the summary.
                    recorder.push("note", `${ok ? "✓" : "✗"} ${label} ${g}`);
                },
                wait: {
                    "useScript.useCallback[run]": (ms = beat)=>settle().then({
                            "useScript.useCallback[run]": ()=>new Promise({
                                    "useScript.useCallback[run]": (r)=>setTimeout(r, ms)
                                }["useScript.useCallback[run]"])
                        }["useScript.useCallback[run]"])
                }["useScript.useCallback[run]"],
                async until (what, ready, timeout = 4000) {
                    const deadline = performance.now() + timeout;
                    for(;;){
                        await settle();
                        if (ready()) return;
                        if (performance.now() > deadline) {
                            throw new Error(`timed out waiting for ${what}`);
                        }
                        await new Promise({
                            "useScript.useCallback[run]": (r)=>setTimeout(r, 30)
                        }["useScript.useCallback[run]"]);
                    }
                }
            };
            try {
                await body(script);
                verdict.set({
                    kind: "done",
                    ok: checks.every({
                        "useScript.useCallback[run]": (c)=>c.ok
                    }["useScript.useCallback[run]"]),
                    checks
                });
            } catch (error) {
                verdict.set({
                    kind: "done",
                    ok: false,
                    checks,
                    error: error instanceof Error ? error.message : String(error)
                });
            } finally{
                running.current = false;
            }
        }
    }["useScript.useCallback[run]"], [
        recorder,
        body,
        beat,
        verdict
    ]);
    // Registered through a ref so the entry is stable even though `run` is a new
    // closure on every render.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useScript.useEffect": ()=>{
            latest.current = run;
        }
    }["useScript.useEffect"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$5_$40$types$2b$node$40$22$2e$20$2e$3_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useScript.useEffect": ()=>{
            const call = {
                "useScript.useEffect.call": ()=>latest.current()
            }["useScript.useEffect.call"];
            runners.set(id, call);
            return ({
                "useScript.useEffect": ()=>{
                    runners.delete(id);
                }
            })["useScript.useEffect"];
        }
    }["useScript.useEffect"], [
        id
    ]);
    return {
        verdict,
        run
    };
}
_s7(useScript, "6Qahk/aC4W/2YsBcAsmPGGVmRVc=");
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "Agreement");
__turbopack_context__.k.register(_c1, "Chronological");
__turbopack_context__.k.register(_c2, "RecorderContext");
__turbopack_context__.k.register(_c3, "RecorderProvider");
__turbopack_context__.k.register(_c4, "Track");
__turbopack_context__.k.register(_c5, "Chip");
__turbopack_context__.k.register(_c6, "VerdictRow");
__turbopack_context__.k.register(_c7, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=packages_app_024-6-m._.js.map