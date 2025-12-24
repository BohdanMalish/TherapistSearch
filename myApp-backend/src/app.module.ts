import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SpecialistsModule } from './specialists/specialists.module';

@Module({
  imports: [DatabaseModule, SpecialistsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

