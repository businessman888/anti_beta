import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ConversationalController } from './conversational.controller';
import { ConversationalService } from './conversational.service';
import { AnthropicService } from './anthropic.service';

@Module({
    imports: [PrismaModule],
    controllers: [ConversationalController],
    providers: [ConversationalService, AnthropicService],
})
export class ConversationalModule { }
