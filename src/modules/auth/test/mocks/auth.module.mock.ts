import { faker } from '@faker-js/faker';
import { CredentialsDto } from '../../dto/credentials.dto';
import { EmployeeInfo, EmployeeRole, EmployeeStatus } from '@prisma/client';

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

export const mockUserValidated: Partial<EmployeeInfo> = {
  id: mockPrismaFindFirst.id,
  username: mockPrismaFindFirst.username,
  role: mockPrismaFindFirst.role,
};
