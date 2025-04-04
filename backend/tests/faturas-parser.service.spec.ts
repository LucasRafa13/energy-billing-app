import { Test, TestingModule } from '@nestjs/testing';
import { FaturasParserService } from '../src/faturas-parser.service';
import { PrismaService } from '../src/prisma.service'; // Importando o PrismaService
import { INestApplication } from '@nestjs/common'; // Importando o tipo correto
import request from 'supertest';
import fs from 'fs';
import path from 'path';

describe('FaturasParserService', () => {
  let app: INestApplication; // Definindo explicitamente o tipo como INestApplication
  let service: FaturasParserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [FaturasParserService, PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    service = moduleFixture.get<FaturasParserService>(FaturasParserService);
  });

  it('should process PDF correctly', async () => {
    // Fornecendo um caminho de exemplo para um arquivo PDF
    const filePath = path.join(
      __dirname,
      '..',
      'faturas',
      '3001116735-01-2024.pdf',
    );
    const buffer = fs.readFileSync(filePath); // Lê o arquivo PDF como buffer
    const result = await service.processarFaturaPDF(buffer); // Chama o método processarFaturaPDF

    expect(result).toHaveProperty('customerNumber');
    expect(result).toHaveProperty('referenceMonth');
    expect(result).toHaveProperty('energyKwh');
    expect(result).toHaveProperty('energyValue');
    expect(result).toHaveProperty('sceeeKwh');
    expect(result).toHaveProperty('gdKwh');
    expect(result).toHaveProperty('publicLighting');
    expect(result).toHaveProperty('totalConsumptionKwh');
    expect(result).toHaveProperty('totalValueWithoutGd');
    expect(result).toHaveProperty('economyGd');
  });

  afterAll(async () => {
    await app.close();
  });
});
