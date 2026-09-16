const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Starting Relational Database Demo...");

    try {
        // 1. Transaction Demonstration
        // Ensures both user and initial session are created together, or neither is.
        const result = await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    email: `student_${Date.now()}@test.com`,
                    name: 'Demo Student'
                }
            });

            await tx.session.createMany({
                data: [
                    { userId: newUser.id, taskCategory: 'Study', durationMin: 60 },
                    { userId: newUser.id, taskCategory: 'Study', durationMin: 45 },
                    { userId: newUser.id, taskCategory: 'Fitness', durationMin: 30 }
                ]
            });

            return newUser;
        });
        console.log("✅ Transaction completed:", result.email);

        // 2. JOINs & Filtering (Prisma uses include to do joins under the hood)
        console.log("\n--- JOIN Demonstration ---");
        const usersWithSessions = await prisma.user.findMany({
            where: {
                sessions: {
                    some: { taskCategory: 'Study' } // Filtering
                }
            },
            include: {
                sessions: true // SQL JOIN
            }
        });
        
        usersWithSessions.forEach(u => {
            console.log(`User: ${u.name}`);
            u.sessions.forEach(s => console.log(`  - Session: ${s.taskCategory} (${s.durationMin}m)`));
        });

        // 3. Grouping & Ordering
        console.log("\n--- Grouping & Ordering Demonstration ---");
        const groupedStats = await prisma.session.groupBy({
            by: ['taskCategory'],
            _sum: {
                durationMin: true
            },
            _count: {
                _all: true
            },
            orderBy: {
                _sum: {
                    durationMin: 'desc'
                }
            }
        });

        console.log("Total Time by Category (Ordered):");
        groupedStats.forEach(stat => {
            console.log(`Category: ${stat.taskCategory} | Total Tasks: ${stat._count._all} | Total Min: ${stat._sum.durationMin}`);
        });

    } catch (error) {
        console.error("❌ Transaction or Query failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

// To run this demo locally:
// 1. Ensure Postgres is running and DATABASE_URL is set in backend/.env
// 2. Run: npx prisma db push --schema=database/postgres/schema.prisma
// 3. Run: npm install @prisma/client
// 4. Run: npx prisma generate --schema=database/postgres/schema.prisma
// 5. Run: node database/postgres/demo.js
if (require.main === module) {
    main();
}

module.exports = { main };
