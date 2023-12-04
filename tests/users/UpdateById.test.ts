import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Users - UpdateById', () => {
    it('Update existing User', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                password: '12nubivfvuvk'
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);
        
        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: 'Mateus',
                user: 'Brito',
                password: '12nubivfvuvk'
            });

        expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Update User with name less than three characters', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                password: '12nubivfvuvk'
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);
        
        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: 'Ma',
                user: 'Brito',
                password: '12nubivfvuvk'
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
                password: '12nubivfvuvk'
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);

        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: null,
                user: 'Brito',
                password: '12nubivfvuvk'
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
                password: '12nubivfvuvk'
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);

        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: 'Mateus',
                user: 'Br',
                password: '12nubivfvuvk'
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
                password: '12nubivfvuvk'
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);
        
        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: 'Mateus',
                user: null,
                password: '12nubivfvuvk'
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
                password: '12nubivfvuvk'
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);
        
        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: 'Mateus',
                user: 'Brito',
                password: '12nub'
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
                password: '12nubivfvuvk'
            });

        expect(data.statusCode).toEqual(StatusCodes.CREATED);
        
        const res = await testServer
            .put(`/users/${data.body}`)
            .send({
                name: 'Mateus',
                user: 'Brito',
                password: null
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.password');
    });
    it('Update user without data', async () => {
        const data = await testServer
            .post('/users')
            .send({
                name: 'Mateus Vicente Santos Brito',
                user: 'Brito',
                password: '12nubivfvuvk'
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
                password: '12nubivfvuvk'
            });

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
});
