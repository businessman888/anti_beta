
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

// Mocking QuestionType manually since it's an enum in TS but object/string in DB
const QuestionType = {
    TEXT: 'TEXT',
    NUMBER: 'NUMBER',
    SINGLE_CHOICE: 'SINGLE_CHOICE',
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
    SCALE: 'SCALE'
};

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database via JS...');

    // Questions Data
    const questions = [
        // Seção 1: Identificação e Contexto Pessoal
        {
            text: 'Qual é o seu nome completo?',
            section: 'Identificação e Contexto Pessoal',
            type: QuestionType.TEXT,
            order: 1,
            options: null,
        },
        {
            text: 'Quantos anos você tem?',
            section: 'Identificação e Contexto Pessoal',
            type: QuestionType.NUMBER,
            order: 2,
            options: null,
        },
        {
            text: 'Qual é a sua situação profissional atual?',
            section: 'Identificação e Contexto Pessoal',
            type: QuestionType.SINGLE_CHOICE,
            order: 3,
            options: [
                'Estudante (ensino médio/técnico)',
                'Estudante universitário',
                'Trabalhando em período integral',
                'Trabalhando em período parcial',
                'Desempregado/procurando emprego',
                'Empreendedor/freelancer',
            ],
        },
        {
            text: 'Quantas horas por dia você tem disponíveis para se dedicar ao seu desenvolvimento pessoal?',
            section: 'Identificação e Contexto Pessoal',
            type: QuestionType.NUMBER,
            order: 4,
            options: null, // Escala deslizante 0-8h
        },
        {
            text: 'Qual é a sua renda mensal aproximada? (em R$)',
            section: 'Identificação e Contexto Pessoal',
            type: QuestionType.SINGLE_CHOICE,
            order: 5,
            options: [
                'Sem renda',
                'R$ 1-1.500',
                'R$ 1.501-3.000',
                'R$ 3.001-5.000',
                'R$ 5.001-10.000',
                'Acima de R$ 10.000',
                'Prefiro não informar',
            ],
        },

        // Seção 2: Diagnóstico Comportamental e Vícios
        {
            text: 'Em uma escala de 1 a 10, como você avalia sua autoestima e confiança pessoal atualmente?',
            section: 'Diagnóstico Comportamental e Vícios',
            type: QuestionType.SCALE,
            order: 6,
            options: null,
        },
        {
            text: 'Com que frequência você consome pornografia?',
            section: 'Diagnóstico Comportamental e Vícios',
            type: QuestionType.SINGLE_CHOICE,
            order: 7,
            options: [
                'Nunca ou raramente (menos de 1x/mês)',
                'Ocasionalmente (1-3x/mês)',
                'Semanalmente (1-6x/semana)',
                'Diariamente',
                'Múltiplas vezes ao dia',
            ],
        },
        {
            text: 'Você se masturba com frequência?',
            section: 'Diagnóstico Comportamental e Vícios',
            type: QuestionType.SINGLE_CHOICE,
            order: 8,
            options: [
                'Nunca ou raramente (menos de 1x/mês)',
                'Ocasionalmente (1-3x/mês)',
                'Semanalmente (1-6x/semana)',
                'Diariamente',
                'Múltiplas vezes ao dia',
            ],
        },
        {
            text: 'Quantas horas por dia você passa em redes sociais (Instagram, TikTok, X, etc.)?',
            section: 'Diagnóstico Comportamental e Vícios',
            type: QuestionType.SINGLE_CHOICE,
            order: 9,
            options: [
                'Menos de 1 hora',
                '1-2 horas',
                '3-4 horas',
                '5-6 horas',
                'Mais de 6 horas',
            ],
        },
        {
            text: 'Você faz uso de substâncias como álcool, cigarro, maconha ou outras drogas?',
            section: 'Diagnóstico Comportamental e Vícios',
            type: QuestionType.MULTIPLE_CHOICE,
            order: 10,
            options: [
                'Não uso nenhuma substância',
                'Álcool',
                'Cigarro/vape',
                'Maconha',
                'Outras drogas recreativas',
            ],
        },
        {
            text: 'Quantas horas você dorme por noite em média?',
            section: 'Diagnóstico Comportamental e Vícios',
            type: QuestionType.NUMBER,
            order: 11,
            options: null,
        },
        {
            text: 'Qual é a qualidade do seu sono? (1 = Péssima, 10 = Excelente)',
            section: 'Diagnóstico Comportamental e Vícios',
            type: QuestionType.SCALE,
            order: 12,
            options: null,
        },
        {
            text: 'Como você descreveria sua alimentação atual?',
            section: 'Diagnóstico Comportamental e Vícios',
            type: QuestionType.SINGLE_CHOICE,
            order: 13,
            options: [
                'Muito saudável',
                'Razoável',
                'Ruim',
                'Péssima',
            ],
        },

        // Seção 3: Estado Físico e Atividades
        {
            text: 'Você pratica atividade física regularmente?',
            section: 'Estado Físico e Atividades',
            type: QuestionType.SINGLE_CHOICE,
            order: 14,
            options: [
                'Não pratico',
                '1-2x por semana',
                '3-4x por semana',
                '5-6x por semana',
                'Diariamente (7x por semana)',
            ],
        },
        {
            text: 'Se você treina, qual tipo de treino você pratica ou tem interesse em praticar?',
            section: 'Estado Físico e Atividades',
            type: QuestionType.MULTIPLE_CHOICE,
            order: 15,
            options: [
                'Musculação/academia',
                'CrossFit/treino funcional',
                'Artes marciais',
                'Corrida/ciclismo',
                'Esportes coletivos',
                'Calistenia/treino com peso corporal',
                'Não tenho interesse',
            ],
        },
        {
            text: 'Como você avalia seu nível de condicionamento físico atual? (1 = Sedentário, 10 = Atlético)',
            section: 'Estado Físico e Atividades',
            type: QuestionType.SCALE,
            order: 16,
            options: null,
        },
        {
            text: 'Você tem alguma restrição física ou lesão que limite sua prática de exercícios?',
            section: 'Estado Físico e Atividades',
            type: QuestionType.MULTIPLE_CHOICE,
            order: 17,
            options: [
                'Não tenho restrições',
                'Lesão no joelho',
                'Lesão nas costas/coluna',
                'Lesão no ombro/braço',
                'Problemas cardíacos/respiratórios',
                'Outra',
            ],
        },
        {
            text: 'Você tem acesso a academia ou equipamentos de treino em casa?',
            section: 'Estado Físico e Atividades',
            type: QuestionType.SINGLE_CHOICE,
            order: 18,
            options: [
                'Tenho acesso a academia completa',
                'Tenho equipamentos básicos em casa',
                'Não tenho equipamentos (apenas peso corporal)',
            ],
        },

        // Seção 4: Relacionamentos e Interações Sociais
        {
            text: 'Como você avalia suas habilidades sociais e de comunicação? (1 = Muito tímido, 10 = Extrovertido)',
            section: 'Relacionamentos e Interações Sociais',
            type: QuestionType.SCALE,
            order: 19,
            options: null,
        },
        {
            text: 'Qual é a sua situação de relacionamento atual?',
            section: 'Relacionamentos e Interações Sociais',
            type: QuestionType.SINGLE_CHOICE,
            order: 20,
            options: [
                'Solteiro, sem interesse romântico no momento',
                'Solteiro, buscando relacionamento',
                'Ficando/conhecendo alguém',
                'Em um relacionamento sério',
            ],
        },
        {
            text: 'Nos últimos 6 meses, quantas interações românticas/flertes você teve com mulheres?',
            section: 'Relacionamentos e Interações Sociais',
            type: QuestionType.SINGLE_CHOICE,
            order: 21,
            options: [
                'Nenhuma',
                '1-2 interações',
                '3-5 interações',
                '6-10 interações',
                'Mais de 10 interações',
            ],
        },
        {
            text: 'Qual é a principal dificuldade que você enfrenta ao interagir com mulheres?',
            section: 'Relacionamentos e Interações Sociais',
            type: QuestionType.MULTIPLE_CHOICE,
            order: 22,
            options: [
                'Medo de rejeição',
                'Não sei o que falar/como iniciar conversa',
                'Timidez/ansiedade social',
                'Não sei interpretar sinais de interesse',
                'Dificuldade em manter a conversa interessante',
                'Baixa autoestima/não me acho atraente',
                'Não tenho dificuldades',
            ],
        },
        {
            text: 'Com que frequência você sai de casa para socializar (bares, festas, eventos)?',
            section: 'Relacionamentos e Interações Sociais',
            type: QuestionType.SINGLE_CHOICE,
            order: 23,
            options: [
                'Nunca ou raramente',
                '1-2x por mês',
                '1x por semana',
                '2-3x por semana',
                'Mais de 3x por semana',
            ],
        },
        {
            text: 'Você tem um círculo social ativo?',
            section: 'Relacionamentos e Interações Sociais',
            type: QuestionType.SCALE,
            order: 24,
            options: null,
        },

        // Seção 5: Metas e Objetivos de Transformação
        {
            text: 'Qual é o seu principal objetivo ao usar o Antibeta?',
            section: 'Metas e Objetivos de Transformação',
            type: QuestionType.MULTIPLE_CHOICE,
            order: 25,
            options: [
                'Melhorar minhas habilidades de conquista com mulheres',
                'Ganhar massa muscular e melhorar físico',
                'Aumentar minha testosterona e energia',
                'Cortar vícios',
                'Desenvolver confiança e autoestima',
                'Melhorar minha carreira e situação financeira',
                'Criar disciplina e rotina estruturada',
                'Me tornar mais intelectual',
            ],
        },
        {
            text: 'Em quanto tempo você espera ver resultados significativos na sua transformação?',
            section: 'Metas e Objetivos de Transformação',
            type: QuestionType.SINGLE_CHOICE,
            order: 26,
            options: [
                '1-3 meses (rápido)',
                '3-6 meses (moderado)',
                '6-12 meses (gradual)',
                'Mais de 1 ano (longo prazo)',
            ],
        },
        {
            text: 'Qual é o seu nível de comprometimento em seguir um plano rigoroso de transformação?',
            section: 'Metas e Objetivos de Transformação',
            type: QuestionType.SCALE,
            order: 27,
            options: null,
        },
        {
            text: 'Há algo específico sobre a sua situação atual que você gostaria que o Antibeta soubesse?',
            section: 'Metas e Objetivos de Transformação',
            type: QuestionType.TEXT,
            order: 28,
            options: null,
        },
    ];

    for (const q of questions) {
        const existing = await prisma.question.findFirst({
            where: { order: q.order },
        });

        if (!existing) {
            await prisma.question.create({
                data: q,
            });
            console.log(`Created question ${q.order}: ${q.text.substring(0, 30)}...`);
        } else {
            console.log(`Question ${q.order} already exists.`);
        }
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
