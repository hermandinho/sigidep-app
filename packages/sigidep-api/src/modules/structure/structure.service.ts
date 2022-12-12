import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StructureEntity } from '../../entities/structure.entity';
import { Repository } from 'typeorm';
import { CreateStructureDto } from './dto/create-structure.dto';
import { UserEntity } from '../../entities/user.entity';
import { url } from 'inspector';

@Injectable()
export class StructureService {
  structureSave: Promise<StructureEntity>;
  constructor(
    @InjectRepository(StructureEntity)
    private readonly structureRepository: Repository<StructureEntity>,
  ) { }

  public getRepository(): Repository<StructureEntity> {
    return this.structureRepository;
  }

  public async getStructure(): Promise<StructureEntity> {
    return this.structureRepository.findOne();
  }

  public async store(params: CreateStructureDto): Promise<StructureEntity> {
    if (params.estPrincipal){
      const data = this.filter();
      data.then((res:any)=>{
        res.forEach(res=>{
          this.structureRepository.save({
            ...res,
            estPrincipal: false,
          });
        })
      })
    }
    const check = await this.structureRepository.findOne();

   /*  if (check) {
      throw new ConflictException();
    } */
    console.log('params',params)
    this.structureSave = this.structureRepository.save(new StructureEntity(params));
    return this.structureSave;
  }

  public async filter() {
    return await this.structureRepository
      .createQueryBuilder('s')
      .getMany();
  }

  public async update(
    payload: CreateStructureDto,
    user: UserEntity,
  ): Promise<StructureEntity> {
    const check = await this.structureRepository.findOne({
      id: payload.id,
    });

    if (payload.estPrincipal){
      const data = this.filter();
      data.then((res:any)=>{
        res.forEach(res=>{
          this.structureRepository.save({
            ...res,
            estPrincipal: false,
          });
        })
      })
    }

    if (!check) {
      throw new NotFoundException();
    }

    return this.structureRepository.save({
      ...payload,
      updateBy: user,
    });
  }

  public async deleteOne(id: number): Promise<any> {
    return this.structureRepository.delete({ id });
  }

  public async getStructureDefault(): Promise<StructureEntity> {
    const response = this.structureRepository
      .createQueryBuilder('s')
      .where('s.estPrincipal = :code', {
        code: true,
      })
      .getOne();
    return response;
  }

  async saveFile(file: any): Promise<StructureEntity> {
   // console.log("file",file)
    const csv = require('csvtojson')
    //console.log("csv",csv)
    const csvFilePath = url()+'/'+process.cwd() + '/' + file.path;
    console.log("csvFilePath",csvFilePath)
    const structureArray = await csv().fromFile(csvFilePath);
   // console.log("structureArray",structureArray)
    var structure;

    try {
        structure = await this.structureRepository.save(
          {
            ...this.structureSave,
            logo: csvFilePath
          }
        );
    } catch (error) {
        structure = null;  
    }
    console.log(structure)
    return structure; 
}

}
