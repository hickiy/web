const WebSocketServer = require('ws').Server;

const Wss = new WebSocketServer({
    port: 8080
});

Wss.on('connection', function (ws, req) {
    let url = req.url
    let queryString = url.match(/\?.*/) ? url.match(/\?.*/)[0] : null
    let query = null
    if(queryString) {
        let queryArr = queryString.replace('?','').split('&')
        queryArr.forEach(attr => {
            let index = attr.search('=')
            let key = attr.slice(0, index)
            let value = attr.slice(index+1, attr.length)
            query = {}
            query[key] = value
        })
    }
    if(query !== null) ws.uid = query.uid
    ws.on('message', function (msg) {
        let index = msg.search(/\?/)
        let sid = index !== -1 ? msg.slice(index+1, msg.length) : null
        console.log(sid)
        Wss.clients.forEach(ws => {
            sid ? ws.uid === sid && ws.send('something') : ws.send('something')
        })
    })
});
