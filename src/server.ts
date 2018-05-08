import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as moment from 'moment';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import {Request, Response} from 'express';

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

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });

        // error handling
        this.app.use(errorHandler());
    }

    public routes() {
        // add static paths
        this.app.use('/css', express.static(__dirname + '/css'));
        this.app.use('/fonts', express.static(__dirname + '/fonts'));

        // configure user routes
        const router = express.Router();

        router.get('/', (req: Request, res: Response) => {
            res.render('index', {
                age: moment().diff('1999-03-18', 'years'),
            });
        });

        router.get('*', (req: Request, res: Response) => {
            res.redirect('/');
        });

        this.app.use(router);
    }
}

