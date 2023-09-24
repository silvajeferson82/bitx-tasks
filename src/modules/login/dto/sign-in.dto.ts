import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDTO {
  @IsString()
  @IsNotEmpty({ message: 'O username é obrigatório' })
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'O password é obrigatório' })
  @ApiProperty()
  password: string;
}
