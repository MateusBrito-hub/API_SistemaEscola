import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Users - Create', () => {
    let userTypeId: number | undefined = undefined;
    beforeAll(async () => {
        const userType = await testServer
            .post('/userTypes')
            .send({ name: 'Teste' });

        userTypeId = userType.body;
    });
    it('Create User', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito6@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('number');
    });
    it('Create User 2', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('number');
    });
    it('Create User with duplicate email', async () => {
        const res1 = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito1@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const res2 = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito1@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');
    });
    it('Create User with name less than three characters', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: 'Ma',
                user: 'Brito',
                email: 'mateusvsbrito6@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
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
                userTypeId
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
                userTypeId
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
                userTypeId
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
                userTypeId
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
                userTypeId
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
                userTypeId
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.password');
    });
    it('Create User without userTypeId informed', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: 'Mateus',
                user: 'Brito',
                email: 'mateusvsbrito6@gmail.com',
                password: '12nubivfvuvk',
                userTypeId: null
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.userTypeId');
    });
    it('Create User with userTypeId less than one', async () => {
        const res = await testServer
            .post('/users')
            .send({
                name: 'Mateus',
                user: 'Brito',
                email: 'mateusvsbrito6@gmail.com',
                password: '12nubivfvuvk',
                userTypeId: 0
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.userTypeId');
    });
    it('Create user without data', async () => {
        const res = await testServer
            .post('/users')
            .send({});

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body');
    });
});
