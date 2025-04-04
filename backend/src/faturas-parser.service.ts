import { Injectable } from '@nestjs/common';
import pdfParse from 'pdf-parse'; // Importação correta
import { PrismaService } from './prisma.service'; // Corrija o caminho se necessário


@Injectable()
export class FaturasParserService {
  constructor(private prisma: PrismaService) {} // PrismaService injetado

  /**
   * Processa um PDF de fatura e extrai os dados relevantes.
   *
   * @param buffer Buffer do arquivo PDF.
   * @returns Dados extraídos da fatura.
   */
  async processarFaturaPDF(buffer: Buffer) {
    const { text } = await pdfParse(buffer);

    const get = (regex: RegExp): string => {
      const match = text.match(regex);
      if (!match || !match[1]) throw new Error(`Não encontrado: ${regex}`);
      return match[1].replace(',', '.').replace(/\s+/g, '').trim();
    };

    // ✅ Cliente e mês de referência
    const customerNumber = get(/N[ºo] DO CLIENTE[\s\S]*?(\d{10})/i);
    const referenceMonth = get(/Referente a[\s\S]*?([A-Z]{3}\/\d{4})/i);

    // ✅ Energia Elétrica (kWh e valor R$)
    const energiaMatch = text.match(
      /Energia ElétricakWh\s+(\d+)\s+[\d,]+\s+(\d+,\d+)/i,
    );
    if (!energiaMatch) throw new Error('Energia Elétrica não encontrada');

    const energyKwh = parseFloat(energiaMatch[1]);
    const energyValue = parseFloat(energiaMatch[2].replace(',', '.'));

    // ✅ Energia SCEE s/ ICMS
    const sceeeMatch =
      text.match(
        /Energia\s+SCEE\s+s\/\s+ICMS\s*kWh\s+([\d.]+)\s+[\d,]+\s+(\d+,\d+)/i,
      ) ||
      text.match(
        /Energia\s+SCEE\s+s\/\s+ICMSkWh\s+([\d.]+)\s+[\d,]+\s+(\d+,\d+)/i,
      ) ||
      text.match(/Energia\s+SCEE\s+s\/\s+ICMS\s+kWh\s+([\d.]+).*?(\d+,\d+)/i) ||
      text.match(/Energia\s+SCEE.*?kWh\s+([\d.]+).*?(\d+,\d+)/i);

    if (!sceeeMatch) throw new Error('Energia SCEE não encontrada');

    const sceeeKwh = parseFloat(sceeeMatch[1].replace(/\./g, ''));
    const sceeeValue = parseFloat(sceeeMatch[2].replace(',', '.'));

    // ✅ Energia Compensada GD I
    const gdMatch =
      text.match(
        /Energia\s+compensada\s+GD\s+I\s*kWh\s+([\d.]+)\s+[\d,-]+\s+(-?\d+,\d+)/i,
      ) ||
      text.match(
        /Energia\s+compensada\s+GD\s+IkWh\s+([\d.]+)\s+[\d,-]+\s+(-?\d+,\d+)/i,
      ) ||
      text.match(/Energia\s+compensada.*?kWh\s+([\d.]+).*?(-?\d+,\d+)/i);

    if (!gdMatch) throw new Error('Energia GD I não encontrada');

    const gdKwh = parseFloat(gdMatch[1].replace(/\./g, ''));
    const gdValue = parseFloat(gdMatch[2].replace(',', '.'));

    // ✅ Contribuição de Iluminação Pública
    const publicLighting = parseFloat(
      get(/Contrib Ilum Publica Municipal\s+(\d+,\d+)/i),
    );

    // ✅ Cálculos
    const totalConsumptionKwh = energyKwh + sceeeKwh;
    const totalValueWithoutGd = energyValue + sceeeValue + publicLighting;
    const economyGd = gdValue;

    return {
      customerNumber,
      referenceMonth,
      energyKwh,
      energyValue,
      sceeeKwh,
      sceeeValue,
      gdKwh,
      gdValue,
      publicLighting,
      totalConsumptionKwh,
      totalValueWithoutGd,
      economyGd,
    };
  }
}
