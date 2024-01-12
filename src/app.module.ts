import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImportCommand } from './command/import.command';
import { CliEntity } from './entities/cli.entity';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgresql',
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'p0stgr3s!',
        dbName: 'cli-db',
        entities: [CliEntity],
        // In the CLI, we use the global context instead of the request context
        allowGlobalContext: true,
        debug: true, // or provide array like `['query', 'query-params']`
        pool: { min: 0, max: 10 },
      }),
    }),
    MikroOrmModule.forFeature([CliEntity]),
  ],
  controllers: [],
  providers: [ImportCommand],
})
export class AppModule {}
