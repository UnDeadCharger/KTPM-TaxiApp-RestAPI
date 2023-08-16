import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMqController } from './rabbit-mq.controller';
import { RabbitMQService } from './rabbit-mq.service';

describe('RabbitMqController', () => {
  let controller: RabbitMqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RabbitMqController],
      providers: [RabbitMQService],
    }).compile();

    controller = module.get<RabbitMqController>(RabbitMqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
