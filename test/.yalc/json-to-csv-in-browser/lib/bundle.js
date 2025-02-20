(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonArray = void 0;
var JsonArray = /** @class */ (function () {
    function JsonArray(JsonArray) {
        this._JsonArray = JsonArray;
        this.setHeaders();
    }
    JsonArray.prototype.convertToCSVstring = function () {
        var _this = this;
        var str = this._headers.toString();
        this._JsonArray.forEach(function (arr) {
            var line = "";
            _this._headers.forEach(function (head) {
                var val = arr[head] == undefined ? "" : arr[head];
                if (typeof val === 'string')
                    val = val ? val.replace(/"/g, '""') : val;
                if (line.length) {
                    line = "".concat(line, ",\"").concat(val, "\"");
                }
                else {
                    line = "\"".concat(val === undefined ? "" : val, "\"");
                }
            });
            str = str + "\n" + line;
        });
        return str;
    };
    JsonArray.prototype.setHeaders = function () {
        this._headers = Object.keys(this._JsonArray[0]).map(function (key) { return key; });
    };
    return JsonArray;
}());
exports.JsonArray = JsonArray;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = void 0;
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
exports.download = download;
// Start file download.
//   download("hello.txt","This is the content of my file :)");

},{}],3:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvTojson = exports.download = exports.JsonArray = void 0;
var JsonArray_1 = require("./download/JsonArray");
Object.defineProperty(exports, "JsonArray", { enumerable: true, get: function () { return JsonArray_1.JsonArray; } });
var download_1 = require("./download/download");
Object.defineProperty(exports, "download", { enumerable: true, get: function () { return download_1.download; } });
var csv_1 = __importDefault(require("./upload/csv"));
exports.CsvTojson = csv_1.default;

},{"./download/JsonArray":1,"./download/download":2,"./upload/csv":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CsvTojson = /** @class */ (function () {
    function CsvTojson(_blob) {
        var _this = this;
        this.fileText = "";
        this.headers = [];
        this._blob = _blob;
        var fileredear = new FileReader();
        fileredear.onload = function (e) {
            var _a;
            _this.fileText = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        fileredear.readAsText(this._blob);
        this.setHeaders();
    }
    CsvTojson.prototype.getheaders = function () {
        return this.headers;
    };
    CsvTojson.prototype.setHeaders = function () {
        var ret = [];
        var firstLineIndex = this.fileText.search("\n");
        var headerLine = this.fileText.substring(0, firstLineIndex);
        this.headers = headerLine.split(",");
    };
    return CsvTojson;
}());
exports.default = CsvTojson;

},{}]},{},[3]);
