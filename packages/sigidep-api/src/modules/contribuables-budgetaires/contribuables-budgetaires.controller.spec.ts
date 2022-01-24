import { Test, TestingModule } from '@nestjs/testing';
import { ContribuablesBudgetairesController } from './contribuables-budgetaires.controller';
import { ContribuablesBudgetairesService } from './contribuables-budgetaires.service';

describe('ContribuablesBudgetairesController', () => {
  let controller: ContribuablesBudgetairesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContribuablesBudgetairesController],
      providers: [ContribuablesBudgetairesService],
    }).compile();

    controller = module.get<ContribuablesBudgetairesController>(
      ContribuablesBudgetairesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
