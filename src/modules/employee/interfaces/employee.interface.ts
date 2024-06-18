import { EmployeePosition, EmployeeRole, EmployeeStatus } from '@prisma/client';

export interface ICreateEmployee {
  message: string;
  data: {
    id: string;
    almaId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    position: EmployeePosition;
    role: EmployeeRole;
    status: EmployeeStatus;
    createdAt: Date;
  };
}
