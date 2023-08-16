import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  mySuperLongProcessOfUser(data: any): Promise<void> { // Specify 'void' as the return type
    return new Promise<void>(resolve => { // Specify 'void' for the Promise type
      setTimeout(() => {
        console.log(`done processing ${JSON.stringify(data)}`);
        resolve();
      }, 10000);
    });
  }
}