import { Test, TestingModule } from '@nestjs/testing';
import { FaturasParserService } from '../src/faturas-parser.service';
import * as fs from 'fs';
import * as path from 'path';

describe('FaturasParserService', () => {
  let service: FaturasParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaturasParserService],
    }).compile();

    service = module.get<FaturasParserService>(FaturasParserService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve processar faturas corretamente', async () => {
    const arquivo = path.join(
      __dirname,
      '..',
      'faturas',
      '3001116735-01-2024.pdf',
    );
    const buffer = fs.readFileSync(arquivo);
    const result = await service.processarFaturaPDF(buffer);

    expect(result).toHaveProperty('customerNumber');
    expect(result).toHaveProperty('referenceMonth');
    expect(result).toHaveProperty('energyKwh');
    expect(result).toHaveProperty('sceeeKwh');
    expect(result).toHaveProperty('gdKwh');
    expect(result).toHaveProperty('publicLighting');
  });
});
