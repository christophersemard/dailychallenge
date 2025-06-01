import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserPayload } from "./auth.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || "secretKey",
        });
    }

    validate(payload: UserPayload) {
        // console.log("Payload JWT reçu :", payload);
        return {
            id: payload.id,
            email: payload.email,
            role: payload.role,
            pseudo: payload.pseudo,
        };
    }
}
