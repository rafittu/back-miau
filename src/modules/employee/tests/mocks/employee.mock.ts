import { faker } from '@faker-js/faker';
import { CreateEmployeeDto } from '../../dto/create-employee.dto';
import {
  EmployeeData,
  EmployeePosition,
  EmployeeRole,
  EmployeeStatus,
} from '@prisma/client';
import { ICreateEmployee } from '../../interfaces/employee.interface';
import { IAlmaUser } from '../../../../common/api/alma/interfaces/alma.interface';

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

export const MockIAlmaUser: IAlmaUser = {
  id: faker.string.uuid(),
  personal: {
    id: faker.string.uuid(),
    firstName: MockCreateEmployeeDto.firstName,
    lastName: MockCreateEmployeeDto.lastName,
    cpf: MockCreateEmployeeDto.cpf,
    socialName: MockCreateEmployeeDto.socialName,
    bornDate: new Date(MockCreateEmployeeDto.bornDate),
    motherName: MockCreateEmployeeDto.motherName,
    updatedAt: new Date(),
  },
  contact: {
    id: faker.string.uuid(),
    username: MockCreateEmployeeDto.username,
    email: MockCreateEmployeeDto.email,
    phone: MockCreateEmployeeDto.phone,
    updatedAt: new Date(),
  },
  security: {
    id: faker.string.uuid(),
    status: 'ACTIVE',
    updatedAt: new Date(),
  },
  allowedChannels: ['MIAU'] as any as Enumerator,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MockEmployeeData: EmployeeData = {
  id: faker.string.uuid(),
  alma_id: MockIAlmaUser.id,
  first_name: MockCreateEmployeeDto.firstName,
  last_name: MockCreateEmployeeDto.lastName,
  username: MockCreateEmployeeDto.username,
  email: MockCreateEmployeeDto.email,
  phone: MockCreateEmployeeDto.phone,
  position: MockCreateEmployeeDto.position,
  role: EmployeeRole.ADMIN,
  status: EmployeeStatus.IN_EXPERIENCE,
  created_at: new Date(),
  updated_at: new Date(),
};

export const MockICreateEmployee: ICreateEmployee = {
  message: 'User created successfully',
  data: {
    id: MockEmployeeData.id,
    almaId: MockEmployeeData.alma_id,
    firstName: MockEmployeeData.first_name,
    lastName: MockEmployeeData.last_name,
    username: MockEmployeeData.username,
    email: MockEmployeeData.email,
    phone: MockEmployeeData.phone,
    position: MockEmployeeData.position,
    role: MockEmployeeData.role,
    status: MockEmployeeData.status,
    createdAt: MockEmployeeData.created_at,
  },
};
