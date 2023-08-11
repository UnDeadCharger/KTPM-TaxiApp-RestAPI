import { Test, TestingModule } from '@nestjs/testing';
import { TaiXeService } from './tai-xe.service';

describe('TaiXeService', () => {
  let service: TaiXeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaiXeService],
    }).compile();

    service = module.get<TaiXeService>(TaiXeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
