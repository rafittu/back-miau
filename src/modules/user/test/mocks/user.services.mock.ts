import { faker } from '@faker-js/faker';
import { EmployeeStatus } from '@prisma/client';
import { CreateUserDto } from '../../dto/create-user.dto';

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
