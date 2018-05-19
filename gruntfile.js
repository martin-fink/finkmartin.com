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
