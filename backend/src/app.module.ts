import { Module } from '@nestjs/common';
import { FaturasController } from './faturas.controller';
import { FaturasService } from './faturas.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [FaturasController],
  providers: [FaturasService, PrismaService],
})
export class AppModule {}
