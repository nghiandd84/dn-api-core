"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeSpanContext = exports.otelSDK = void 0;
const api_1 = require("@opentelemetry/api");
__exportStar(require("./decorators/span"), exports);
__exportStar(require("./trace.service"), exports);
var tracing_1 = require("./tracing");
Object.defineProperty(exports, "otelSDK", { enumerable: true, get: function () { return tracing_1.otelSDK; } });
const activeSpanContext = () => { var _a; return (_a = api_1.trace.getSpan(api_1.context.active())) === null || _a === void 0 ? void 0 : _a.spanContext(); };
exports.activeSpanContext = activeSpanContext;
//# sourceMappingURL=index.js.map