import { Test, TestingModule } from '@nestjs/testing';
import { FaturasController } from '../src/faturas.controller';
import { FaturasService } from '../src/faturas.service';
import { PrismaService } from '../src/prisma.service';

describe('FaturasController', () => {
  let controller: FaturasController;
  let service: FaturasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaturasController],
      providers: [FaturasService, PrismaService],
    }).compile();

    controller = module.get<FaturasController>(FaturasController);
    service = module.get<FaturasService>(FaturasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFaturas', () => {
    it('should return an array of faturas', async () => {
      // Mocking the service method with all expected properties
      const result = [
        {
          id: 1, // Adicionando a propriedade `id`
          customerNumber: '1234567890',
          referenceMonth: 'JAN/2024',
          energyKwh: 100,
          energyValue: 50,
          sceeeKwh: 50,
          sceeeValue: 25,
          gdKwh: 30,
          gdValue: 15,
          publicLighting: 10,
          totalConsumptionKwh: 150,
          totalValueWithoutGd: 75,
          economyGd: 15,
          valorScee: 25, // Adicionando a propriedade `valorScee`
          valorGdi: 15, // Adicionando a propriedade `valorGdi`
        },
      ];

      // Mocking the service method
      jest.spyOn(service, 'obterFaturas').mockResolvedValue(result);

      expect(await controller.getFaturas()).toEqual(result);
    });
  });
});
