export interface UserCredentialsDto {
    email: string;
    password: string;
}

export type UserSignInDto = UserCredentialsDto;

export interface UserSignupDto extends UserCredentialsDto {
    name: string;
}
