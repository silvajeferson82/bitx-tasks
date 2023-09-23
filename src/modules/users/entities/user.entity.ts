import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: '3a1483fa-4e73-4f4c-af6d-ef6e2c77e311' })
  id: string;

  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'jhondoe@mail.com' })
  email: string;

  @ApiProperty({ example: '2021-06-05T18:02:43.000Z' })
  createdAt: Date;

  @Exclude()
  password: string;
}
