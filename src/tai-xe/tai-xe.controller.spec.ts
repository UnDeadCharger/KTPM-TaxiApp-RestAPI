import { Test, TestingModule } from '@nestjs/testing';
import { TaiXeController } from './tai-xe.controller';
import { TaiXeService } from './tai-xe.service';

describe('TaiXeController', () => {
  let controller: TaiXeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaiXeController],
      providers: [TaiXeService],
    }).compile();

    controller = module.get<TaiXeController>(TaiXeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
