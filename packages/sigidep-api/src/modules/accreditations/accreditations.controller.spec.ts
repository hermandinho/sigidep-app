import { Test, TestingModule } from '@nestjs/testing';
import { AccreditationsController } from './accreditations.controller';
import { AccreditationsService } from './accreditations.service';

describe('AccreditationsController', () => {
  let controller: AccreditationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccreditationsController],
      providers: [AccreditationsService],
    }).compile();

    controller = module.get<AccreditationsController>(AccreditationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
