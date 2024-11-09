import { ApiProperty } from '@nestjs/swagger';
import { User } from "../entity/user.entity";

export class FindUserResDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  createdAt: string;

  static from(user: User) {
    const res = new FindUserResDto();
    res.id = user.id;
    res.email = user.email;
    res.createdAt = user.createdAt.toISOString();
    return res;
  }
}
