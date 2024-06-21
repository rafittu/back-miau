import { Test, TestingModule } from '@nestjs/testing';
import { AlmaService } from '../alma.service';
import axios from 'axios';
import { MockCreateEmployeeDto } from '../../../../modules/employee/tests/mocks/employee.mock';
import { AppError } from '../../../app_error/errors/Error';

jest.mock('axios');

describe('ALMA external api', () => {
  let almaService: AlmaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlmaService],
    }).compile();

    almaService = module.get<AlmaService>(AlmaService);
  });

  it('should be defined', () => {
    expect(almaService).toBeDefined();
  });

  describe('handle alma api requests', () => {
    it('should make a post request and return response data', async () => {
      const mockCreateUserAxiosResponse = {
        data: { fakeUser: 'user data' },
      };

      (
        axios.post as jest.MockedFunction<typeof axios.post>
      ).mockResolvedValueOnce(mockCreateUserAxiosResponse);

      const path = 'example.com/api';

      const result = await almaService['almaRequest'](
        path,
        'post',
        undefined,
        MockCreateEmployeeDto,
      );

      expect(axios.post).toHaveBeenCalledWith(
        path,
        MockCreateEmployeeDto,
        expect.objectContaining({
          headers: {
            Authorization: `Bearer ${undefined}`,
          },
        }),
      );
      expect(result).toEqual(mockCreateUserAxiosResponse.data);
    });

    it('should throw an AppError if request fails', async () => {
      (
        axios.get as jest.MockedFunction<typeof axios.get>
      ).mockRejectedValueOnce(AppError);

      const path = 'example.com/api';

      try {
        await almaService['almaRequest'](
          path,
          'post',
          undefined,
          MockCreateEmployeeDto,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(500);
        expect(error.message).toBe('Internal server error');
      }
    });

    it('should create an user', async () => {
      process.env.ALMA_POST_USER_PATH = 'url_example';

      jest.spyOn(almaService as any, 'almaRequest').mockResolvedValueOnce('');
      jest.spyOn(almaService, 'createUser');

      await almaService.createUser(MockCreateEmployeeDto);

      delete process.env.ALMA_POST_USER_PATH;

      expect(almaService.createUser).toHaveBeenCalledTimes(1);
    });
  });
});
