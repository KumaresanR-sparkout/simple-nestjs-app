import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from "express";
import { successResponse } from "../utils/response_handler";

@Controller()
export class AppController {
  constructor() { }

  @Get()
  getHello(@Req() req: Request, @Res() res: Response) {
    return successResponse(res, 200, "Application working fine.", {});
  }
}
