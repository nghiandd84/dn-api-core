"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Access = void 0;
const common_1 = require("@nestjs/common");
const Access = (permission, app = null) => (0, common_1.SetMetadata)('app_access', { key: permission, app });
exports.Access = Access;
//# sourceMappingURL=access.js.map