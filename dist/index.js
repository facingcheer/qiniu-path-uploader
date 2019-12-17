'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

var libPath = process.env.QINIU_COV ? './lib-cov' : './qiniu';

var qiniu = {
    auth: {
        digest: commonjsRequire()
    },
    cdn: commonjsRequire(),
    form_up: commonjsRequire(),
    resume_up: commonjsRequire(),
    rs: commonjsRequire(),
    fop: commonjsRequire(),
    conf: commonjsRequire(),
    rpc: commonjsRequire(),
    util: commonjsRequire(),
    zone: commonjsRequire(),
    app: commonjsRequire(),
    room: commonjsRequire(),
    Credentials: commonjsRequire()
};

var QiniuUploader =
/*#__PURE__*/
function () {
  function QiniuUploader(accessKey, secretKey, bucket) {
    _classCallCheck(this, QiniuUploader);

    this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    this.bucket = bucket;
    this.config = new qiniu.conf.Config();
    this.formUploader = new qiniu.form_up.FormUploader(this.config);
    this.putExtra = new qiniu.form_up.PutExtra();
  }

  _createClass(QiniuUploader, [{
    key: "upload",
    value: function upload(path) {
      var _this = this;

      var files;
      return _regeneratorRuntime.async(function upload$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _regeneratorRuntime.awrap(readFiles(path));

            case 2:
              files = _context2.sent;
              files.forEach(function _callee(_ref) {
                var name, path, options, res;
                return _regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        name = _ref.name, path = _ref.path;
                        options = {
                          scope: _this.bucket + ":" + name,
                          returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
                          expires: 7200
                        };
                        _this.putPolicy = new qiniu.rs.PutPolicy(options);
                        _this.uploadToken = _this.putPolicy.uploadToken(_this.mac);
                        _context.next = 6;
                        return _regeneratorRuntime.awrap(_this.putFiles(name, path));

                      case 6:
                        res = _context.sent;
                        console.log(res);

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              });

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "putFiles",
    value: function putFiles(name, path) {
      var _this2 = this;

      return _regeneratorRuntime.async(function putFiles$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", new Promise(function (resolve, reject) {
                _this2.formUploader.putFile(_this2.uploadToken, name, path, _this2.putExtra, function (respErr, respBody, respInfo) {
                  if (respErr) {
                    reject(respErr);
                  }

                  if (respInfo.statusCode == 200) {
                    resolve(respBody);
                  } else {
                    resolve(respBody);
                  }
                });
              }));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);

  return QiniuUploader;
}();

function readFiles(p) {
  var fileList;
  return _regeneratorRuntime.async(function readFiles$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          dirname = p;
          fileList = [];
          return _context4.abrupt("return", new Promise(function (resolve, reject) {
            fs.readdir(dirname, function (err, filenames) {
              if (err) {
                reject(err);
                return;
              }

              filenames.forEach(function (filename) {
                var filePath = path.resolve(dirname, filename);
                var stats = fs.statSync(filePath);
                if (stats.isFile()) fileList.push({
                  name: filename,
                  path: filePath
                });
              });
              resolve(fileList);
            });
          }));

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
}

var src = QiniuUploader;

module.exports = src;
