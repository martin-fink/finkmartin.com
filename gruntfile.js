module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        copy: {
            build: {
                files: [
                    // {
                    //     expand: true,
                    //     cwd: "./src/views",
                    //     src: ["**"],
                    //     dest: "./dist/views",
                    // },
                ],
            },
        },
        ts: {
            app: {
                files: [{
                    src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
                    dest: "./dist",
                }],
                options: {
                    module: "commonjs",
                    target: "es6",
                    sourceMap: false,
                    rootDir: "src",
                    minifyJs: true,
                    removeComments: true,
                },
            },
        },
        watch: {
            ts: {
                files: ["src/\*\*/\*.ts"],
                tasks: ["ts"],
            },
            views: {
                files: ["views/**/*.pug"],
                tasks: ["copy"],
            },
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/views',
                    src: ['**.ejs', '*.ejs'],
                    dest: 'dist/views'
                }]
            },
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");

    grunt.registerTask("default", [
        "copy",
        "ts",
        "htmlmin",
    ]);

};
