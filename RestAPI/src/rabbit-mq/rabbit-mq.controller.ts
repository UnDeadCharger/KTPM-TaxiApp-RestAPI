import { Controller } from '@nestjs/common';
import { RabbitMQService } from './rabbit-mq.service';

@Controller('rabbit-mq')
export class RabbitMqController {
  constructor(private readonly rabbitMqService: RabbitMQService) {}
}
