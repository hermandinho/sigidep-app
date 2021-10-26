import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  providers: [SeederService],
  controllers: [SeederController],
  imports: [UsersModule, AuthModule],
})
export class SeederModule {}
