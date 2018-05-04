import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './route';


/**
 * / route
 *
 * @class User
 */
export class IndexRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        router.get('/', (req: Request, res: Response, next: NextFunction) => {
            new IndexRoute('Index', []).index(req, res, next);
        });
    }

    constructor(title: string, scripts: string[]) {
        super(title, scripts);
    }

    public index(req: Request, res: Response, next: NextFunction) {
        // render template
        this.render(req, res, 'index');
    }
}
