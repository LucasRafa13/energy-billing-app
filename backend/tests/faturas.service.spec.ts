import { Test, TestingModule } from '@nestjs/testing';
import { FaturasService } from '../src/faturas.service';
import { PrismaService } from '../src/prisma.service';
import { INestApplication } from '@nestjs/common'; // Importando o tipo correto
import request from 'supertest';

describe('FaturasService', () => {
  let app: INestApplication; // Definindo explicitamente o tipo como INestApplication
  let service: FaturasService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [FaturasService, PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    service = moduleFixture.get<FaturasService>(FaturasService);
  });

  it('should return all invoices', async () => {
    const result = await service.obterFaturas();

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('customerNumber');
    expect(result[0]).toHaveProperty('referenceMonth');
  });

  afterAll(async () => {
    await app.close();
  });
});
