import { Server, createServer } from 'http';
import { AddressInfo } from 'net';

import { express } from './express';

import { environment } from '../util/environment.util';
import { ENV_VAR } from '../enums/environment-variables';

class Configuration {
    private _server: Server;
    private _port: string;

    constructor() {
        const port = '3000';

        this._port = environment.variable(ENV_VAR.PORT) || port;

        this._server = createServer(express.app);
        this._server.on('listening', () =>
            console.log(`Server listening on port ${(this._server.address() as AddressInfo).port}`));
    }

    public start = (): void => {
        this._server.listen(this._port);
    }
}

export const server: Configuration = new Configuration();
