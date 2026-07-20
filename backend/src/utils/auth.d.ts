export declare const hashPassword: (password: string) => Promise<string>;
export declare const verifyPassword: (password: string, hash: string) => Promise<boolean>;
export declare const generateToken: (user: any, type?: string) => string;
//# sourceMappingURL=auth.d.ts.map