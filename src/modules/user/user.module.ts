import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticationModule } from '../authentication/auth.module';

@Module({
  imports: [AuthenticationModule],
  providers: [UserService],
})
export class UserModule {}
