import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:5173', // URL onde o frontend está sendo executado
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization', // Cabeçalhos permitidos
  });

  // Configuração do Swagger
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
}

bootstrap().catch((e) => {
  console.error('Erro ao iniciar o servidor:', e);
  process.exit(1);
});
