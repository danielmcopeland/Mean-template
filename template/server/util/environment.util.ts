import { ENV_TYPE } from '../enums/environment-types';
import { ENV_VAR } from '../enums/environment-variables';

class Utility {
    public variable = (property: string): string => process.env[property];

    public get isDevelopment(): boolean { return this.variable(ENV_VAR.ENV) === ENV_TYPE.DEV; }
    public get isTest(): boolean { return this.variable(ENV_VAR.ENV) === ENV_TYPE.TEST; }
    public get isProduction(): boolean { return this.variable(ENV_VAR.ENV) === ENV_TYPE.PROD; }
}

export const environment: Utility = new Utility();
