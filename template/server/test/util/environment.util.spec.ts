import { environment } from '../../util/environment.util';
import { ENV_VAR } from '../../enums/environment-variables';
import { ENV_TYPE } from '../../enums/environment-types';

describe('Environment Utility Tests', () => {
    beforeEach(() => {
        process.env[ENV_VAR.ENV] = ENV_TYPE.TEST;
    });

    describe('variable', () => {
        it('should return the value of a defined environment variable', () => {
            const result: string = environment.variable(ENV_VAR.ENV);

            expect(result).toEqual(ENV_TYPE.TEST);
        });

        it('should return undefined for an undefined environment variable', () => {
            const property = 'XxXx_THIS_VARIABLE_SHOULD_NEVER_EXIST_xXxX';

            delete process.env[property];

            const result: string = environment.variable(property);

            expect(result).toEqual(undefined);
        });
    });

    describe('isDevelopment', () => {
        beforeEach(() => {
            process.env[ENV_VAR.ENV] = ENV_TYPE.DEV;
        });

        afterEach(() => {
            process.env[ENV_VAR.ENV] = ENV_TYPE.TEST;
        });

        it(`should return true if ${ENV_VAR.ENV} is set to ${ENV_TYPE.DEV}`, () => {
            expect(environment.isDevelopment).toBeTruthy();
        });

        it(`should return false if ${ENV_VAR.ENV} is NOT set to ${ENV_TYPE.DEV}`, () => {
            process.env[ENV_VAR.ENV] = ENV_TYPE.TEST;

            expect(environment.isDevelopment).toBeFalsy();
        });
    });

    describe('isTest', () => {
        beforeEach(() => {
            process.env[ENV_VAR.ENV] = ENV_TYPE.TEST;
        });

        afterEach(() => {
            process.env[ENV_VAR.ENV] = ENV_TYPE.TEST;
        });

        it(`should return true if ${ENV_VAR.ENV} is set to ${ENV_TYPE.TEST}`, () => {
            expect(environment.isTest).toBeTruthy();
        });

        it(`should return false if ${ENV_VAR.ENV} is NOT set to ${ENV_TYPE.TEST}`, () => {
            process.env[ENV_VAR.ENV] = ENV_TYPE.DEV;

            expect(environment.isTest).toBeFalsy();
        });
    });

    describe('isProduction', () => {
        beforeEach(() => {
            process.env[ENV_VAR.ENV] = ENV_TYPE.PROD;
        });

        afterEach(() => {
            process.env[ENV_VAR.ENV] = ENV_TYPE.TEST;
        });

        it(`should return true if ${ENV_VAR.ENV} is set to ${ENV_TYPE.PROD}`, () => {
            expect(environment.isProduction).toBeTruthy();
        });

        it(`should return false if ${ENV_VAR.ENV} is NOT set to ${ENV_TYPE.PROD}`, () => {
            process.env[ENV_VAR.ENV] = ENV_TYPE.DEV;

            expect(environment.isProduction).toBeFalsy();
        });
    });
});
