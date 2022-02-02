import { Test, TestingModule } from '@nestjs/testing';
import { GestionnairesService } from './gestionnaires.service';

describe('GestionnairesService', () => {
  let service: GestionnairesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionnairesService],
    }).compile();

    service = module.get<GestionnairesService>(GestionnairesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
