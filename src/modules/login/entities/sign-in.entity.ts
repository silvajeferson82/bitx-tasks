import { ApiProperty } from '@nestjs/swagger';

export class SignInEntity {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlZTk5M2RhLWI0ODItNGE3Yi04MTU0LTk0ZDRkMWI5YjQ0YiIsInVzZXJuYW1lIjoiam9qb3JvZHJpZ28iLCJpYXQiOjE2OTU1NzUzNDQsImV4cCI6MTY5NTU3ODk0NH0.gRqQdHr5EQsHX28RfhSP1zNfnY160poq-_aDz-lAIN0',
  })
  accessToken: string;
}
