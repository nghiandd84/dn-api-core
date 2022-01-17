"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessPermission = void 0;
const common_1 = require("@nestjs/common");
const auth_cache_service_1 = require("../auth-cache.service");
const util_1 = require("../guards/util");
const rabbitmq_helpers_1 = require("../../rabbitmq/rabbitmq.helpers");
const AccessPermission = (permisionKey, locationId = null) => {
    let AccessPermissionMixin = class AccessPermissionMixin {
        constructor(authCacheService) {
            this.authCacheService = authCacheService;
            this.logger = new common_1.Logger(exports.AccessPermission.name);
        }
        canActivate(context) {
            const isRabitMT = (0, rabbitmq_helpers_1.isRabbitContext)(context);
            if (isRabitMT) {
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            this.logger.debug(permisionKey, locationId);
            if (util_1.Util.haveSuperAdmin(user)) {
                return true;
            }
            let accesses = user.accesses || [];
            if (locationId) {
                accesses = accesses.filter((access) => access.locationId === locationId);
            }
            return new Promise((resolve, reject) => {
                const allPromise = [];
                for (const access of accesses) {
                    allPromise.push(this.authCacheService.get('ROLE_' + access.roleKey));
                }
                Promise.all(allPromise).then((permissionStrArr) => {
                    let isMatch = false;
                    const matchKey = `|||${permisionKey}|||`;
                    for (const permissionStr of permissionStrArr) {
                        if (permissionStr.indexOf(matchKey) >= 0) {
                            this.logger.debug(`Match permission ${permisionKey}`);
                            isMatch = true;
                            break;
                        }
                    }
                    if (isMatch) {
                        resolve(true);
                    }
                    else {
                        this.logger.error(`Not match permission ${permisionKey}`);
                        reject(false);
                    }
                });
            });
        }
    };
    AccessPermissionMixin = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [auth_cache_service_1.AuthCacheService])
    ], AccessPermissionMixin);
    return (0, common_1.mixin)(AccessPermissionMixin);
};
exports.AccessPermission = AccessPermission;
//# sourceMappingURL=access-permission.js.map