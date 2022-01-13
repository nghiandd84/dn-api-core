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
exports.AuthCacheService = void 0;
const common_1 = require("@nestjs/common");
const auth_helper_1 = require("../auth/auth.helper");
let AuthCacheService = class AuthCacheService {
    constructor() { }
    set(key, value) {
        auth_helper_1.authHelper.cache.set('AUTH_' + key, value, { ttl: 0 });
    }
    get(key) {
        return auth_helper_1.authHelper.cache.get('AUTH_' + key);
    }
    clear(key) {
        auth_helper_1.authHelper.cache.del('AUTH_' + key);
    }
};
AuthCacheService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AuthCacheService);
exports.AuthCacheService = AuthCacheService;
//# sourceMappingURL=auth-cache.service.js.map