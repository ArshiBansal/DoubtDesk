import { GET, POST } from '@/app/api/doubts/route';

jest.mock('@clerk/nextjs/server', () => ({
    currentUser: jest.fn().mockImplementation(async () => ({
        primaryEmailAddress: { emailAddress: 'student@example.com' },
        fullName: 'Test Student'
    }))
}));

jest.mock('@/configs/db', () => ({
    db: {
        select: jest.fn().mockImplementation(() => ({
            from: jest.fn().mockImplementation(() => {
                const queryResult: any = [{ id: 1, doubtId: 1, count: 2, blockedUntil: null }];
                queryResult.where = jest.fn().mockImplementation(() => {
                    const whereResult: any = [{ id: 1, doubtId: 1, count: 2, blockedUntil: null }];
                    whereResult.orderBy = jest.fn().mockResolvedValue([{
                        id: 1,
                        userName: 'Student_1',
                        subject: 'Physics',
                        content: 'What is speed of light?',
                        createdAt: new Date().toISOString()
                    }]);
                    whereResult.limit = jest.fn().mockResolvedValue([{
                        id: 1,
                        name: 'Physics',
                        normalizedName: 'physics'
                    }]);
                    whereResult.then = (resolve: any) => {
                        const plainArray: any = [...whereResult];
                        plainArray.orderBy = whereResult.orderBy;
                        plainArray.limit = whereResult.limit;
                        resolve(plainArray);
                    };
                    return whereResult;
                });
                queryResult.groupBy = jest.fn().mockResolvedValue([{ doubtId: 1, count: 2 }]);
                queryResult.innerJoin = jest.fn().mockImplementation(() => ({
                    where: jest.fn().mockResolvedValue([])
                }));
                return queryResult;
            })
        })),
        insert: jest.fn().mockImplementation(() => ({
            values: jest.fn().mockImplementation(() => ({
                returning: jest.fn().mockResolvedValue([{
                    id: 2,
                    userName: 'Student_1',
                    subject: 'Physics',
                    content: 'New doubt'
                }]),
                onConflictDoNothing: jest.fn().mockResolvedValue({})
            }))
        }))
    }
}));

describe('Doubts API Endpoints', () => {
    it('GET should return list of doubts', async () => {
        const req = new Request('http://localhost/api/doubts?subject=Physics');
        const res = await GET(req);
        const json = await res.json();
        expect(res.status).toBe(200);
        expect(json).toHaveLength(1);
        expect(json[0].subject).toBe('Physics');
    });

    it('POST should create a new doubt', async () => {
        const req = new Request('http://localhost/api/doubts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: 'Student_1',
                subject: 'Physics',
                content: 'New doubt'
            })
        });
        const res = await POST(req);
        const json = await res.json();
        expect(res.status).toBe(200);
        expect(json.id).toBe(2);
        expect(json.subject).toBe('Physics');
    });
});
