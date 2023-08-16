import { Test, TestingModule } from '@nestjs/testing';
import { ChuyenXesController } from './chuyen-xes.controller';
import { ChuyenXesService } from './chuyen-xes.service';

describe('ChuyenXesController', () => {
  let controller: ChuyenXesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChuyenXesController],
      providers: [ChuyenXesService],
    }).compile();

    controller = module.get<ChuyenXesController>(ChuyenXesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
