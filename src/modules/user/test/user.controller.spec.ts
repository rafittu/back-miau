import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { CreateAdminUserService } from '../services/user-admin.service';
import { mockPrismaEmployee } from './mocks/user.controller.mock';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateAdminUserService,
          useValue: {
            execute: jest.fn().mockResolvedValue(mockPrismaEmployee),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
