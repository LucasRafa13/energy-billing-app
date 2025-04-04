import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma.service';  // Certifique-se de que o caminho está correto
import { FaturasService } from '../src/faturas.service'; // Certifique-se de que o caminho está correto


describe('FaturasService', () => {
  let service: FaturasService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaturasService, PrismaService],
    }).compile();

    service = module.get<FaturasService>(FaturasService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('criarFatura', () => {
    it('should create a new fatura', async () => {
      const createData = {
        numero_cliente: '1234567890',
        mes_referencia: 'ABR/2024',
        energia_eletrica: 150,
        energia_scee: 50,
        energia_gdi: 20,
        contribuicao_ilum: 10,
        valor_total: 200,
      };

      const createdFatura = await service.criarFatura(createData);

      expect(createdFatura).toHaveProperty('id');
      expect(createdFatura.customerNumber).toEqual(createData.numero_cliente);
      expect(createdFatura.referenceMonth).toEqual(createData.mes_referencia);
    });
  });

  describe('obterFaturas', () => {
    it('should return all faturas', async () => {
      const faturas = await service.obterFaturas();
      expect(faturas).toBeInstanceOf(Array);
      expect(faturas.length).toBeGreaterThanOrEqual(0);
    });
  });
});
