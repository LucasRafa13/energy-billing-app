import * as path from 'path';
import * as fs from 'fs';
import { FaturasParserService } from './faturas-parser.service'; // Corrigido para FaturasParserService
import { PrismaService } from './prisma.service';

async function main() {
  const prisma = new PrismaService(); // Instanciando PrismaService
  const faturasParser = new FaturasParserService(prisma); // Corrigido para usar FaturasParserService
  const pasta = path.join(__dirname, '..', 'faturas');
  const arquivos = fs.readdirSync(pasta).filter((f) => f.endsWith('.pdf'));

  for (const arquivo of arquivos) {
    const caminho = path.join(pasta, arquivo);
    try {
      const buffer = fs.readFileSync(caminho); // Lê o arquivo PDF como buffer
      const dados = await faturasParser.processarFaturaPDF(buffer); // Chamando o método da instância
      console.log(`✅ Dados extraídos de ${arquivo}:`, dados);

      // Salvando os dados no banco
      await prisma.invoice.create({
        data: {
          customerNumber: dados.customerNumber,
          referenceMonth: dados.referenceMonth,
          energyKwh: dados.energyKwh,
          energyValue: dados.energyValue,
          sceeeKwh: dados.sceeeKwh,
          sceeeValue: dados.sceeeValue, // Mantendo a propriedade que o Prisma espera
          gdKwh: dados.gdKwh,
          gdValue: dados.gdValue, // Mantendo a propriedade que o Prisma espera
          publicLighting: dados.publicLighting,
          totalConsumptionKwh: dados.totalConsumptionKwh,
          totalValueWithoutGd: dados.totalValueWithoutGd,
          economyGd: dados.economyGd,
        },
      });
    } catch (e: any) {
      console.error(`❌ Erro ao processar ${arquivo}:`, e.message);
    }
  }

  await prisma.$disconnect();
}

main();
