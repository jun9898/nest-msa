import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FindUserResDto } from './dto/res.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  async findOneByEmail(email: string) {
    const pattern = { cmd: 'findOneByEmail' };
    const payload = email;
    const { id: userId } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return userId;
  }

  async create(email: string, password: string) {
    const pattern = { cmd: 'create' };
    const payload = { email, password };
    const { id: userId } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return userId;
  }

  async validateUser(email: string, password: string) {
    const pattern = { cmd: 'validate' };
    const payload = { email, password };
    const { id } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return id;
  }

  async checkUserIsAdmin(id: string) {
    const pattern = { cmd: 'checkUserIsAdmin' };
    const payload = { id };
    const { isAdmin } = await firstValueFrom<{ isAdmin: boolean }>(
      this.client.send<{ isAdmin: boolean }>(pattern, payload),
    );
    return isAdmin;
  }

  async findAll(page: number, size: number) {
    const pattern = { cmd: 'findAllUser' };
    const payload = { page, size };
    const { findUserResDtos } = await firstValueFrom<{ findUserResDtos: FindUserResDto[] }>(
      this.client.send<{ findUserResDtos: FindUserResDto[] }>(pattern, payload),
    );
    return findUserResDtos;
  }
}
