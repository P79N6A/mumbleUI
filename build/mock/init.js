var Mock = require('mockjs');
var faker = require('faker');
var path = require('path');
var fs = require('fs');

var logger = require('morgan');
var multer = require('multer');
var bodyParser = require('body-parser');
var onFinished = require('on-finished');

var util = require('./util');
var cgiMock = require('./cgiMock');
var log = require('./log');

var main = {

    init: function (app, argv, cwd) {
        this.app = app;
        this.argv = argv;
        this.cwd = cwd;

        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));

        var upload = multer()
        app.post('/upload', upload.single('upFiles'), function (req, res, next) {
            // req.file 是 `avatar` 文件的信息
            // req.body 将具有文本域数据，如果存在的话
            console.log(req.file)
            console.log(req.body)
            res.send(JSON.stringify({
                code: '0',
                msg: 'this is message',
                result: {
                    url: 'http://h.test-adm.weoa.com/s/fes-2.0/build/framework.d826823.jpg'
                }

            }))
        })

        this.customRoute();
        this.defaultRoute();
    },

    customRoute: function () {
        var argv = this.argv;
        var defaultCgiMockFile = '';
        var home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
        defaultCgiMockFile = path.join(process.cwd(), '/mock.js');

        var cgiMockFile;
        if (argv) {
            if (argv.f) {
                if (process.platform === 'win32') {
                    cgiMockFile = path.resolve(this.cwd, this.argv.f);
                } else {
                    if (argv.f[0] === '~') {
                        cgiMockFile = path.resolve(home, argv.f.replace(/^~\//, ''));
                    } else {
                        cgiMockFile = path.resolve(this.cwd, this.argv.f);
                    }
                }
            } else {
                cgiMockFile = defaultCgiMockFile;
            }
        } else {
            cgiMockFile = defaultCgiMockFile;
        }
        global.cgiMockFilePath = path.resolve(cgiMockFile, '..');

        var loadRouteConfig = function () {
            util.cleanCache(cgiMockFile);
            try {
                if (!fs.existsSync(cgiMockFile)) {
                    log.error('[WARN] 不存在mock.js文件');
                } else if (util.isFunction(require(cgiMockFile))) {
                    global.router.stack = [];
                    require(cgiMockFile)(cgiMock, Mock, faker);
                    log.message('[SUCCESS] mock.js 加载成功')
                } else {
                    log.error('[ERROR] mock.js cannot be ' + typeof (require(cgiMockFile)))
                }
            } catch (e) {
                log.error('[ERROR] mock.js 有误，请检查');
                log.error(JSON.stringify(e));
            }
        }

        loadRouteConfig();
        this.app.use(cgiMock.prefix, function (req, res, next) {
            // var mockContent = require(cgiMockFile);
            onFinished(res, function (err, res) {
                // console.log(mockContent.toString());
                loadRouteConfig();
            })
            global.router(req, res, next);
        });

        util.watchFile(cgiMockFile, function () {
            log.message('[INFO] mock/app.js 发生变化');
            loadRouteConfig();
            log.message('[SUCCESS] mock/app.js UPDATED!');
        });
    },

    defaultRoute: function () {
        var app = this.app;

        setTimeout(function () {
            // app.use(function (req, res, next) {
            //     var err = new Error('Not Found');
            //     err.status = 404;
            //     next(err);
            // });
            app.use(function (err, req, res, next) {
                res.json({
                    status: err.status || 500,
                    message: err.message,
                    err: err
                });
            });
        });
    }
};

module.exports = main.init.bind(main);