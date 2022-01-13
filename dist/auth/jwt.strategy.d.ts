import { JwtPayload } from 'jsonwebtoken';
import { Strategy } from 'passport-jwt';
import { User } from './auth.dto';
import { AuthService } from './auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
