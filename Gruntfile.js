module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: ['source/style/*.css'],
                dest: 'temp/style/master.css'

            },

            dist: {
                src: ['source/javascript/*.js', 'source/css/*.css'],
                dest: 'temp/javascript/master.js',
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'public/style/master.min.css': ['temp/style/*.css']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'source/javascript/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    "boss": false,
                    "curly": true,
                    "eqeqeq": true,
                    "expr": true,
                    "immed": true,
                    "newcap": true,
                    "noempty": true,
                    "noarg": true,
                    "undef": true,
                    "regexp": true,
                    "browser": true,
                    "devel": true,
                    "node": true
                }
            }
        },
        uglify: {
            dist: {
                src: ['temp/javascript/master.js'],
                dest: "public/javascript/master.min.js"
            }
        },
        copy: {
            main: {
                src: ['source/*.html', 'source/images/*', 'source/plug/*', 'source/style/*.eot', 'source/style/*.svg', 'source/style/*.ttf', 'source/style/*.woff'],
                dest: 'public/',
            }
        },
        clean: ["temp", "public/source", "node_modules"]
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('test', ['uglify']);
    grunt.registerTask('cl', ['clean']);
    grunt.registerTask('default', ['jshint', 'concat', 'copy', 'cssmin']);
};