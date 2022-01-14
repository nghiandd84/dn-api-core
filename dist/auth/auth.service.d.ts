import { CacheStore } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { User } from './auth.dto';
import { Login, LoginStatus, RegisterUser } from './auth.dto';
interface UserService {
    findByLogin: (email: string, password: string) => Promise<any>;
    create: (register: RegisterUser) => Promise<{
        id: number;
    }>;
}
export declare class AuthService {
    private cacheManager;
    constructor(cacheManager: CacheStore);
    validateUser(payload: JwtPayload): Promise<User>;
    login(loginUserDto: Login, service: UserService): Promise<LoginStatus>;
    register(userDto: RegisterUser, service: UserService): Promise<LoginStatus>;
    private createToken;
    private getAuthCachKey;
}
export {};
//# sourceMappingURL=auth.service.d.ts.map