const { ipcMain, net } = require('electron');


module.exports = function () {

        ipcMain.on('native.request', (event, request, options) => {
                console.log( request, options)
                const clientRequest = net.request(request.url)
                clientRequest.setHeader(request.headers);
                clientRequest.on('response', (response) => {
                        console.log('start', response.statusCode, response.headers)
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
                        event.sender.send('remote.request-error',  error.toString());
                })
                clientRequest.end()
                event.returnValue = true;
        })

        ipcMain.on('', (event, arg) => {
                console.log(arg)  // prints "ping"
                event.returnValue = 'pong'
        })



};

