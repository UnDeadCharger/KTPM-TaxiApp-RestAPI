import { Test, TestingModule } from '@nestjs/testing';
import { KhachHangsController } from './khach-hangs.controller';
import { KhachHangsService } from './khach-hangs.service';

describe('KhachHangsController', () => {
  let controller: KhachHangsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KhachHangsController],
      providers: [KhachHangsService],
    }).compile();

    controller = module.get<KhachHangsController>(KhachHangsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
