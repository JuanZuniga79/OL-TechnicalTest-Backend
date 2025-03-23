import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsNotEmpty, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEstablishmentDto {
    @ApiProperty({ example: "Tienda ABC", description: "Nombre del establecimiento" })
    @IsString()
    @IsNotEmpty({ message: "El nombre del establecimiento no puede estar vacío" })
    name: string;

    @ApiProperty({ example: 50000.75, description: "Ingreso del establecimiento", minimum: 0 })
    @IsNumber()
    @Min(0, { message: "El ingreso debe ser un número mayor o igual a 0" })
    income: number;

    @ApiProperty({ example: 10, description: "Número de empleados", minimum: 0 })
    @IsNumber()
    @Min(0, { message: "El número de empleados debe ser mayor o igual a 0" })
    employees: number;
}

export default class CreateMerchantDto {
    @ApiProperty({ example: "Juan Pérez", description: "Nombre o razón social del comerciante" })
    @IsString()
    @IsNotEmpty({ message: "El nombre del comerciante no puede estar vacío" })
    name: string;

    @ApiProperty({
        example: "juan@example.com",
        description: "Correo electrónico del comerciante",
        required: false
    })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty({
        example: "3123456789",
        description: "Número de teléfono del comerciante",
        required: false
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ example: 1, description: "ID del municipio al que pertenece el comerciante" })
    @IsNumber()
    @IsNotEmpty({ message: "El ID del municipio es obligatorio" })
    municipality_id: number;

    @ApiProperty({
        description: "Lista de establecimientos asociados al comerciante",
        type: [CreateEstablishmentDto]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateEstablishmentDto)  // Necesario para validar objetos dentro del array
    @IsNotEmpty({ message: "Debe haber al menos un establecimiento" })
    establishments: CreateEstablishmentDto[];
}
