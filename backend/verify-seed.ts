import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

console.log('DB URL loaded:', process.env.DATABASE_URL ? 'Yes (starts with ' + process.env.DATABASE_URL.substring(0, 10) + ')' : 'No');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    try {
        const count = await prisma.question.count();
        console.log(`Verification: Found ${count} questions in the database.`);
        if (count === 28) {
            console.log('Seed verification PASSED.');
        } else {
            console.log('Seed verification FAILED.');
            process.exit(1);
        }
    } catch (error) {
        console.error('Error during verification:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
