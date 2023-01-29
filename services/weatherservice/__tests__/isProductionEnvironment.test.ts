// https://stackoverflow.com/questions/48033841/test-process-env-with-jest
import isProductionEnvironment from 'utils/isProductionEnvironment';

describe('Test node environment', () => {
  const oldEnvironmentVariables = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...oldEnvironmentVariables };
  });

  afterAll(() => {
    process.env = oldEnvironmentVariables;
  });

  test('should verify that environment is in production mode', () => {
    process.env.NODE_ENV = 'production';

    expect(isProductionEnvironment()).toBe(true);
  });

  test('should verify that environment is in non-production mode', () => {
    expect(isProductionEnvironment()).toBe(false);
  });

  test('should handle undefined node environment gracefully', () => {
    if (process.env.NODE_ENV !== 'undefined') delete process.env.NODE_ENV;
    expect(isProductionEnvironment()).toBe(false);
  });
});
