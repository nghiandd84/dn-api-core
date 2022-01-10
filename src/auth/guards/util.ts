import { User } from "../auth.dto";

export class Util {
    static haveSuperAdmin = (user: User) => {
        const accesses = user.accesses || [];
        if (accesses.length === 0 ) {
            return false;
        }
        const superAdminAccess = accesses.find(access => access.roleKey === 'SUPER_ADMIN');
        return !!superAdminAccess;
    }
}