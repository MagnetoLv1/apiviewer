const { ipcMain, net } = require('electron');
const FormData = require('./electron/form_data');


module.exports = function () {

        ipcMain.on('native.request', (event, request) => {
                const clientRequest = net.request({
                        url: request.url,
                        method: request.method,
                })

                clientRequest.on('response', (response) => {
                        event.sender.send('remote.response-start', response.statusCode, response.statusMessage, response.headers);
                        response.on('data', (chunk) => {
                                event.sender.send('remote.response-body', chunk);
                        })
                        response.on('end', () => {
                                event.sender.send('remote.response-complete');
                        })
                })
                clientRequest.on('finish', () => {
                        console.log('finish');
                        event.sender.send('remote.request-finish');
                })
                clientRequest.on('abort', () => {
                        console.log('abort');
                        event.sender.send('remote.request-abort');
                })
                clientRequest.on('error', (error, a, b) => {
                        console.log((typeof error), error.toString())
                        event.sender.send('remote.request-error', error.toString());
                })
                var form = new FormData(clientRequest);


                for (let header of request.header) {
                        clientRequest.setHeader(header.key, header.value);
                }
                for (var key in form.getHeaders()) {
                        clientRequest.setHeader(key, form.getHeaders()[key]);
                        console.log(key, form.getHeaders()[key]);
                }
                /*
                for (let header of form.getHeaders()) {
                        console.log(header)
                }
                */
                switch (request.body.mode) {

                        case 'urlencoded':
                                for (let urlencoded of request.body.urlencoded) {
                                        form.append(data.key, data.value);
                                }
                                break;
                        case 'formdata':
                                for (let data of request.body.formdata) {
                                        form.append(data.key, data.value);
                                }
                                break;
                        case 'raw':
                                for (let urlencoded of request.body.urlencoded) {
                                        form.append(urlencoded.key, urlencoded.value);
                                }
                                break;
                }
                form.send();
                clientRequest.end()
                event.returnValue = true;
        })

        ipcMain.on('', (event, arg) => {
                console.log(arg)  // prints "ping"
                event.returnValue = 'pong'
        })



};

