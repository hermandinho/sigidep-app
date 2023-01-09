import { Test, TestingModule } from '@nestjs/testing';
import { VirementsService } from './virements.service';

describe('VirementsService', () => {
  let service: VirementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VirementsService],
    }).compile();

    service = module.get<VirementsService>(VirementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
