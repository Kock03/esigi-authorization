import { Test, TestingModule } from '@nestjs/testing';
import { AcessController } from './acess.controller';

describe('AcessController', () => {
  let controller: AcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcessController],
    }).compile();

    controller = module.get<AcessController>(AcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
