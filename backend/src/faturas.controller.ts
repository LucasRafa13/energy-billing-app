import { Controller, Get } from '@nestjs/common';
import { FaturasService } from './faturas.service';

@Controller('faturas')
export class FaturasController {
  constructor(private readonly faturasService: FaturasService) {}

  // Endpoint para obter todas as faturas
  @Get()
  async getFaturas() {
    return this.faturasService.obterFaturas();
  }
}
