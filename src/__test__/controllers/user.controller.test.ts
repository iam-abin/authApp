import request from 'supertest';
import { app } from '../../app'; // Import your app here
import { UserService } from '../../services';
import { container } from 'tsyringe';
import { IUser } from '../../database/model';
import { UserSignupDto, UserSignInDto } from '../../dto/auth.dto';

jest.mock('../../services');

const mockUser: IUser = {
    _id: '1',
    name: 'test',
    email: 'test@example.com',
    password: 'test',
} as IUser;

const mockSignUpDto: UserSignupDto = { name: 'test', email: 'test@example.com', password: 'test' };
const mockSignInDto: UserSignInDto = { email: 'test@example.com', password: 'test' };

const mockedUserService = container.resolve(UserService) as jest.Mocked<UserService>;

describe('UserController /api/login', () => {
    it('should return 400 if email is not provided', async () => {
        await request(app).post('/api/login').send({ password: 'test' }).expect(400);
    });

    it('should return 400 if password is not provided', async () => {
        await request(app).post('/api/login').send({ email: 'test@gmail.com' }).expect(400);
    });

    it('should return 400 if email is invalid', async () => {
        await request(app).post('/api/login').send({ email: 'testgmail.com', password: 'test' }).expect(400);
    });

    it('should signin up a user and return 200', async () => {
        mockedUserService.signUp.mockResolvedValue(mockUser);
        await request(app).post('/api/login').send(mockSignInDto).expect(200);
    });
});

describe('UserController /api/signup', () => {
    it('should return 400 if name is not provided', async () => {
        await request(app)
            .post('/api/signup')
            .send({ email: 'test@gmail.com', password: 'test' })
            .expect(400);
    });

    it('should return 400 if email is not provided', async () => {
        await request(app).post('/api/signup').send({ name: 'test', password: 'test' }).expect(400);
    });

    it('should return 400 if password is not provided', async () => {
        await request(app).post('/api/signup').send({ name: 'test', email: 'test@gmail.com' }).expect(400);
    });

    it('should return 400 if password is invalid', async () => {
        await request(app)
            .post('/api/signup')
            .send({ name: 'abin', email: 'test@gmail.com', password: 'te' })
            .expect(400);
    });

    it('should return 400 if email is invalid', async () => {
        await request(app)
            .post('/api/signup')
            .send({ name: 'abin', email: 'testgmail.com', password: 'test' })
            .expect(400);
    });

    it('should sign up a user and return 201', async () => {
        mockedUserService.signUp.mockResolvedValue(mockUser);
        await request(app).post('/api/signup').send(mockSignUpDto).expect(201);
    });
});
