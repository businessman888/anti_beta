/**
 * Archetype Calculator
 * Maps the 28 quiz answers to one of 5 archetypes based on scoring rules.
 */

export type ArchetypeKey = 'the_ghost' | 'dopamine_slave' | 'stagnant_provider' | 'rusty_warrior' | 'lost_rookie';

export interface ArchetypeInfo {
    key: ArchetypeKey;
    title: string;
    mainWeakness: string;
    focus: string;
    shock: string;
    radar: Record<string, number>;
}

const ARCHETYPES: Record<ArchetypeKey, ArchetypeInfo> = {
    the_ghost: {
        key: 'the_ghost',
        title: 'O Espectro',
        mainWeakness: 'Invisibilidade Social',
        focus: 'Presença e Projeção',
        shock: 'Seu perfil indica Invisibilidade Social. Você está operando como um observador da vida alheia enquanto sua própria presença se dissolve em telas.',
        radar: { dominancia: 15, carisma: 30, energia: 25 },
    },
    dopamine_slave: {
        key: 'dopamine_slave',
        title: 'Escravo da Dopamina',
        mainWeakness: 'Sistema de Recompensa Sequestrado',
        focus: 'Reset Químico e Foco',
        shock: 'Seu sistema de recompensa está Sequestrado. Seus níveis de energia e foco estão sendo drenados por prazeres baratos, impedindo qualquer evolução real.',
        radar: { foco: 10, disciplina: 20, testosterona: 30 },
    },
    stagnant_provider: {
        key: 'stagnant_provider',
        title: 'Provedor Estagnado',
        mainWeakness: 'Isolamento no Sucesso',
        focus: 'Calibração e Atração',
        shock: 'Você construiu o castelo, mas está Sozinho nele. Sua dominância financeira não está se traduzindo em dominância social ou atratividade.',
        radar: { status: 80, habilidade_social: 20, romance: 15 },
    },
    rusty_warrior: {
        key: 'rusty_warrior',
        title: 'Guerreiro Enferrujado',
        mainWeakness: 'Dissonância Casca-Miolo',
        focus: 'Execução Social',
        shock: 'Você tem o motor, mas não sabe Dirigir. Sua casca física está evoluindo, mas sua calibração social está obsoleta e te faz perder oportunidades.',
        radar: { fisico: 75, calibracao_social: 25, coragem: 40 },
    },
    lost_rookie: {
        key: 'lost_rookie',
        title: 'Iniciante Desorientado',
        mainWeakness: 'Falta de Fundamentos',
        focus: 'Rotina e Identidade',
        shock: 'Você está tentando correr antes de Engatinhar. Sua falta de fundamentos básicos (rotina e disciplina) está sabotando seu potencial antes mesmo de você começar.',
        radar: { experiencia: 10, potencial: 90, disciplina: 20 },
    },
};

// Frequency option mappings to numeric severity
const FREQ_HIGH = ['Diariamente', 'Múltiplas vezes ao dia'];
const FREQ_MED = ['Semanalmente (1-6x/semana)'];

const SOCIAL_MEDIA_HIGH = ['5-6 horas', 'Mais de 6 horas'];
const SOCIAL_MEDIA_MED = ['3-4 horas'];

const INCOME_HIGH = ['R$ 5.001-10.000', 'Acima de R$ 10.000'];

const WORKS_FULL = ['Trabalhando em período integral', 'Empreendedor/freelancer'];

const ROMANTIC_NONE = ['Nenhuma'];

const TRAINS_REGULARLY = ['3-4x por semana', '5-6x por semana', 'Diariamente (7x por semana)'];

const REJECTION_FEARS = ['Medo de rejeição', 'Não sei o que falar/como iniciar conversa', 'Timidez/ansiedade social'];

const YOUNG_STATUSES = ['Estudante (ensino médio/técnico)', 'Estudante universitário'];
const LOW_INCOME = ['Sem renda', 'R$ 1-1.500'];

const SOCIAL_RARE = ['Nunca ou raramente (menos de 1x/mês)'];

const DIET_BAD = ['Ruim (predominância de industrializados e fast food)', 'Péssima (sem rotina alimentar, pulo refeições)'];

export function calculateArchetype(answers: Record<string, any>): ArchetypeInfo {
    const scores = { the_ghost: 0, dopamine_slave: 0, stagnant_provider: 0, rusty_warrior: 0, lost_rookie: 0 };

    // === THE GHOST (O Espectro) ===
    // High shyness: communicationSkills < 4
    if (typeof answers.communicationSkills === 'number' && answers.communicationSkills < 4) {
        scores.the_ghost += 5;
    } else if (typeof answers.communicationSkills === 'number' && answers.communicationSkills < 6) {
        scores.the_ghost += 2;
    }
    // Low socializing frequency
    if (SOCIAL_RARE.includes(answers.socializingFrequency)) {
        scores.the_ghost += 4;
    }
    // Low social circle
    if (typeof answers.socialCircle === 'number' && answers.socialCircle < 4) {
        scores.the_ghost += 4;
    }
    // High social media usage
    if (SOCIAL_MEDIA_HIGH.includes(answers.socialMediaTime)) {
        scores.the_ghost += 5;
    } else if (SOCIAL_MEDIA_MED.includes(answers.socialMediaTime)) {
        scores.the_ghost += 2;
    }
    // No romantic interactions
    if (ROMANTIC_NONE.includes(answers.romanticInteractions)) {
        scores.the_ghost += 2;
    }

    // === DOPAMINE SLAVE (Escravo da Dopamina) ===
    // High porn frequency
    if (FREQ_HIGH.includes(answers.pornographyFrequency)) {
        scores.dopamine_slave += 5;
    } else if (FREQ_MED.includes(answers.pornographyFrequency)) {
        scores.dopamine_slave += 2;
    }
    // High masturbation frequency
    if (FREQ_HIGH.includes(answers.masturbationFrequency)) {
        scores.dopamine_slave += 5;
    } else if (FREQ_MED.includes(answers.masturbationFrequency)) {
        scores.dopamine_slave += 2;
    }
    // Bad sleep quality
    if (typeof answers.sleepQuality === 'number' && answers.sleepQuality < 5) {
        scores.dopamine_slave += 4;
    }
    // Bad diet
    if (DIET_BAD.includes(answers.diet)) {
        scores.dopamine_slave += 4;
    }
    // High social media (dopamine loop)
    if (SOCIAL_MEDIA_HIGH.includes(answers.socialMediaTime)) {
        scores.dopamine_slave += 2;
    }

    // === STAGNANT PROVIDER (Provedor Estagnado) ===
    // High income
    if (INCOME_HIGH.includes(answers.currentIncome)) {
        scores.stagnant_provider += 5;
    }
    // Works a lot
    if (WORKS_FULL.includes(answers.professionalSituation)) {
        scores.stagnant_provider += 3;
    }
    // No romantic life
    if (ROMANTIC_NONE.includes(answers.romanticInteractions)) {
        scores.stagnant_provider += 4;
    }
    // Single seeking or single no interest
    if (answers.relationshipStatus === 'Solteiro, sem interesse romântico no momento' || answers.relationshipStatus === 'Solteiro, buscando relacionamento') {
        scores.stagnant_provider += 2;
    }
    // Older age (> 28)
    if (typeof answers.age === 'number' && answers.age > 28) {
        scores.stagnant_provider += 4;
    }
    // Low social circle despite resources
    if (typeof answers.socialCircle === 'number' && answers.socialCircle < 5) {
        scores.stagnant_provider += 2;
    }

    // === RUSTY WARRIOR (Guerreiro Enferrujado) ===
    // Already trains regularly
    if (TRAINS_REGULARLY.includes(answers.physicalActivity)) {
        scores.rusty_warrior += 5;
    }
    // High commitment
    if (typeof answers.commitmentLevel === 'number' && answers.commitmentLevel >= 7) {
        scores.rusty_warrior += 3;
    }
    // Good physical condition
    if (typeof answers.physicalCondition === 'number' && answers.physicalCondition >= 6) {
        scores.rusty_warrior += 3;
    }
    // Social interaction difficulties (fear/shyness)
    if (Array.isArray(answers.interactionDifficulties)) {
        const hasRejectionFear = answers.interactionDifficulties.some((d: string) => REJECTION_FEARS.includes(d));
        if (hasRejectionFear) {
            scores.rusty_warrior += 5;
        }
    }
    // Penalize if doesn't train (can't be warrior without the body)
    if (answers.physicalActivity === 'Não pratico') {
        scores.rusty_warrior -= 5;
    }

    // === LOST ROOKIE (Iniciante Desorientado) ===
    // Young (< 22)
    if (typeof answers.age === 'number' && answers.age < 22) {
        scores.lost_rookie += 5;
    }
    // Student or no income
    if (YOUNG_STATUSES.includes(answers.professionalSituation)) {
        scores.lost_rookie += 3;
    }
    if (LOW_INCOME.includes(answers.currentIncome)) {
        scores.lost_rookie += 3;
    }
    // Low self-esteem
    if (typeof answers.selfEsteem === 'number' && answers.selfEsteem < 4) {
        scores.lost_rookie += 4;
    }
    // Wants everything (multiple primary objectives)
    if (Array.isArray(answers.primaryObjectives) && answers.primaryObjectives.length >= 4) {
        scores.lost_rookie += 4;
    }
    // Low commitment (unsure)
    if (typeof answers.commitmentLevel === 'number' && answers.commitmentLevel < 5) {
        scores.lost_rookie += 2;
    }

    // Find the archetype with the highest score
    const winnerKey = (Object.keys(scores) as ArchetypeKey[]).reduce((a, b) =>
        scores[a] >= scores[b] ? a : b
    );

    return ARCHETYPES[winnerKey];
}

export function getArchetypeInfo(key: ArchetypeKey): ArchetypeInfo {
    return ARCHETYPES[key];
}

export function getAllArchetypes(): Record<ArchetypeKey, ArchetypeInfo> {
    return ARCHETYPES;
}
