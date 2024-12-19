import { Injectable, ForbiddenException } from "@nestjs/common";
import { sign, verify } from "jsonwebtoken";

@Injectable()
export class CreateAuthToken {
    constructor() { }
    async createToken(data: any) {
        try {

            const token = await sign({
                data
            }, <string>process.env.SECRET_KEY, { expiresIn: 60 * 60 });

            return token;
        }
        catch (error) {
            console.error("Token creation failed");
        }
    }

    async verifyToken(token: string) {
        try {
            const decode = await verify(token, <string>process.env.SECRET_KEY);
            return decode;
        }
        catch (error) {
            console.error("Token verification error.");
            throw new ForbiddenException("Unauthorized access please login")
        }
    }
}