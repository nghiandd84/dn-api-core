"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
/**
 * @public
 */
function getToken(name) {
    return `OTEL_METRIC_${name.toUpperCase()}`;
}
exports.getToken = getToken;
//# sourceMappingURL=utils.js.map