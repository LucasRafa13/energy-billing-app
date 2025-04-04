import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Faturas')
    .setDescription('API para gerenciar faturas de energia elétrica')
    .setVersion('1.0')
    .addTag('faturas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3001);
  console.log('Aplicação rodando em http://localhost:3001');

  const prisma = new PrismaService();
  const invoices = await prisma.invoice.findMany();
  console.log('Faturas:', invoices);
  await prisma.$disconnect();
}

bootstrap().catch((e) => {
  console.error('Erro ao iniciar o servidor:', e);
  process.exit(1);
});
