import { Test, TestingModule } from '@nestjs/testing';
import { XeService } from './xe.service';

describe('XeService', () => {
  let service: XeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XeService],
    }).compile();

    service = module.get<XeService>(XeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
