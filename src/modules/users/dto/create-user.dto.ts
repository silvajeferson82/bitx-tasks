import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'O username deve ter no mínimo 3 caracteres' })
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @ApiProperty()
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'O password deve ter no mínimo 6 caracteres' })
  @ApiProperty()
  password: string;
}

export class UserNameAndEmailDTO {
  @IsString()
  @IsNotEmpty({ message: 'O username é obrigatório' })
  @ApiProperty()
  username: string;

  @IsEmail({}, { message: 'Email inválido' })
  @ApiProperty()
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;
}
