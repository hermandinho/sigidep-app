import { Test, TestingModule } from '@nestjs/testing';
import { ModeleVirementsService } from './modele-virements.service';

describe('ModeleVirementsService', () => {
  let service: ModeleVirementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModeleVirementsService],
    }).compile();

    service = module.get<ModeleVirementsService>(ModeleVirementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
