import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  exports: [UserService],
  providers: [
    UserService,
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'user-service',
            port: 3001,
          },
        });
      },
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
