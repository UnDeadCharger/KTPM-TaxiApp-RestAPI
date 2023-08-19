import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('rabbit-mq-module-tt') private readonly TTclient: ClientProxy,
    @Inject('rabbit-mq-module-gc') private readonly GCclient: ClientProxy,
  ) {}
  public sendTT(pattern: string, data: any) {
    return this.TTclient.send(pattern, data).toPromise();
  }
  public sendGC(pattern: string, data: any) {
    return this.GCclient.send(pattern, data).toPromise();
  }
}
