"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessRole = void 0;
const common_1 = require("@nestjs/common");
const util_1 = require("../guards/util");
const AccessRole = (roleKey, app = null) => {
    class AccessRoleMixin {
        constructor() {
            this.logger = new common_1.Logger(exports.AccessRole.name);
        }
        canActivate(context) {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            if (util_1.Util.haveSuperAdmin(user)) {
                return true;
            }
            const matchRole = user.accesses.find((access) => access.roleKey === roleKey && (app === null || app === access.appId));
            this.logger.debug(`Match Role ${JSON.stringify(matchRole)}`);
            return matchRole ? true : false;
        }
    }
    return (0, common_1.mixin)(AccessRoleMixin);
};
exports.AccessRole = AccessRole;
//# sourceMappingURL=access-role.js.map