import axios from 'axios';
import { AppError } from '../errors/Error';
import { CreateEmployeeDto } from '../../modules/employee/dto/create-employee.dto';

export class AlmaService {
  constructor() {}

  private async almaRequest<T>(
    path: string,
    method: 'post' | 'get' | 'patch',
    accessToken?: string,
    body?: object,
  ): Promise<T> {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response =
        method === 'post'
          ? await axios.post(path, body, config)
          : method === 'patch'
            ? await axios.patch(path, body, config)
            : await axios.get(path, config);

      return response.data;
    } catch (error) {
      const { status, code, message } = error.response?.data?.error || {};
      throw new AppError(status, code, message);
    }
  }

  async createUser(data: CreateEmployeeDto) {
    const PATH = process.env.ALMA_POST_USER_PATH || '';
    const METHOD = 'post';

    delete data.position;

    const body = {
      ...data,
      originChannel: 'MIAU',
    };

    return this.almaRequest(PATH, METHOD, null, body);
  }
}
