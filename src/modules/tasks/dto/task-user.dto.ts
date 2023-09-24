import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

enum EnumPriority {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
}

enum EnumStatus {
  PENDENTE = 'PENDENTE',
  ANDAMENTO = 'ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA',
}

export class TaskUserRequestDTO {
  @Transform(() => '')
  @ApiProperty()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @ApiProperty()
  startAt: Date;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @ApiProperty()
  endAt: Date;

  @IsString()
  @IsNotEmpty()
  @IsEnum(EnumPriority)
  @ApiProperty()
  priority: EnumPriority;

  @IsString()
  @IsNotEmpty()
  @IsEnum(EnumStatus)
  @ApiProperty()
  status: EnumStatus;
}
