import { faker } from '@faker-js/faker';
import { CreateEmployeeDto } from '../../dto/create-employee.dto';
import { EmployeePosition, EmployeeRole, EmployeeStatus } from '@prisma/client';
import { ICreateEmployee } from '../../interfaces/employee.interface';

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

export const MockICreateEmployee: ICreateEmployee = {
  message: 'User created successfully',
  data: {
    id: faker.string.uuid(),
    almaId: faker.string.uuid(),
    firstName: MockCreateEmployeeDto.firstName,
    lastName: MockCreateEmployeeDto.lastName,
    username: MockCreateEmployeeDto.username,
    email: MockCreateEmployeeDto.email,
    phone: MockCreateEmployeeDto.phone,
    position: MockCreateEmployeeDto.position,
    role: EmployeeRole.ADMIN,
    status: EmployeeStatus.IN_EXPERIENCE,
    createdAt: new Date(),
  },
};
