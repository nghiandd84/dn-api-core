"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.loggerOptions = exports.Logger = void 0;
const pino_1 = require("pino");
const pino_2 = require("pino");
const api_1 = require("@opentelemetry/api");
const tracing_1 = require("../monitor/tracing");
var nestjs_pino_1 = require("nestjs-pino");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return nestjs_pino_1.Logger; } });
exports.loggerOptions = {
    level: 'info',
    formatters: {
        level(label) {
            return { level: label };
        },
        log(object) {
            const span = api_1.trace.getSpan(api_1.context.active());
            if (!span)
                return Object.assign({}, object);
            // const { spanId, traceId } = trace
            //   .getSpan(context.active())
            //   ?.spanContext();
            const { spanId, traceId } = (0, tracing_1.activeSpanContext)();
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