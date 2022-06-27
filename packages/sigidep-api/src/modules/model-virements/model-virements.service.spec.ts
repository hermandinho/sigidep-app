import { Test, TestingModule } from '@nestjs/testing';
import { ModelVirementsService } from './model-virements.service';

describe('ModelVirementsService', () => {
  let service: ModelVirementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelVirementsService],
    }).compile();

    service = module.get<ModelVirementsService>(ModelVirementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
