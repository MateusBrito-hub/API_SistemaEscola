import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Users - GetAll', () => {
    let userTypeId: number | undefined = undefined;
    beforeAll(async () => {
        const userType = await testServer
            .post('/userTypes')
            .send({ name: 'Teste' });

        userTypeId = userType.body;
    });
    it('List all Users', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito6@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);

        const res = await testServer
            .get('/users')
            .send();

        expect(Number(res.headers['x-total-count'])).toBeGreaterThan(0);
        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
