import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe, Patch,
    Post, Put,
    Query,
    Request, Res,
    UseGuards
} from "@nestjs/common";
import {AuthGuard} from "@/infraestructure/guards/auth.guard";
import {ApiOperation, ApiQuery, ApiSecurity} from "@nestjs/swagger";
import {MerchantsService} from "@/application/services/merchants.service";
import {Roles} from "@/infraestructure/config/roles.decorator";
import {RolesGuard} from "@/infraestructure/guards/role.guard";
import CreateMerchantDto from "@/infraestructure/dto/merchant/create.merchant.dto";
import UserService from "@/application/services/user.service";
import * as path from "node:path";
import {Response} from "express";
import * as fs from "node:fs";

@UseGuards(AuthGuard)
@ApiSecurity('bearer')
@Controller('merchants')
export class MerchantsController {
    constructor(private readonly merchantService: MerchantsService, private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener comerciantes con paginación' })
    @ApiQuery({ name: 'name', required: false, type: String, description: 'Filtrar por nombre' })
    @ApiQuery({ name: 'registered_at', required: false, type: String, description: 'Filtrar por fecha (YYYY-MM-DD)' })
    @ApiQuery({ name: 'status', required: false, type: String, description: 'Filtrar por estado' })
    async getAllMerchants(
        @Query('offset', ParseIntPipe) offset: number = 0,
        @Query('top', ParseIntPipe) top: number = 5,
        @Query('name') name?: string,
        @Query('registered_at') registeredAt?: string,  // Debe venir en formato YYYY-MM-DD
        @Query('status') status?: string
    ) {
        return this.merchantService.getMerchants(offset, top, name, registeredAt, status);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener comerciante por ID' })
    async getMerchantById(@Param('id', ParseIntPipe) id: number) {
        return this.merchantService.getMerchantById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo comerciante' })
    @HttpCode(HttpStatus.CREATED)
    async createMerchant(@Body() createMerchantDto: CreateMerchantDto, @Request() req: Request) {
        const id = Number(req['user'].sub);
        await this.userService.getUserById(id);
        return this.merchantService.createMerchant(createMerchantDto, id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar comerciante' })
    @HttpCode(HttpStatus.OK)
    async updateMerchant(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMerchantDto: CreateMerchantDto,
        @Request() req: Request
    ) {
        const updater = Number(req['user'].sub);
        await this.userService.getUserById(updater);
        await this.merchantService.updateMerchant(id, updateMerchantDto, updater);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar comerciante (solo administradores)' })
    @UseGuards(RolesGuard)
    @Roles('administrador')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteMerchant(@Param('id', ParseIntPipe) id: number) {
        await this.merchantService.deleteMerchant(id);
    }

    @Patch(':id/status/:status_id')
    @ApiOperation({ summary: 'Modificar el estado de un comerciante' })
    async changeMerchantStatus(
        @Param('id', ParseIntPipe) id: number,
        @Param('status_id', ParseIntPipe) status_id: number,
    ) {
        return this.merchantService.changeMerchantStatus(id, status_id);
    }

    @Get('generate/csv')
    @Roles('administrador')
    @UseGuards(RolesGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obtener CSV' })
    async generateCsv(@Res() res: Response) {
        try {
            const content: string = await this.merchantService.getActiveMerchantsWithCalculations();
            const exportDir = path.resolve(__dirname, '..', '..', 'adapters', 'driven', 'exports');
            if (!fs.existsSync(exportDir)) {
                fs.mkdirSync(exportDir, { recursive: true });
            }
            const filePath = path.join(exportDir, 'merchants.csv');
            fs.writeFileSync(filePath, content, 'utf-8');
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="merchants.csv"');
            return res.sendFile(filePath);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error interno al generar el archivo CSV',
                error: error.message,
                statusCode: 500,
                timestamp: new Date().toISOString(),
            });
        }
    }

}