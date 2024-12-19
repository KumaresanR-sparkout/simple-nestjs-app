import { Controller, Req, Res, Next, Get, Post, Patch, Delete, Body, UsePipes, Param, HttpException } from '@nestjs/common';
import { Request, Response } from "express";
import { AdminService } from './admin.service';
import { successResponse, errorResponse } from 'utils/response_handler';
import { CreateAdmin, LoginAdmin, UpdateAdmin } from "./interfaces/admin.interface";
import { CreateAdminValidation, UpdateAdminValidate, LoginAdminValidate } from "./pipes/admin_validation.pipe";
import { IsObjectId } from "../../utils/objectId_validation_pipe";

@Controller('api/v1/admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

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

            return successResponse(res, 200, "Admin login successfully", {});
        }
        catch (error) {
            throw new HttpException("Internal server error", 500)
        }
    }

    @Get()
    async getAdminLists(@Req() req: Request, @Res() res: Response) {
        try {

            const adminLists = await this.adminService.getAdminLists()

            return successResponse(res, 200, "Admin lists retrieved successfully", adminLists);
        }
        catch (error) {
            throw new HttpException("Internal server error", 500)
        }
    }

    @Get("/:id")
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
