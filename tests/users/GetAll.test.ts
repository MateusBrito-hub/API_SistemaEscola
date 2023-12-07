import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Users - GetAll', () => {
    it('List all Users', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito6@gmail.com',
                password: '12nubivfvuvk',
                userTypeId: 1
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);
        
        const res = await testServer
            .get('/users')
            .send();

        console.log('x-total-count:', Number(res.headers['x-total-count']));
        expect(Number(res.headers['x-total-count'])).toBeGreaterThan(0);
        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
