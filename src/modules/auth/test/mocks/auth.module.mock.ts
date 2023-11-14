import { faker } from '@faker-js/faker';
import { CredentialsDto } from '../../dto/credentials.dto';
import { EmployeeInfo, EmployeeRole, EmployeeStatus } from '@prisma/client';
import {
  AuthRequest,
  JtwPayload,
  UserPayload,
  UserToken,
} from '../../interfaces/services.interface';

export const mockUserCredentials: CredentialsDto = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const mockPrismaFindFirst: EmployeeInfo = {
  id: faker.string.uuid(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  username: faker.internet.userName(),
  email: mockUserCredentials.email,
  password: mockUserCredentials.password,
  phone: faker.phone.number(),
  position: faker.person.jobTitle(),
  role: EmployeeRole.ADMIN,
  status: EmployeeStatus.HIRED,
  created_at: faker.date.past(),
  updated_at: faker.date.recent(),
};

export const mockSigninPayload: UserPayload = {
  id: mockPrismaFindFirst.id,
  username: mockPrismaFindFirst.username,
  role: mockPrismaFindFirst.role,
};

export const mockJwtPayload: JtwPayload = {
  sub: mockSigninPayload.id,
  username: mockSigninPayload.username,
  role: mockSigninPayload.role,
};

export const mockJwt = faker.string.alphanumeric();

export const mockAuthRequest: AuthRequest = Object.create(
  AuthRequest.prototype,
);

export const mockAccessToken: UserToken = {
  accessToken: faker.string.alphanumeric(),
};
