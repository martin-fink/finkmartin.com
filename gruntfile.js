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

const sass = require('node-sass');

module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('purifycss', 'Clean unnecessary CSS', function () {
        const purify = require('purify-css');
        const glob = require('glob');

        // Merge task-specific and/or target-specific options with these defaults.
        const options = this.options({write: false, info: true, minify: true});

        this.files.forEach(file => {

            const css = [];
            file.css.forEach(pattern => {
                css.push(...glob.sync(pattern));
            });

            css.forEach(cssFile => {
                const pure = purify(file.src, [cssFile], options);

                grunt.file.write(cssFile, pure);
            });
        })
    });

    grunt.initConfig({
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/fonts',
                        src: ['*'],
                        dest: './dist/fonts/',
                    },
                    {
                        expand: true,
                        cwd: 'src/img',
                        src: ['*'],
                        dest: './dist/img/',
                    },
                    {
                        expand: true,
                        cwd: 'src/static',
                        src: ['**/*'],
                        dest: './dist',
                    },
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['locales/*'],
                        dest: './dist/',
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/ionicons/dist',
                        src: ['ionicons/**/*'],
                        dest: './dist/scripts',
                    },
                ],
            },
        },
        watch: {
            statics: {
                files: ['src/static/**/*'],
                tasks: ['copy'],
            },
            styles: {
                files: ['src/styles/**/*.scss'],
                tasks: ['sass'],
            },
            scripts: {
                files: ['src/scripts/**/*.js'],
                tasks: ['uglify'],
            },
            html: {
                files: ['src/html/**/*.html'],
                tasks: ['htmlmin'],
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: [{
                    expand: true,
                    cwd: 'src/html',
                    src: ['**/*.html', '*.html'],
                    dest: 'dist',
                }],
            },
        },
        sass: {
            dist: {
                options: {
                    implementation: sass,
                    style: 'compressed',
                    sourcemap: 'none',
                },
                files: [{
                    expand: true,
                    cwd: 'src/styles/sites',
                    src: ['*.scss'],
                    dest: 'dist/styles',
                    rename: function (dest, src) {
                        return `${dest}/${src.replace(/\.scss$/, ".css")}`;
                    }
                }],
            },
        },
        purifycss: {
            dist: {
                src: ['dist/**/*.html'],
                css: ['dist/styles/*.css'],
                dest: 'dist/styles',
            },
        },
        uglify: {
            bundle: {
                options: {
                    mangle: {
                        reserved: ['JQuery'],
                    },
                    output: {
                        comments: 'some',
                    },
                },
                files: {
                    'dist/scripts/bundle.js': [
                        'node_modules/ionicons/dist/ionicons.js',
                        'src/scripts/*.js',
                    ],
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default', [
        'copy',
        'htmlmin',
        'sass',
        'purifycss',
        'uglify',
    ]);

    grunt.registerTask('dev', [
        'copy',
        'htmlmin',
        'sass',
        'uglify',
    ]);
};
