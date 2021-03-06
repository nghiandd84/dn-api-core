"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtelHistogram = void 0;
const common_1 = require("@nestjs/common");
const metric_data_1 = require("../metric-data");
exports.OtelHistogram = (0, common_1.createParamDecorator)((name, options) => {
    if (!name || name.length === 0) {
        throw new Error('OtelHistogram need a name argument');
    }
    return (0, metric_data_1.getOrCreateHistogram)(name, options);
});
//# sourceMappingURL=histogram.js.map