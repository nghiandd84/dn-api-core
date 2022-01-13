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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_helper_1 = require("../auth/auth.helper");
const jsonwebtoken_1 = require("jsonwebtoken");
const constant_1 = require("./constant");
let AuthService = class AuthService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
        auth_helper_1.authHelper.cache = cacheManager;
    }
    async validateUser(payload) {
        const userId = parseInt(payload.id);
        const user = await this.cacheManager.get(this.getAuthCachKey(userId));
        if (!user) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (user.rd !== payload.rd) {
            this.cacheManager.del(this.getAuthCachKey(userId));
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    async login(loginUserDto, service) {
        const user = await service.findByLogin(loginUserDto.email, loginUserDto.password);
        const rd = Math.ceil(Math.random() * 10000000);
        user.rd = rd;
        user.password = undefined;
        if (Array.isArray(user.accesses)) {
            for (let index = 0; index < user.accesses.length; index++) {
                user.accesses[index] = {
                    id: user.accesses[index].id,
                    appId: user.accesses[index].appId,
                    locationId: user.accesses[index].locationId,
                    roleKey: user.accesses[index].roleKey,
                };
            }
        }
        this.cacheManager.set(this.getAuthCachKey(user.id), user);
        const token = this.createToken(user);
        return {
            id: user.id,
            expiresIn: token.expiresIn,
            token: token.token,
        };
    }
    register(userDto, service) {
        return service
            .create(userDto)
            .then(() => this.login({ email: userDto.email, password: userDto.password }, service));
    }
    createToken(user) {
        const expiresIn = parseInt(process.env.JWT_EXPIRESIN) || constant_1.Constants.JWT_EXPIRESIN;
        const secretOrKey = process.env.JWT_SECRET || constant_1.Constants.JWT_SECRET;
        const userData = { id: user.id, rd: user.rd || null };
        const token = (0, jsonwebtoken_1.sign)(userData, secretOrKey, { expiresIn });
        return { token, expiresIn };
    }
    getAuthCachKey(keyId) {
        if (keyId) {
            return `AUTH_USER_${keyId || ''}`;
        }
        throw new common_1.HttpException('Auth key error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map