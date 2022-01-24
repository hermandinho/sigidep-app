import { Test, TestingModule } from '@nestjs/testing';
import { ContribuablesBudgetairesService } from './contribuables-budgetaires.service';

describe('ContribuablesBudgetairesService', () => {
  let service: ContribuablesBudgetairesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContribuablesBudgetairesService],
    }).compile();

    service = module.get<ContribuablesBudgetairesService>(ContribuablesBudgetairesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
