import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class GeneratePlanDto {
    @ApiProperty({
        description: 'Respostas completas do quiz de onboarding',
        example: {
            name: 'Lucas',
            age: 22,
            professionalSituation: 'estudante_uni',
            dailyAvailability: 3,
            currentIncome: 'ate_1500',
            selfEsteem: 5,
            pornographyFrequency: 'diariamente',
            masturbationFrequency: 'diariamente',
            socialMediaTime: '3_4h',
            substanceUse: { none: null },
            sleepHours: 7,
            sleepQuality: 6,
            diet: 'razoavel',
            physicalActivity: 'nao_pratico',
            workoutTypes: ['musculacao'],
            physicalCondition: 4,
            physicalRestrictions: ['none'],
            gymAccess: 'gym_complete',
            communicationSkills: 4,
            relationshipStatus: 'single_looking',
            romanticInteractions: '1_2',
            interactionDifficulties: ['rejection', 'shyness'],
            socializingFrequency: '1_2_month',
            socialCircle: 3,
            primaryObjectives: ['physique', 'confidence', 'vices'],
            timelineExpectation: '3_meses',
            commitmentLevel: 8,
            additionalContext: '',
        },
    })
    @IsObject()
    answers: Record<string, any>;

    @ApiPropertyOptional({
        description: 'ID do usuário (opcional, será extraído do token quando auth for implementado)',
    })
    @IsOptional()
    @IsString()
    userId?: string;
}

export class PlanResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    userId: string;

    @ApiProperty({
        description: 'Plano gerado pela IA em formato JSON estruturado',
    })
    planData: any;

    @ApiProperty()
    createdAt: Date;
}
