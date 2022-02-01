import { Test, TestingModule } from '@nestjs/testing';
import { GestionnairesController } from './gestionnaires.controller';
import { GestionnairesService } from './gestionnaires.service';

describe('GestionnairesController', () => {
  let controller: GestionnairesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionnairesController],
      providers: [GestionnairesService],
    }).compile();

    controller = module.get<GestionnairesController>(GestionnairesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
