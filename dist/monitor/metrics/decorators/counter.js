"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtelUpDownCounter = exports.OtelCounter = void 0;
const common_1 = require("@nestjs/common");
const metric_data_1 = require("../metric-data");
exports.OtelCounter = (0, common_1.createParamDecorator)((name, options) => {
    if (!name || name.length === 0) {
        throw new Error('OtelCounter need a name argument');
    }
    return (0, metric_data_1.getOrCreateCounter)(name, options);
});
exports.OtelUpDownCounter = (0, common_1.createParamDecorator)((name, options) => {
    if (!name || name.length === 0) {
        throw new Error('OtelUpDownCounter need a name argument');
    }
    return (0, metric_data_1.getOrCreateCounter)(name, options);
});
//# sourceMappingURL=counter.js.map