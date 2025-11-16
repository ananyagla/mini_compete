import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignupDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: "organizer" | "participant";
        };
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
        };
    }>;
}
