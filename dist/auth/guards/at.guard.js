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
var AtGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const rabbitmq_helpers_1 = require("../../rabbitmq/rabbitmq.helpers");
let AtGuard = AtGuard_1 = class AtGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
        this.logger = new common_1.Logger(AtGuard_1.name);
    }
    canActivate(context) {
        const isRabitMT = (0, rabbitmq_helpers_1.isRabbitContext)(context);
        if (isRabitMT) {
            return true;
        }
        this.logger.debug('can active', this.reflector);
        const isPublic = this.reflector.getAllAndOverride('IS_PUBLIC_API', [
            context.getHandler(),
            context.getClass(),
        ]);
        this.logger.debug(`isPublic ${isPublic}`);
        if (isPublic)
            return true;
        return super.canActivate(context);
    }
};
AtGuard = AtGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AtGuard);
exports.AtGuard = AtGuard;
//# sourceMappingURL=at.guard.js.map