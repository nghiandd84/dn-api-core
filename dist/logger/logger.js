"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.loggerOptions = exports.Logger = void 0;
const pino_1 = require("pino");
const pino_2 = require("pino");
const api_1 = require("@opentelemetry/api");
var nestjs_pino_1 = require("nestjs-pino");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return nestjs_pino_1.Logger; } });
exports.loggerOptions = {
    level: 'info',
    formatters: {
        level(label) {
            return { level: label };
        },
        log(object) {
            var _a;
            const span = api_1.trace.getSpan(api_1.context.active());
            if (!span)
                return Object.assign({}, object);
            const { spanId, traceId } = (_a = api_1.trace
                .getSpan(api_1.context.active())) === null || _a === void 0 ? void 0 : _a.spanContext();
            return Object.assign(Object.assign({}, object), { spanId, traceId });
        },
    },
    // prettyPrint:
    //   !!process.env.APP_ENVIRONTMENT
    //     ? {
    //         colorize: true,
    //         levelFirst: true,
    //         translateTime: true,
    //       }
    //     : false,
};
exports.logger = (0, pino_1.default)(exports.loggerOptions, (0, pino_2.destination)(process.env.LOG_FILE_NAME || 'logs/app.log'));
//# sourceMappingURL=logger.js.map