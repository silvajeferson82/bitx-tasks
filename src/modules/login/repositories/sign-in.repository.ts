// import { SignInEntity } from '../entity/sign-in.entity';
import { UserEntity } from '../../users/entities/user.entity';

export abstract class ISignInRepository {
  abstract findByUsername(username: string): Promise<UserEntity>;
  // abstract signIn(username: string, password: string): Promise<SignInEntity>;
}
