import { Test, TestingModule } from '@nestjs/testing';
import { CreateAdminUserService } from '../services/user-admin.service';
import { UserRepository } from '../repository/user.repository';

describe('UserService', () => {
  let createAdminService: CreateAdminUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAdminUserService,
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    createAdminService = module.get<CreateAdminUserService>(
      CreateAdminUserService,
    );
  });

  it('should be defined', () => {
    expect(createAdminService).toBeDefined();
  });
});
