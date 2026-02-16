"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var questions, _i, questions_1, q, existing;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Seeding database...');
                    questions = [
                        // Seção 1: Identificação e Contexto Pessoal
                        {
                            text: 'Qual é o seu nome completo?',
                            section: 'Identificação e Contexto Pessoal',
                            type: client_1.QuestionType.TEXT,
                            order: 1,
                            options: null,
                        },
                        {
                            text: 'Quantos anos você tem?',
                            section: 'Identificação e Contexto Pessoal',
                            type: client_1.QuestionType.NUMBER,
                            order: 2,
                            options: null,
                        },
                        {
                            text: 'Qual é a sua situação profissional atual?',
                            section: 'Identificação e Contexto Pessoal',
                            type: client_1.QuestionType.SINGLE_CHOICE,
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
                            type: client_1.QuestionType.NUMBER,
                            order: 4,
                            options: null, // Escala deslizante 0-8h
                        },
                        {
                            text: 'Qual é a sua renda mensal aproximada? (em R$)',
                            section: 'Identificação e Contexto Pessoal',
                            type: client_1.QuestionType.SINGLE_CHOICE,
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
                            type: client_1.QuestionType.SCALE,
                            order: 6,
                            options: null,
                        },
                        {
                            text: 'Com que frequência você consome pornografia?',
                            section: 'Diagnóstico Comportamental e Vícios',
                            type: client_1.QuestionType.SINGLE_CHOICE,
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
                            type: client_1.QuestionType.SINGLE_CHOICE,
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
                            type: client_1.QuestionType.SINGLE_CHOICE,
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
                            type: client_1.QuestionType.MULTIPLE_CHOICE,
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
                            type: client_1.QuestionType.NUMBER,
                            order: 11,
                            options: null,
                        },
                        {
                            text: 'Qual é a qualidade do seu sono? (1 = Péssima, 10 = Excelente)',
                            section: 'Diagnóstico Comportamental e Vícios',
                            type: client_1.QuestionType.SCALE,
                            order: 12,
                            options: null,
                        },
                        {
                            text: 'Como você descreveria sua alimentação atual?',
                            section: 'Diagnóstico Comportamental e Vícios',
                            type: client_1.QuestionType.SINGLE_CHOICE,
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
                            type: client_1.QuestionType.SINGLE_CHOICE,
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
                            type: client_1.QuestionType.MULTIPLE_CHOICE,
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
                            type: client_1.QuestionType.SCALE,
                            order: 16,
                            options: null,
                        },
                        {
                            text: 'Você tem alguma restrição física ou lesão que limite sua prática de exercícios?',
                            section: 'Estado Físico e Atividades',
                            type: client_1.QuestionType.MULTIPLE_CHOICE,
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
                            type: client_1.QuestionType.SINGLE_CHOICE,
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
                            type: client_1.QuestionType.SCALE,
                            order: 19,
                            options: null,
                        },
                        {
                            text: 'Qual é a sua situação de relacionamento atual?',
                            section: 'Relacionamentos e Interações Sociais',
                            type: client_1.QuestionType.SINGLE_CHOICE,
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
                            type: client_1.QuestionType.SINGLE_CHOICE,
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
                            type: client_1.QuestionType.MULTIPLE_CHOICE,
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
                            type: client_1.QuestionType.SINGLE_CHOICE,
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
                            type: client_1.QuestionType.SCALE,
                            order: 24,
                            options: null,
                        },
                        // Seção 5: Metas e Objetivos de Transformação
                        {
                            text: 'Qual é o seu principal objetivo ao usar o Antibeta?',
                            section: 'Metas e Objetivos de Transformação',
                            type: client_1.QuestionType.MULTIPLE_CHOICE,
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
                            type: client_1.QuestionType.SINGLE_CHOICE,
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
                            type: client_1.QuestionType.SCALE,
                            order: 27,
                            options: null,
                        },
                        {
                            text: 'Há algo específico sobre a sua situação atual que você gostaria que o Antibeta soubesse?',
                            section: 'Metas e Objetivos de Transformação',
                            type: client_1.QuestionType.TEXT,
                            order: 28,
                            options: null,
                        },
                    ];
                    _i = 0, questions_1 = questions;
                    _a.label = 1;
                case 1:
                    if (!(_i < questions_1.length)) return [3 /*break*/, 6];
                    q = questions_1[_i];
                    return [4 /*yield*/, prisma.question.findFirst({
                            where: { order: q.order },
                        })];
                case 2:
                    existing = _a.sent();
                    if (!!existing) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma.question.create({
                            data: q,
                        })];
                case 3:
                    _a.sent();
                    console.log("Created question ".concat(q.order, ": ").concat(q.text.substring(0, 30), "..."));
                    return [3 /*break*/, 5];
                case 4:
                    // Update existing if needed or skip
                    console.log("Question ".concat(q.order, " already exists."));
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    console.log('Seeding completed.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
