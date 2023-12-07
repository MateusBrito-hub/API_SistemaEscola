import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Users - DeleteById', () => {
    it('Delete existing User', async () => {
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
            .delete(`/users/${data.body}`)
            .send();

        expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Delete non-existing User', async () => {
        const res = await testServer
            .delete('/users/9999999')
            .send();

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
});
