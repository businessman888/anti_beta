import { Injectable, Logger } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { PrismaService } from '../../prisma/prisma.service';
import { AnalyzeImageDto } from './dto/analyze-image.dto';

@Injectable()
export class ScannerService {
    private readonly logger = new Logger(ScannerService.name);
    private readonly anthropic: Anthropic;

    constructor(private readonly prisma: PrismaService) {
        this.anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });
    }

    async analyzeImage(dto: AnalyzeImageDto) {
        const { imageBase64, imageType, userId, imageUrl } = dto;

        this.logger.log(`Analyzing image for user: ${userId || 'anonymous'}`);

        const systemPrompt = `Você é um analista de interações sociais brutal e lógico. Sua função é analisar prints de conversas e julgar se o usuário é um Alpha (mandando bem) ou um Beta (fracassando/submisso).

Lógica de Temperatura (0 a 100):
Alpha (0 - 40): O usuário tem 'baixa temperatura de beta'. Ele é dominante e desapegado.
Meio Termo (40 - 60): O usuário está oscilando, nem lá, nem cá.
Beta (60 - 100): O usuário tem 'alta temperatura de beta'. Ele está implorando atenção.

Regras de Resposta:
Inicie SEMPRE com a frase padrão baseada na temperatura:
< 40: 'Brutal! está sobrando tudo'
40-60: 'Brutal, está sobrando quase nada'
> 60: 'Brutal, não sobrou nada!'

Use referências ao meme 'não sobrou nada para o betinha'.
Seja direto, use lógica fria e dê uma sugestão de resposta curta e impactante.

Retorne APENAS um objeto JSON com os campos EXATOS: beta_temperature, interest_score, frase_padrao, analise_detalhada, sugestao_resposta. 
Nota: interest_score deve ser um número de 0 a 10 (float permitido).
Não inclua explicações fora do JSON.`;

        try {
            const msg = await this.anthropic.messages.create({
                model: "claude-haiku-4-5-20251001",
                max_tokens: 1024,
                temperature: 0.5,
                system: systemPrompt,
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "image",
                                source: {
                                    type: "base64",
                                    media_type: imageType as any,
                                    data: imageBase64,
                                },
                            },
                            {
                                type: "text",
                                text: "Analise este print de conversa.",
                            },
                        ],
                    },
                ],
            });

            const content = msg.content[0];
            if (content.type !== 'text') {
                throw new Error('Unexpected response type from AI');
            }

            let analysisJson: any;
            try {
                const jsonText = content.text.trim();
                const cleanedJson = jsonText.replace(/```json\n?|```/g, '');
                analysisJson = JSON.parse(cleanedJson);
            } catch (parseError) {
                this.logger.error('Failed to parse AI response as JSON');
                throw new Error('Failed to parse analysis from AI response');
            }

            // Persist to database if userId and imageUrl are provided
            if (userId && imageUrl) {
                try {
                    await this.prisma.scannerAnalysis.create({
                        data: {
                            userId: userId,
                            imageUrl: imageUrl,
                            frase_padrao: analysisJson.frase_padrao,
                            analise_detalhada: analysisJson.analise_detalhada,
                            sugestao_resposta: analysisJson.sugestao_resposta,
                            beta_temperature: Number(analysisJson.beta_temperature),
                            interest_score: Number(analysisJson.interest_score),
                        },
                    });
                    this.logger.log(`Analysis saved for user ${userId}`);
                } catch (dbError) {
                    this.logger.error(`Failed to save analysis: ${dbError.message}`);
                    // We don't throw here to ensure the user gets the analysis even if DB save fails
                }
            }

            return analysisJson;
        } catch (error: any) {
            this.logger.error(`Analysis failed: ${error?.message || error}`);
            throw error;
        }
    }
}
