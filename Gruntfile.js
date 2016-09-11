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
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [
                    {
                        expand: true,
                        src: ['source/images/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                        dest: 'dist/images/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                    }
                    ]
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
        clean: ["temp", "source/source", "node_modules"]
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('test', ['uglify']);
    grunt.registerTask('cl', ['clean']);
    grunt.registerTask('default', ['jshint', 'concat', 'copy', 'cssmin']);
};