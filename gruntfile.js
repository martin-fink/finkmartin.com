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

module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/ionicons/dist/fonts',
                        src: ['*'],
                        dest: './dist/fonts/',
                    },
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['static/*'],
                        dest: './dist/',
                    },
                ],
            },
        },
        ts: {
            app: {
                files: [{
                    src: ['src/\*\*/\*.ts', '!src/.baseDir.ts'],
                    dest: './dist',
                }],
                options: {
                    module: 'commonjs',
                    target: 'es6',
                    sourceMap: false,
                    rootDir: 'src',
                    minifyJs: true,
                    removeComments: true,
                },
            },
        },
        watch: {
            ts: {
                files: ['src/\*\*/\*.ts'],
                tasks: ['ts'],
            },
            views: {
                files: ['views/**/*.pug'],
                tasks: ['copy'],
            },
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: [{
                    expand: true,
                    cwd: 'src/views',
                    src: ['**/*.ejs', '*.ejs'],
                    dest: 'dist/views',
                }],
            },
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none',
                },
                files: {
                    'dist/styles/main.css': 'src/styles/main.scss',
                },
            },
        },
        purifycss: {
            options: {
                minify: true,
            },
            target: {
                src: ['dist/views/**/*.ejs'],
                css: ['dist/styles/main.css'],
                dest: 'dist/styles/main.css',
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
                        'node_modules/jquery/dist/jquery.js',
                        'src/scripts/*.js',
                    ],
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-purifycss');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

    grunt.registerTask('default', [
        'copy',
        'ts',
        'htmlmin',
        'sass',
        'purifycss',
        'uglify',
    ]);
};
