import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { PieceJointeEntity } from '@entities/piece-jointe.entity';
import { CreatePieceJointeDTO } from './dto/create-piece-jointe.dto';

@Injectable()
export class PiecesJointesService {
  constructor(
    @InjectRepository(PieceJointeEntity)
    private readonly repository: Repository<PieceJointeEntity>,
  ) {}

  public getRepository(): Repository<PieceJointeEntity> {
    return this.repository;
  }

  public async filter(): Promise<PieceJointeEntity[]> {
    return this.repository.createQueryBuilder('pj').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreatePieceJointeDTO,
    user: UserEntity,
  ): Promise<PieceJointeEntity> {
    const check = await this.repository
      .createQueryBuilder('pj')
      .where('pj.code= :code', { code: payload.code })
      .orWhere('pj.order= :order', { order: payload.order })
      .getOne();

    if (check) {
      throw new ConflictException();
    }

    return this.repository.save({
      ...payload,
      createdBy: user,
    });
  }

  public async update(
    payload: CreatePieceJointeDTO,
    user: UserEntity,
  ): Promise<PieceJointeEntity> {
    const check = await this.repository.findOne({
      id: payload.id,
    });

    if (!check) {
      throw new NotFoundException();
    }

    return this.repository.save({
      ...payload,
      updateBy: user,
    });
  }
}
