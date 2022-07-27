import { Test, TestingModule } from '@nestjs/testing';
import { ModeleVirementsController } from './modele-virements.controller';

describe('ModeleVirementsController', () => {
  let controller: ModeleVirementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModeleVirementsController],
    }).compile();

    controller = module.get<ModeleVirementsController>(ModeleVirementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
