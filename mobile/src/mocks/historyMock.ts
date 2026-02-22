export interface HistoryItem {
    id: string;
    date: string;
    quote: string;
    duration: string;
    isToday?: boolean;
}

export const historyMock: HistoryItem[] = [
    {
        id: '1',
        date: 'Hoje, 14:32',
        quote: '“Não tô com vontade...”',
        duration: 'Duração: 2min',
        isToday: true,
    },
    {
        id: '2',
        date: 'Ontem, 21:15',
        quote: '“Como posso melhorar...”',
        duration: 'Duração: 5min',
    },
    {
        id: '3',
        date: '14/02, 09:30',
        quote: '“Caí no vício...”',
        duration: 'Duração: 8min',
    },
    {
        id: '4',
        date: '12/02, 18:45',
        quote: '“Minha rotina está...”',
        duration: 'Duração: 4min',
    },
];
