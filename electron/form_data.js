var CombinedStream = require('combined-stream');
var util = require('util');
var path = require('path');
var http = require('http');
var https = require('https');
var parseUrl = require('url').parse;
var fs = require('fs');
var mime = require('mime-types');
var asynckit = require('asynckit');
//var populate = require('./populate.js');

// Public API
module.exports = FormData;

// make it a Stream
util.inherits(FormData, CombinedStream);

/**
 * Create readable "multipart/form-data" streams.
 * Can be used to submit forms
 * and file uploads to other web applications.
 *
 * @constructor
 */
function FormData(request) {
        this._request = request;
        if (!(this instanceof FormData)) {
                return new FormData();
        }

        this._overheadLength = 0;
        this._valueLength = 0;
        this._valuesToMeasure = [];
        this._values = [];
        CombinedStream.call(this);
}

FormData.LINE_BREAK = '\r\n';
FormData.DEFAULT_CONTENT_TYPE = 'application/octet-stream';

FormData.prototype.append = function (field, value, options) {

        options = options || {};

        // allow filename as single option
        if (typeof options == 'string') {
                options = { filename: options };
        }

        var append = CombinedStream.prototype.append.bind(this);


        // all that streamy business can't handle numbers
        if (typeof value == 'number') {
                value = '' + value;
        }

        // https://github.com/felixge/node-form-data/issues/38
        if (util.isArray(value)) {
                // Please convert your array into string
                // the way web server expects it
                this._error(new Error('Arrays are not supported.'));
                return;
        }

        this._values.push({
                field: field,
                value: value,
                options: options,
        });
};

FormData.prototype.send = function () {

        for (let val of this._values) {
                var header = this._multiPartHeader(val.field, val.value, val.options);
                this._request.write(header);
                this._request.write(val.value);
                this._request.write(this._multiPartFooter());
        }
        this._request.write(this._footer());

};


FormData.prototype._lengthRetriever = function (value, callback) {

        if (value.hasOwnProperty('fd')) {

                // take read range into a account
                // `end` = Infinity –> read file till the end
                //
                // TODO: Looks like there is bug in Node fs.createReadStream
                // it doesn't respect `end` options without `start` options
                // Fix it when node fixes it.
                // https://github.com/joyent/node/issues/7819
                if (value.end != undefined && value.end != Infinity && value.start != undefined) {

                        // when end specified
                        // no need to calculate range
                        // inclusive, starts with 0
                        callback(null, value.end + 1 - (value.start ? value.start : 0));

                        // not that fast snoopy
                } else {
                        // still need to fetch file size from fs
                        fs.stat(value.path, function (err, stat) {

                                var fileSize;

                                if (err) {
                                        callback(err);
                                        return;
                                }

                                // update final size based on the range options
                                fileSize = stat.size - (value.start ? value.start : 0);
                                callback(null, fileSize);
                        });
                }

                // or http response
        } else if (value.hasOwnProperty('httpVersion')) {
                callback(null, +value.headers['content-length']);

                // or request stream http://github.com/mikeal/request
        } else if (value.hasOwnProperty('httpModule')) {
                // wait till response come back
                value.on('response', function (response) {
                        value.pause();
                        callback(null, +response.headers['content-length']);
                });
                value.resume();

                // something else
        } else {
                callback('Unknown stream');
        }
};

FormData.prototype._multiPartHeader = function (field, value, options) {
        // custom header specified (as string)?
        // it becomes responsible for boundary
        // (e.g. to handle extra CRLFs on .NET servers)
        if (typeof options.header == 'string') {
                return options.header;
        }

        var contentDisposition = this._getContentDisposition(value, options);
        var contentType = this._getContentType(value, options);
        console.log('contentType', contentType);
        var contents = '';
        var headers = {
                // add custom disposition as third element or keep it two elements if not
                'Content-Disposition': ['form-data', 'name="' + field + '"'].concat(contentDisposition || []),
                // if no content type. allow it to be empty array
                'Content-Type': [].concat(contentType || [])
        };


        // allow custom headers.
        if (typeof options.header == 'object') {
                populate(headers, options.header);
        }

        var header;
        for (var prop in headers) {
                if (!headers.hasOwnProperty(prop)) continue;
                header = headers[prop];

                // skip nullish headers.
                if (header == null) {
                        continue;
                }

                // convert all headers to arrays.
                if (!Array.isArray(header)) {
                        header = [header];
                }

                // add non-empty headers.
                if (header.length) {
                        contents += prop + ': ' + header.join('; ') + FormData.LINE_BREAK;
                }
        }

        return '--' + this.getBoundary() + FormData.LINE_BREAK + contents + FormData.LINE_BREAK;
};

FormData.prototype._getContentDisposition = function (value, options) {

        var filename
                , contentDisposition
                ;

        if (typeof options.filepath === 'string') {
                // custom filepath for relative paths
                filename = path.normalize(options.filepath).replace(/\\/g, '/');
        } else if (options.filename || value.name || value.path) {
                // custom filename take precedence
                // formidable and the browser add a name property
                // fs- and request- streams have path property
                filename = path.basename(options.filename || value.name || value.path);
        } else if (value.readable && value.hasOwnProperty('httpVersion')) {
                // or try http response
                filename = path.basename(value.client._httpMessage.path);
        }

        if (filename) {
                contentDisposition = 'filename="' + filename + '"';
        }

        return contentDisposition;
};

FormData.prototype._getContentType = function (value, options) {

        // use custom content-type above all
        var contentType = options.contentType;

        // or try `name` from formidable, browser
        if (!contentType && value.name) {
                contentType = mime.lookup(value.name);
        }

        // or try `path` from fs-, request- streams
        if (!contentType && value.path) {
                contentType = mime.lookup(value.path);
        }

        // or if it's http-reponse
        if (!contentType && value.readable && value.hasOwnProperty('httpVersion')) {
                contentType = value.headers['content-type'];
        }

        // or guess it from the filepath or filename
        if (!contentType && (options.filepath || options.filename)) {
                contentType = mime.lookup(options.filepath || options.filename);
        }

        // fallback to the default content type if `value` is not simple value
        if (!contentType && typeof value == 'object') {
                contentType = FormData.DEFAULT_CONTENT_TYPE;
        }

        return contentType;
};

FormData.prototype._multiPartFooter = function () {
        return FormData.LINE_BREAK;
};
FormData.prototype._footer = function () {
        return FormData.LINE_BREAK + this._lastBoundary();
};
FormData.prototype._lastBoundary = function () {
        return '--' + this.getBoundary() + '--' + FormData.LINE_BREAK;
};

FormData.prototype.getHeaders = function (userHeaders) {
        var header;
        var formHeaders = {
                'content-type': 'multipart/form-data; boundary=' + this.getBoundary()
        };

        return formHeaders;
};

FormData.prototype.getBoundary = function () {
        if (!this._boundary) {
                this._generateBoundary();
        }

        return this._boundary;
};

FormData.prototype._generateBoundary = function () {
        // This generates a 50 character boundary similar to those used by Firefox.
        // They are optimized for boyer-moore parsing.
        var boundary = '--------------------------';
        for (var i = 0; i < 24; i++) {
                boundary += Math.floor(Math.random() * 10).toString(16);
        }

        this._boundary = boundary;
};


FormData.prototype._error = function (err) {
        if (!this.error) {
                this.error = err;
                this.pause();
                this.emit('error', err);
        }
};

FormData.prototype.toString = function () {
        return '[object FormData]';
};