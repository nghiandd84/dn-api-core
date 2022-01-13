import { JwtPayload } from 'jsonwebtoken';
import { Strategy } from 'passport-jwt';
import { User } from '../auth.dto';
import { AuthService } from '../auth.service';
declare const AtStrategy_base: new (...args: any[]) => Strategy;
export declare class AtStrategy extends AtStrategy_base {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
