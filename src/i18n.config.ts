/*
 *    Copyright 2018 Martin Fink
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

import * as i18n from 'i18n';
import * as express from 'express';

export function configureI18n(app: express.Application) {
    i18n.configure({
        locales: ['en', 'de'],
        defaultLocale: 'en',
        queryParameter: 'lang',
        directory: __dirname + '/locales',
        api: {
            '__': 'translate',
            '__n': 'translateN',
        },
    });

    app.use((req, res, next) => {

        i18n.init(req, res);
        res.locals['__'] = i18n.__;
        res.locals['__n'] = i18n.__n;

        return next();
    });
}
