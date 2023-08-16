import { Test, TestingModule } from '@nestjs/testing';
import { ChuyenXesService } from './chuyen-xes.service';

describe('ChuyenXesService', () => {
  let service: ChuyenXesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChuyenXesService],
    }).compile();

    service = module.get<ChuyenXesService>(ChuyenXesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
