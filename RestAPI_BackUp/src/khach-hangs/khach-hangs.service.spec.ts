import { Test, TestingModule } from '@nestjs/testing';
import { KhachHangsService } from './khach-hangs.service';

describe('KhachHangsService', () => {
  let service: KhachHangsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KhachHangsService],
    }).compile();

    service = module.get<KhachHangsService>(KhachHangsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
