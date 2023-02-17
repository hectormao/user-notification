import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';

@Injectable()
@Processor('createUserQ')
export class UserConsumerService {
  private log: Logger = new Logger(UserConsumerService.name);

  constructor(@InjectQueue('createUserQ') private createUserQueue: Queue) {}

  @Process()
  async processNewUser(job: Job<any>): Promise<void> {
    //Proceso de enviar un mensaje por correo electronico

    this.log.log(`Processing queue message ${job.id}`, job.data);

    return null;
  }
}
