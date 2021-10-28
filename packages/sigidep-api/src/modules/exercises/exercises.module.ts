import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from '@entities/exercise.entity';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
  imports: [AuthModule, TypeOrmModule.forFeature([ExerciseEntity])],
})
export class ExercisesModule {}
