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

'use strict';

const path = require("path");

const SitemapGenerator = require('sitemap-generator');

const generator = SitemapGenerator('http://localhost:10000', {
    stripQuerystring: false,
    filepath: path.join(process.cwd(), 'src/static/sitemap.xml'),
});

// register event listeners
generator.on('done', () => {
    console.log("Done")
});

generator.on('add', (url) => {
    console.log("Added '" + url + "' to sitemap")
});

generator.on('error', (error) => {
    console.log(error);
});

generator.on('ignore', (url) => {
    console.log("Ignored url '" + url + "'")
});

console.log("Starting crawler");

generator.start();
