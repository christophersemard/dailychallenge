import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async generateToken(user: { id: number; email: string; role: string }) {
        return this.jwtService.sign({
            sub: user.id,
            id: user.id,
            email: user.email,
            role: user.role,
        });
    }

    async verifyToken(token: string) {
        return this.jwtService.verify(token);
    }
}
