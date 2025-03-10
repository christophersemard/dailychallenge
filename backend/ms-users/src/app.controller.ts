// ms-users/src/app.controller.ts

import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    @Get()
    getHello(): string {
        return "Hello from ms-users!";
    }
}
