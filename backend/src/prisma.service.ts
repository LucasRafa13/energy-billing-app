// prisma.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Tornando o PrismaClient acessível via PrismaService
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}

// Instanciando e exportando o PrismaService
export const prisma = new PrismaService();  // Exporta a instância do Prisma
