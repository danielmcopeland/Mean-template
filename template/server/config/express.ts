import * as _express from 'express';
import * as _override from 'method-override';
import * as _compress from 'compression';
import * as _logging from 'morgan';

import { Application, static as serveStatic, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import { resolve } from 'path';
import { useExpressServer } from 'routing-controllers';

import { environment } from '../util/environment.util';

import { HealthController } from '../controllers/health.controller';

class Configuration {
    public app: Application;

    constructor() {
        this.app = _express();

        this.configureMiddleware();
        this.configureRoutingControllers();

        // This route has to be last, as the SPA fallback route
        this.app.route('/*')
            .get((request: Request, response: Response, next: NextFunction) => {
                if (new RegExp('^(?!\/?api).+').test(request.path)) {
                    return response.sendFile(resolve(__dirname, '../public/index.html'));
                }

                next();
            });
    }

    private configureMiddleware = (): void => {
        this.app.use(json());
        this.app.use(_override());
        this.app.use(serveStatic(resolve(__dirname, '../public')));
        this.app.use(urlencoded({ extended: true }));
        this.app.use(environment.isProduction ? _compress() : _logging('dev'));
    }

    private configureRoutingControllers = (): void => {
        useExpressServer(this.app, {
            controllers: [HealthController],
            routePrefix: '/api/'
        });
    }
}

export const express: Configuration = new Configuration();
