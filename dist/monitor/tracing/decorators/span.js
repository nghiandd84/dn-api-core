"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Span = void 0;
const api_1 = require("@opentelemetry/api");
function Span(name) {
    return (target, propertyKey, propertyDescriptor) => {
        const method = propertyDescriptor.value;
        // eslint-disable-next-line no-param-reassign
        propertyDescriptor.value = function PropertyDescriptor(...args) {
            const currentSpan = api_1.trace.getSpan(api_1.context.active());
            const tracer = api_1.trace.getTracer('default');
            return api_1.context.with(api_1.trace.setSpan(api_1.context.active(), currentSpan), () => {
                const span = tracer.startSpan(name || `${target.constructor.name}.${propertyKey}`);
                if (method.constructor.name === 'AsyncFunction') {
                    return method.apply(this, args).finally(() => {
                        span.end();
                    });
                }
                const result = method.apply(this, args);
                span.end();
                return result;
            });
        };
    };
}
exports.Span = Span;
//# sourceMappingURL=span.js.map