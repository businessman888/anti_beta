export const homeMockData = {
    user: {
        name: 'Lucas',
        level: 'BETA 01',
        testosterone: 240,
        testoGrowth: 5, // +5% esta semana
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop',
        streak: 12,
    },
    goals: {
        completed: 4,
        total: 5,
        items: [
            { id: '1', title: 'Treino', completed: true, type: 'workout' },
            { id: '2', title: 'Refeições', completed: true, type: 'meal' },
            { id: '3', title: 'Água', completed: false, type: 'water' },
            { id: '4', title: 'Práticas', completed: true, type: 'practice' },
            { id: '5', title: 'Quiz', completed: false, type: 'quiz' },
        ],
    },
    workout: {
        title: 'Peito e Tríceps',
        exercises: 6,
        duration: '45 min',
    },
    meals: {
        items: [
            { id: '1', title: 'Café da manhã', time: '07:00', completed: true },
            { id: '2', title: 'Snack Manhã', time: '10:00', completed: true },
            { id: '3', title: 'Almoço', time: '13:00', completed: true },
            { id: '4', title: 'Snack Tarde', time: '13:00', completed: false, isCurrent: true },
            { id: '5', title: 'Jantar', time: '13:00', completed: false },
        ]
    },
    hydration: {
        current: 0.5,
        target: 2.0,
    },
    biohacking: {
        items: [
            { id: '1', title: 'Banho gelado', completed: false },
            { id: '2', title: 'Exposição solar (15 min)', completed: true },
        ]
    },
    alphaTip: {
        title: 'Dica Alfa semanal',
        content: '"Foco em hidratação esta semana. Aumente o consumo pela manhã para melhorar o foco cognitivo."',
    },
    dailyQuiz: {
        availableIn: '21h',
        isLocked: true,
    },
};
