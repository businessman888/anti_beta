import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';

@Injectable()
export class AnthropicClientService {
  readonly client: Anthropic;

  constructor(configService: ConfigService) {
    const apiKey =
      configService.get<string>('anthropic.apiKey') ||
      process.env.ANTHROPIC_API_KEY ||
      '';
    this.client = new Anthropic({ apiKey });
  }
}
