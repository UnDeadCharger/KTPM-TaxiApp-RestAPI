import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  mySuperLongProcessOfUser(data: any): Promise<void> { // Specify 'void' as the return type
    return new Promise<void>(resolve => { // Specify 'void' for the Promise type
      setTimeout(() => {
        console.log(`done processing ${JSON.stringify(data)}`);
        resolve();
      }, 1000);
    });
  }

  
}