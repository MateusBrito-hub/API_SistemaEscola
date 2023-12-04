import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Users - Create', () => {
    it('Create User', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                password: '12nubivfvuvk'
            });

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('number');
    });
    it('Create User with name less than three characters', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: 'Ma',
                user: 'Brito',
                password: '12nubivfvuvk'
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.name');
    });
    it('Create User without given name', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: null,
                user: 'Brito',
                password: '12nubivfvuvk'
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.name');
    });
    it('Create User with username less than three characters', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: 'Mateus',
                user: 'Br',
                password: '12nubivfvuvk'
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.user');
    });
    it('Create User without username informed', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: 'Mateus',
                user: null,
                password: '12nubivfvuvk'
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.user');
    });
    it('Create User with password less than six characters', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: 'Mateus',
                user: 'Brito',
                password: '12nub'
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.password');
    });
    it('Create User without password informed', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: 'Mateus',
                user: 'Brito',
                password: null
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.password');
    });
    it('Create user without data', async () => {
        const res = await testServer
            .post('/users')
            .send({});

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body');
    });
});
