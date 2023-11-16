import { faker } from '@faker-js/faker';
import { EmployeeInfo, EmployeeRole, EmployeeStatus } from '@prisma/client';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../interfaces/user.interface';

export const mockCreateUserBody: CreateUserDto = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  username: faker.internet.userName(),
  phone: faker.phone.number(),
  email: faker.internet.email(),
  password: 'validPassword',
  passwordConfirmation: 'validPassword',
  position: faker.person.jobTitle(),
  status: EmployeeStatus.IN_EXPERIENCE,
  signupToken: faker.string.uuid(),
};

export const mockPrismaEmployee: EmployeeInfo = {
  id: faker.string.uuid(),
  first_name: mockCreateUserBody.firstName,
  last_name: mockCreateUserBody.lastName,
  username: mockCreateUserBody.username,
  email: mockCreateUserBody.password,
  password: mockCreateUserBody.password,
  phone: mockCreateUserBody.phone,
  position: mockCreateUserBody.position,
  role: EmployeeRole.ADMIN,
  status: mockCreateUserBody.status,
  created_at: faker.date.past(),
  updated_at: faker.date.recent(),
};

export const mockUser: User = {
  id: faker.string.uuid(),
  firstName: mockCreateUserBody.firstName,
  lastName: mockCreateUserBody.lastName,
  username: mockCreateUserBody.username,
  email: mockCreateUserBody.password,
  phone: mockCreateUserBody.phone,
  position: mockCreateUserBody.position,
  role: EmployeeRole.ADMIN,
  status: mockCreateUserBody.status,
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
};
