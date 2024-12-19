import { Injectable } from '@nestjs/common';
import { Admin } from "./models/admin.schema";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdmin, UpdateAdmin } from "./interfaces/admin.interface";

@Injectable()
export class AdminService {

    constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) { }

    async postAdmin(adminData: CreateAdmin) {
        const admin = await this.adminModel.create(adminData);
        return admin;
    }

    async isExistAdmin(email: string) {
        const admin = await this.adminModel.findOne({ email })
            .select("-password");
        return admin;
    }

    async getAdminLists() {

        const admin = await this.adminModel.find({})
            .select("-password").lean();
        return admin;
    }

    async getAdmin(id: string) {
        const admin = await this.adminModel.findById(id)
            .select("-password");
        return admin;
    }

    async patchAdmin(id: string, data: UpdateAdmin) {
        const admin = await this.adminModel.findByIdAndUpdate(id, data, { new: true })
            .select("-password");
        return admin;
    }

    async deleteAdmin(id: string) {
        const admin = await this.adminModel.findByIdAndDelete(id)
            .select("-password");
        return admin;
    }
}
