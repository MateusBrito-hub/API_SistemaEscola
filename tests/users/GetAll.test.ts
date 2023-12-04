import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Users - GetAll', () => {
    it('List all Users', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                password: '12nubivfvuvk'
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);
        
        const res = await testServer
            .get('/users')
            .send();

        const body = Object.values(res.body);
        expect(body.length).toBeGreaterThan(0);
        expect(Number(res.headers['x-total-count'])).toBeGreaterThan(0);
        expect(res.statusCode).toEqual(StatusCodes.OK);
    });
});
