import { Command, CommandRunner } from 'nest-commander';
import * as fs from 'fs-extra';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CliEntity } from 'src/entities/cli.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

@Command({
  name: 'cli',
  description: 'my command',
  arguments: '<type>',
})
export class ImportCommand extends CommandRunner {
  constructor(
    @InjectRepository(CliEntity)
    private readonly cliRepository: EntityRepository<CliEntity>
  ) {
    super();
  }
  async run() {
    const fileStream = fs.createReadStream('./src/files/test.txt');

    fileStream.on('data', async (chunk) => {
      this.processData();
    });

    fileStream.on('error', (err) => {
      console.log(err);
    });
    console.log('Running command');
  }

  async processData() {
    console.log(await this.cliRepository.find({ id: 1 }));
  }
}
