/*
 *    Copyright 2020 Martin Fink
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import {Request, Response} from 'express';

export class Server {

    public readonly app: express.Application;

    public static bootstrap(port: number): Server {
        return new Server(port);
    }

    constructor(port: number) {
        this.app = express();
        this.app.set('port', port);

        this.configure();
        this.routes();
    }

    public configure() {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');

        this.app.use(logger('dev'));

        this.app.use(bodyParser.json());

        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));

        this.app.use(methodOverride());

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });

        this.app.use(errorHandler());
    }

    public routes() {
        // add static paths
        this.app.use('/', express.static(__dirname + '/static'));
        this.app.use('/static', express.static(__dirname + '/static'));
        this.app.use('/styles', express.static(__dirname + '/styles'));
        this.app.use('/scripts', express.static(__dirname + '/scripts'));
        this.app.use('/fonts', express.static(__dirname + '/fonts'));
        this.app.use('/img', express.static(__dirname + '/img'));

        // configure user routes
        const router = express.Router();

        router.get('/', (req: Request, res: Response) => {
            res.render('index');
        });

        router.get('*', (req: Request, res: Response) => {
            res.status(404).json({error: 404, message: 'Not Found'});
        });

        this.app.use(router);
    }
}

