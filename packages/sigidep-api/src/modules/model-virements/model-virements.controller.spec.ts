import { Test, TestingModule } from '@nestjs/testing';
import { ModelVirementsController } from './model-virements.controller';
import { ModelVirementsService } from './model-virements.service';

describe('ModelVirementsController', () => {
  let controller: ModelVirementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModelVirementsController],
      providers: [ModelVirementsService],
    }).compile();

    controller = module.get<ModelVirementsController>(ModelVirementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
