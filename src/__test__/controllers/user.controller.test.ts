import request from 'supertest';
import { app } from '../../app'; // Import your app here
import { OtpService, UserService } from '../../services';
import { container } from 'tsyringe';
import { IUser } from '../../database/model';
import { UserSignupDto, UserSignInDto } from '../../dto/auth.dto';
import { createJwtAccessToken } from '../../utils';

// Mock the required modules
jest.mock('../../services');

const signin = (): string => {
    const payload = {
        userId: mockUser._id as string,
        name: mockUser.name,
        email: mockUser.email,
    };

    // Create the JWT!
    const token = createJwtAccessToken(payload);

    return `Bearer ${token}`;
};

const mockUser: IUser = {
    _id: '1',
    name: 'test',
    email: 'test@example.com',
    password: 'test',
} as IUser;

const mockSignUpDto: UserSignupDto = { name: 'test', email: 'test@example.com', password: 'test' };
const mockSignInDto: UserSignInDto = { email: 'test@example.com', password: 'test' };
const mockAccessToken = 'mocked-jwt-token';

const mockedUserService = container.resolve(UserService) as jest.Mocked<UserService>;

describe('/api/login', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('should return 400 if email is not provided', async () => {
        await request(app).post('/api/login').send({ password: 'test' }).expect(400);
    });

    it('should return 400 if password is not provided', async () => {
        await request(app).post('/api/login').send({ email: 'test@gmail.com' }).expect(400);
    });

    it('should return 400 if email is invalid', async () => {
        await request(app).post('/api/login').send({ email: 'testgmail.com', password: 'test' }).expect(400);
    });

    it('should signin a user and return 200', async () => {
        mockedUserService.signIn.mockResolvedValue({
            user: mockUser,
            accessToken: mockAccessToken,
        });

        const response = await request(app).post('/api/login').send(mockSignInDto).expect(200);
    });
});

describe('/api/signup', () => {
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

describe('/api/verify-otp', () => {
    it('should return 400 if otp is incorrect', async () => {
        await request(app)
            .post('/api/verify-otp')
            .send({ userId: '66c9c5042f4a252c6e94e8f3', otp: '3456' })
            .expect(400);
    });

    it('should return 400 if userId is invalid mongodId', async () => {
        await request(app).post('/api/verify-otp').send({ userId: 'oiuahvuie', otp: '345645' }).expect(400);
    });

    it('should return 200 if otp and userId are correct', async () => {
        await request(app)
            .post('/api/verify-otp')
            .send({ userId: '66c9c5042f4a252c6e94e8f3', otp: '345645' })
            .expect(200);
    });
});

describe('/api/resend-otp', () => {
    it('should return 400 if userId is invalid MongoDB ObjectID', async () => {
        await request(app)
            .post('/api/resend-otp')
            .send({ userId: 'invalidUserId' }) // Invalid userId
            .expect(400); // Assert response status code is 400
    });
});

describe('/api/profile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 with user data if user is found', async () => {
        const token = signin();
        mockedUserService.getProfile.mockResolvedValue(mockUser);

        const response = await request(app).get('/api/profile').set('Authorization', token).expect(200);
    });

    it('returns a 401 if not authorized', async () => {
        await request(app).get('/api/profile').expect(401);
    });
});
