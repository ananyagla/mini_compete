import { JwtService } from '@nestjs/jwt';
import { SignupDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
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
