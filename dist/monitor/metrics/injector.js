"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectMetric = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("./utils");
function InjectMetric(name) {
    const token = (0, utils_1.getToken)(name);
    return (0, common_1.Inject)(token);
}
exports.InjectMetric = InjectMetric;
//# sourceMappingURL=injector.js.map