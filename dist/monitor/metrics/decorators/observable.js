"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtelObservableUpDownCounter = exports.OtelObservableCounter = exports.OtelObservableGauge = void 0;
const common_1 = require("@nestjs/common");
const metric_data_1 = require("../metric-data");
exports.OtelObservableGauge = (0, common_1.createParamDecorator)((name, options) => {
    if (!name || name.length === 0) {
        throw new Error('OtelObservableGauge need a name argument');
    }
    return (0, metric_data_1.getOrCreateObservableGauge)(name, options);
});
exports.OtelObservableCounter = (0, common_1.createParamDecorator)((name, options) => {
    if (!name || name.length === 0) {
        throw new Error('OtelObservableCounter need a name argument');
    }
    return (0, metric_data_1.getOrCreateObservableCounter)(name, options);
});
exports.OtelObservableUpDownCounter = (0, common_1.createParamDecorator)((name, options) => {
    if (!name || name.length === 0) {
        throw new Error('OtelObservableUpDownCounter need a name argument');
    }
    return (0, metric_data_1.getOrCreateObservableUpDownCounter)(name, options);
});
//# sourceMappingURL=observable.js.map