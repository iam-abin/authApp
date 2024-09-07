import request from 'supertest';
import { app } from '../../app';

describe('/api/login', () => {
    it('fails when an email that does not exist is supplied', async () => {
        await request(app).post('/api/login').send({ email: 'abin@gmail.com', password: 'abin' }).expect(400);
    });

    it('fails when an email that does not exist is supplied', async () => {
        await request(app).post('/api/login').send({ email: 'dskjkd', password: 'password' }).expect(400);
    });
});

describe('/signup', () => {
    it('returns a 400 with an invalid email', async () => {
        return request(app).post('/api/signup').send({ email: 'dskjkd', password: 'password' }).expect(400);
    });

    it('returns a 400 invalid password (length lessthan 4)', async () => {
        return request(app)
            .post('/api/signup')
            .send({ name: 'user', email: 'user@gmail.com', password: 'usr' })
            .expect(400);
    });

    // to write 2 seperate request inside 1 handler use await (to wait the second one unti first one is finished)
    it('returns a 400 with missing name, email or password', async () => {
        await request(app).post('/api/signup').send({ email: 'test@gmail.com' }).expect(400);

        await request(app).post('/api/signup').send({ password: 'abin1' }).expect(400);

        await request(app).post('/api/signup').send({ name: 'abin1' }).expect(400);
    });

    it('returns a 400 with missing name and email and password', async () => {
        return request(app).post('/api/signup').send({}).expect(400);
    });

    it('returns a 201 for successful user creation', async () => {
        return request(app)
            .post('/api/signup')
            .send({ name: 'testabin', email: 'testabin@gmail.com', password: 'password' })
            .expect(201);
    });
});

// describe('/api/profile', () => {
//     it('fails when an email that does not exist is supplied', async () => {
//         await request(app).post('/api/profile').send({ email: 'abin@gmail.com', password: 'abin' }).expect(400);
//     });

//     it('fails when an email that does not exist is supplied', async () => {
//         await request(app).post('/api/profile').send({ email: 'abin@gmail.com', password: 'abin' }).expect(400);
//     });
// });
