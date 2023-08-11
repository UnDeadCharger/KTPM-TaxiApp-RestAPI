import { Test, TestingModule } from '@nestjs/testing';
import { ChuyenXeController } from './chuyen-xe.controller';
import { ChuyenXeService } from './chuyen-xe.service';

describe('ChuyenXeController', () => {
  let controller: ChuyenXeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChuyenXeController],
      providers: [ChuyenXeService],
    }).compile();

    controller = module.get<ChuyenXeController>(ChuyenXeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
