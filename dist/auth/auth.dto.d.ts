export declare class Login {
    readonly email: string;
    readonly password: string;
}
export declare class RegisterUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export declare class User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    rd?: number;
    accesses?: UserAccess[];
}
export interface UserAccess {
    id: number;
    locationId?: string | number | null;
    appId?: string;
    roleKey?: string;
}
export declare class LoginStatus {
    id: number;
    token: string;
    expiresIn: number | string;
}
//# sourceMappingURL=auth.dto.d.ts.map