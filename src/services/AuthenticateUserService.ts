import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new Error('Invalid email/password');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid email/password');
    }

    const token = sign(
      {
        email: user.email,
      },
      '06de5b4fe24b14d67b1a53a7d5f4f7cb',
      { subject: user.id, expiresIn: '1d' }
    );

    return token;
  }
}

export { AuthenticateUserService };
