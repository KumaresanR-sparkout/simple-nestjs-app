import { Controller, Req, Res, Get, Post, Patch, Delete, Body, UsePipes, Param, HttpException, UseGuards } from '@nestjs/common';
import { Request, Response } from "express";
import { AdminService } from './admin.service';
import { successResponse, errorResponse } from 'utils/response_handler';
import { CreateAdmin, LoginAdmin, UpdateAdmin } from "./interfaces/admin.interface";
import { CreateAdminValidation, UpdateAdminValidate, LoginAdminValidate } from "./pipes/admin_validation.pipe";
import { IsObjectId } from "../../utils/objectId_validation_pipe";
import { AuthGuard } from "./admin.guard";
import { CreateAuthToken } from "../../utils/jwt_token_authentication";

@Controller('api/v1/admin')
export class AdminController {
    constructor(private adminService: AdminService, private createAuthToken: CreateAuthToken) { }

    @Post()
    @UsePipes(new CreateAdminValidation())
    async createAdmin(@Body() createAdmin: CreateAdmin, @Req() req: Request, @Res() res: Response) {
        try {

            const isExist = await this.adminService.isExistAdmin(createAdmin.email);

            if (isExist) {
                return errorResponse(res, 400, "Admin exists with this email.");
            }

            const admin = await this.adminService.postAdmin(createAdmin)

            if (!admin) {
                return errorResponse(res, 400, "Admin creation failed.")
            }

            const result = admin.toObject();
            delete result.password;

            return successResponse(res, 200, "Admin created successfully.", result)

        }
        catch (error) {
            throw new HttpException("Internal server error", 500)
        }
    }

    @Post("/login")
    @UsePipes(new LoginAdminValidate())
    async login(@Body() loginAdmin: LoginAdmin, @Req() req: Request, @Res() res: Response) {
        try {

            const isExist = await this.adminService.isExistAdmin(loginAdmin?.email);

            if (!isExist) {
                return errorResponse(res, 400, "Admin not exists with this email.");
            }

            if (isExist.password !== loginAdmin?.password) {
                return errorResponse(res, 400, "Invalid password")
            }

            const token = await this.createAuthToken.createToken({ id: isExist._id.toString(), email: isExist.email })
            isExist["token"] = token;
            delete isExist?.password;

            return successResponse(res, 200, "Admin login successfully", isExist);
        }
        catch (error) {
            throw new HttpException("Internal server error", 500)
        }
    }

    @Get()
    @UseGuards(AuthGuard)
    getAdminLists(@Req() req: Request, @Res() res: Response) {
        try {
            this.adminService.getAdminLists().subscribe(
                {
                    next: (data) => {
                        return successResponse(res, 200, "Admin lists fetched successfully.", data);
                    },
                    error: (error) => {
                        return errorResponse(res, 500, "Error in fetching data");
                    },
                    complete: () => {
                        console.log("Admin lists getting job completed.")
                    }
                }
            )
        }
        catch (error) {
            throw new HttpException("Internal server error", 500)
        }
    }

    @Get("/:id")
    @UseGuards(AuthGuard)
    async getAdminDetails(@Param("id", IsObjectId) id: string, @Req() req: Request, @Res() res: Response) {
        try {

            const admin = await this.adminService.getAdmin(id)

            if (!admin) {
                return errorResponse(res, 400, "Admin not found");
            }

            return successResponse(res, 200, "Admin details retrieved successfully", admin);

        }
        catch (error) {
            throw new HttpException("Internal server error", 500)
        }
    }

    @Patch("/:id")
    @UseGuards(AuthGuard)
    async updateAdmin(@Body(new UpdateAdminValidate()) update: UpdateAdmin, @Param("id", IsObjectId) id: string, @Req() req: Request, @Res() res: Response) {
        try {

            const admin = await this.adminService.patchAdmin(id, update);

            console.log(admin)

            if (!admin) {
                return errorResponse(res, 400, "Admin not found")
            }
            return successResponse(res, 200, "Admin updated successfully", admin);
        }
        catch (error) {
            throw new HttpException("Internal server error", 500)
        }
    }

    @Delete("/:id")
    @UseGuards(AuthGuard)
    async deleteAdmin(@Param("id", IsObjectId) id: string, @Req() req: Request, @Res() res: Response) {
        try {

            const admin = await this.adminService.deleteAdmin(id);

            if (!admin) {
                return errorResponse(res, 400, "Admin not found")
            }
            return successResponse(res, 200, "Admin deleted successfully", {});
        }
        catch (error) {
            throw new HttpException("Internal server error", 500)
        }
    }
}
