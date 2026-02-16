import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SystemStatusDto } from './common/dto/system/system-status.dto';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status')
  @ApiOperation({ summary: 'Verificar status da API' })
  @ApiResponse({
    status: 200,
    description: 'API Operacional',
    type: SystemStatusDto,
  })
  getStatus(): SystemStatusDto {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'API Operacional',
    };
  }
}
