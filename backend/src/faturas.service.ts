import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class FaturasService {
  constructor(private prisma: PrismaService) {}

  async criarFatura(data: {
    numero_cliente: string;
    mes_referencia: string;
    energia_eletrica: number;
    energia_scee: number;
    energia_gdi: number;
    contribuicao_ilum: number;
    valor_total: number;
  }) {
    const invoiceData = {
      customerNumber: data.numero_cliente,
      referenceMonth: data.mes_referencia,
      energyKwh: data.energia_eletrica,
      energyValue: data.valor_total, // Usando o valor total diretamente
      sceeeKwh: data.energia_scee,
      sceeeValue: data.energia_scee,
      gdKwh: data.energia_gdi,
      gdValue: data.energia_gdi,
      publicLighting: data.contribuicao_ilum,
      totalConsumptionKwh: data.energia_eletrica + data.energia_scee,
      totalValueWithoutGd: data.valor_total - data.energia_gdi,
      economyGd: data.energia_gdi,
    };

    const fatura = await this.prisma.invoice.create({
      data: invoiceData,
    });

    return fatura;
  }

  async obterFaturas() {
    return this.prisma.invoice.findMany();
  }
}
