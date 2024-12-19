import { Injectable, ExecutionContext, UnauthorizedException, CanActivate, HttpException, ForbiddenException } from "@nestjs/common";
import { CreateAuthToken } from "../../utils/jwt_token_authentication";
import { AdminService } from "./admin.service";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private adminService: AdminService, private createAuthToken: CreateAuthToken) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {

            const ctx = context.switchToHttp().getRequest();

            const token: string = ctx.headers['authorization'];

            if (!token) {
                throw new UnauthorizedException("Pleas provide a proper token")
            }

            const decodeData: object = await this.createAuthToken.verifyToken(token)

            const isAdmin = this.adminService.isExistAdmin(decodeData["id"])

            if (!isAdmin) {
                throw new ForbiddenException("Unauthorized access please login")
            }

            ctx.decodedData = decodeData;

            return true;
        }
        catch (error) {
            throw new HttpException(error?.message ?? "Unauthorized access please login", 403)
        }
    }
}