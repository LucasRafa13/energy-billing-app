import { Test, TestingModule } from '@nestjs/testing';
import { FaturasController } from '../src/faturas.controller';
import { FaturasService } from '../src/faturas.service';
import { PrismaService } from '../src/prisma.service';
import { INestApplication } from '@nestjs/common'; // Importando o tipo correto
import request from 'supertest';

describe('FaturasController', () => {
  let app: INestApplication; // Definindo explicitamente o tipo como INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [FaturasController],
      providers: [FaturasService, PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return all invoices', async () => {
    const response = await request(app.getHttpServer())
      .get('/faturas')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('customerNumber');
    expect(response.body[0]).toHaveProperty('referenceMonth');
  });

  afterAll(async () => {
    await app.close();
  });
});
