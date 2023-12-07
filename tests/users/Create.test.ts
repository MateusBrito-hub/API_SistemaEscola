import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Users - Create', () => {
    it('Create User', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito6@gmail.com',
                password: '12nubivfvuvk',
                userTypeId: 1
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
                email: 'mateusvsbrito6@gmail.com',
                password: '12nubivfvuvk',
                userTypeId: 1
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
                email: 'mateusvsbrito6@gmail.com',
                password: '12nubivfvuvk',
                userTypeId: 1
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
                email: 'mateusvsbrito6@gmail.com',
                password: '12nubivfvuvk',
                userTypeId: 1
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
                email: 'mateusvsbrito6@gmail.com',
                password: '12nubivfvuvk',
                userTypeId: 1
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.user');
    });
    it('Create User without email informed', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: 'Mateus',
                user: 'Brito',
                email: null,
                password: '12nubivfvuvk',
                userTypeId: 1
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.email');
    });
    it('Create User with password less than six characters', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: 'Mateus',
                user: 'Brito',
                email: 'mateusvsbrito6@gmail.com',
                password: '12nub',
                userTypeId: 1
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
                email: 'mateusvsbrito6@gmail.com',
                password: null,
                userTypeId: 1
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
