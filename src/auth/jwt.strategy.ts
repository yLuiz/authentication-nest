import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JWT_CONSTANTS } from "./auth.constants";

type Payload = {
    username: string;
    sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_CONSTANTS.SECRET,
        })
    }

    async validate(payload: Payload){
        return { 
            userId: payload.sub,
            username: payload.username
        }
    }
}