import { EmployeeRole, EmployeeStatus } from '@prisma/client';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  position: string;
  role: EmployeeRole;
  status: EmployeeStatus;
  createdAt: Date;
  updatedAt: Date;
}
