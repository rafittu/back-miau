import { CredentialsDto } from '../dto/credentials.dto';
import { UserPayload } from './services.interface';

export interface IAuthRepository {
  validateUser(credentialsDto: CredentialsDto): Promise<UserPayload>;
}
