import { faker } from '@faker-js/faker';
import { CreateEmployeeDto } from '../../dto/create-employee.dto';
import { EmployeePosition } from '@prisma/client';

export const MockCreateEmployeeDto: CreateEmployeeDto = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  socialName: faker.person.fullName(),
  cpf: '81441157085',
  bornDate: faker.date.birthdate().toISOString().split('T')[0],
  motherName: faker.person.fullName({ sex: 'female' }),
  phone: faker.phone.number(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'faker.internet.password()',
  passwordConfirmation: 'faker.internet.password()',
  position: EmployeePosition.MANAGEMENT,
};
