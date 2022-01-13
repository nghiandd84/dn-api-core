"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
class Util {
}
exports.Util = Util;
Util.haveSuperAdmin = (user) => {
    const accesses = user.accesses || [];
    if (accesses.length === 0) {
        return false;
    }
    const superAdminAccess = accesses.find(access => access.roleKey === 'SUPER_ADMIN');
    return !!superAdminAccess;
};
//# sourceMappingURL=util.js.map