import { Test, TestingModule } from '@nestjs/testing';
import { ChuyenXeService } from './chuyen-xe.service';

describe('ChuyenXeService', () => {
  let service: ChuyenXeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChuyenXeService],
    }).compile();

    service = module.get<ChuyenXeService>(ChuyenXeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
