"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtelMethodCounter = exports.OtelInstanceCounter = void 0;
const metric_data_1 = require("../metric-data");
/**
 * Create and increment a counter when a new instance is created
 *
 * @param ctor
 */
const OtelInstanceCounter = (options) => (ctor) => {
    const name = `app_${ctor.name}_instances_total`;
    const description = `app_${ctor.name} object instances total`;
    let counterMetric;
    return class extends ctor {
        constructor(...args) {
            if (!counterMetric) {
                counterMetric = (0, metric_data_1.getOrCreateCounter)(name, Object.assign({ description }, options));
            }
            counterMetric.add(1);
            super(...args);
        }
    };
};
exports.OtelInstanceCounter = OtelInstanceCounter;
/**
 * Create and increment a counter when the method is called
 */
const OtelMethodCounter = (options) => (target, propertyKey, descriptor) => {
    const className = target.constructor.name;
    const name = `app_${className}_${propertyKey.toString()}_calls_total`;
    const description = `app_${className}#${propertyKey.toString()} called total`;
    let counterMetric;
    const methodFunc = descriptor.value;
    // eslint-disable-next-line no-param-reassign, func-names
    descriptor.value = function (...args) {
        if (!counterMetric) {
            counterMetric = (0, metric_data_1.getOrCreateCounter)(name, Object.assign({ description }, options));
        }
        counterMetric.add(1);
        return methodFunc.apply(this, args);
    };
};
exports.OtelMethodCounter = OtelMethodCounter;
//# sourceMappingURL=common.js.map