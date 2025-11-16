export declare class SignupDto {
    name: string;
    email: string;
    password: string;
    role: 'participant' | 'organizer';
}
export declare class LoginDto {
    email: string;
    password: string;
}
