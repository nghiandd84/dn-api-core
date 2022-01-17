"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const constant_1 = require("./constant");
const strategies_1 = require("./strategies");
const redisStore = require("cache-manager-redis-store");
const auth_cache_service_1 = require("./auth-cache.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.register({
                store: redisStore,
                url: process.env.AUTH_REDIS_URL || constant_1.Constants.REDIS_URL,
                ttl: process.env.AUTH_REDIS_TTL || constant_1.Constants.REDIS_TTL,
            }),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt',
                property: 'user',
                session: false,
            }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || constant_1.Constants.JWT_SECRET,
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRESIN || constant_1.Constants.JWT_EXPIRESIN,
                },
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            auth_cache_service_1.AuthCacheService,
            strategies_1.AtStrategy,
            strategies_1.RtStrategy,
            core_1.Reflector
        ],
        exports: [
            auth_service_1.AuthService,
            auth_cache_service_1.AuthCacheService
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map