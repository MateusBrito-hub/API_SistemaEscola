import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Users - UpdateById', () => {
    let userTypeId: number | undefined = undefined;
    beforeAll(async () => {
        const userType = await testServer
            .post('/userTypes')
            .send({ name: 'Teste' });

        userTypeId = userType.body;
    });
    it('Update existing User', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito1@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);
        
        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: 'Mateus',
                user: 'Brito',
                email: 'mateusvsbrito1@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Update User with name less than three characters', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito2@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);
        
        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: 'Ma',
                user: 'Brito',
                email: 'mateusvsbrito2@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.name');
    });
    it('Update User without given name', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito3@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);

        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: null,
                user: 'Brito',
                email: 'mateusvsbrito3@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.name');
    });
    it('Update User with username less than three characters', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito4@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);

        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: 'Mateus',
                user: 'Br',
                email: 'mateusvsbrito4@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.user');
    });
    it('Update User without username informed', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito5@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);
        
        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: 'Mateus',
                user: null,
                email: 'mateusvsbrito5@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.user');
    });
    it('Update User with password less than six characters', async () => {
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
            .put(`/users/${data.body}`)
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
    it('Update User without password informed', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito7@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);
        
        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: 'Mateus',
                user: 'Brito',
                email: 'mateusvsbrito7@gmail.com',
                password: null,
                userTypeId
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.password');
    });
    it('Update User without userTypeId informed', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito8@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);
        
        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: 'Mateus',
                user: 'Brito',
                email: 'mateusvsbrito8@gmail.com',
                password: '12nubivfvuvk',
                userTypeId: null
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.userTypeId');
    });
    it('Update user with userTypeId less than one', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito9@gmail.com',
                password: '12nubivfvuvk',
                userTypeId
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);
        
        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: 'Mateus',
                user: 'Brito',
                email: 'mateusvsbrito9@gmail.com',
                password: '12nubivfvuvk',
                userTypeId: 0
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.userTypeId');
    });
    it('Update user without data', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                email: 'mateusvsbrito0@gmail.com',
                password: '12nubivfvuvk',
                userTypeId: 1
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);
        
        const res = await testServer
            .put(`/users/${data.body}`)
            .send({});

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body');
    });
    it('Update non-existing User', async () => {
        const res = await testServer
            .put('/users/9999999')
            .send({
                name: 'Mateus',
                user: 'Brito',
                email: 'mateusvsbrito0@gmail.com',
                password: '12nubivfvuvk',
                userTypeId: 1
            });

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
});
