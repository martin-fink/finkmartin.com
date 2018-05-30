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

    grunt.registerMultiTask('purifycss', 'Clean unnecessary CSS', function () {
        const purify = require('purify-css');
        const glob = require('glob');

        // Merge task-specific and/or target-specific options with these defaults.
        const options = this.options({write: false, info: true});

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
                        cwd: 'node_modules/ionicons/dist/fonts',
                        src: ['*'],
                        dest: './dist/fonts/',
                    },
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['static/**/*'],
                        dest: './dist/',
                    },
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['locales/*'],
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
                files: ['src/**/*.ts'],
                tasks: ['ts'],
            },
            statics: {
                files: ['src/locales/**/*', 'src/static/**/*'],
                tasks: ['copy'],
            },
            styles: {
                files: ['src/styles/**/*.scss'],
                tasks: ['sass'],
            },
            views: {
                files: ['src/views/**/*.ejs'],
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
                src: ['dist/views/**/*.ejs'],
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
                        'node_modules/jquery/dist/jquery.js',
                        'src/scripts/*.js',
                    ],
                },
            },
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist/static/images',
                    src: ['**/*.{jpg,jpeg,png}'],
                    dest: 'dist/static/images',
                }],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', [
        'copy',
        'ts',
        'htmlmin',
        'sass',
        'purifycss',
        'uglify',
        'imagemin',
    ]);

    grunt.registerTask('dev', [
        'copy',
        'ts',
        'htmlmin',
        'sass',
        'uglify',
    ]);
};
