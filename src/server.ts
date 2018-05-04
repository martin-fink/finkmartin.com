import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import {IndexRoute} from './routes';

export class Server {

    public readonly app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();

        this.configure();
        this.routes();
        this.api();
    }

    public api() {
        // empty for now
    }

    public configure() {
        // add static paths
        this.app.use(express.static(path.join(__dirname, 'public')));

        // configure pug
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');

        // use logger middlware
        this.app.use(logger('dev'));

        // use json form parser middlware
        this.app.use(bodyParser.json());

        // use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));

        this.app.use(cookieParser('R5MWNzs^-8saq56C'));

        this.app.use(methodOverride());

        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        // error handling
        this.app.use(errorHandler());
    }

    public routes() {
        const router = express.Router();

        IndexRoute.create(router);

        this.app.use(router);
    }
}
