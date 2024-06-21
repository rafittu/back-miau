export interface IAlmaUser {
  id: string;
  personal: {
    id: string;
    firstName: string;
    lastName: string;
    cpf?: string;
    socialName?: string;
    bornDate: Date;
    motherName: string;
    updatedAt?: Date;
  };
  contact: {
    id: string;
    username?: string;
    email: string;
    phone: string;
    updatedAt?: Date;
  };
  security: {
    id: string;
    status: string;
    updatedAt?: Date;
  };
  allowedChannels: Enumerator;
  createdAt: Date;
  updatedAt: Date;
}
