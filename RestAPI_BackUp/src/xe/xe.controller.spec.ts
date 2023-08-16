import { Test, TestingModule } from '@nestjs/testing';
import { XeController } from './xe.controller';
import { XeService } from './xe.service';

describe('XeController', () => {
  let controller: XeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XeController],
      providers: [XeService],
    }).compile();

    controller = module.get<XeController>(XeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
