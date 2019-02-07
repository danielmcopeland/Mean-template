import * as _mongoose from 'mongoose';

import { Mongoose } from 'mongoose';

import { environment } from '../util/environment.util';
import { ENV_VAR } from '../enums/environment-variables';

class Configuration {
    private _mongoose: Mongoose;

    constructor() {
        this._mongoose = _mongoose;
        this._mongoose.Promise = global.Promise;
    }

    public connect = (): Promise<Mongoose> => this._mongoose.connect(environment.variable(ENV_VAR.CONN_STRING));
}

export const mongoose: Configuration = new Configuration();
