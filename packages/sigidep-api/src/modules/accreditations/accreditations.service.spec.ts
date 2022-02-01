import { Test, TestingModule } from '@nestjs/testing';
import { AccreditationsService } from './accreditations.service';

describe('AccreditationsService', () => {
  let service: AccreditationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccreditationsService],
    }).compile();

    service = module.get<AccreditationsService>(AccreditationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
