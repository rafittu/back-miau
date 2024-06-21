import { Test, TestingModule } from '@nestjs/testing';
import { AlmaService } from '../alma.service';

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
});
