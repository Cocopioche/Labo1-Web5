import repository from './repository.js';
import http from 'http';


function allowAllAnonymousAccess(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Expose-Headers', '*');
}
function accessControlConfig(req, res) {
    if (req.headers['sec-fetch-mode'] === 'cors')
        allowAllAnonymousAccess(res);
}
function CORS_Preflight(req, res) {
    return new Promise(async (resolve) => {
        if (req.method === 'OPTIONS') {
            res.end();
            resolve(true);
        }
        resolve(false);
    });
}


async function handleRequest(req, res) {
    let bookmarkRepository = new repository("backend/bookmarks.json");
    let bookmark = null;
    if (req.url === "/api/bookmarks"){
        switch (req.method) {
            case "GET":
                return response(res, 200, JSON.stringify(await bookmarkRepository.getAll()));
            case "POST":
                bookmark = await getPayload(req, res);
                if (bookmark !== null){
                 bookmark = bookmarkRepository.add(bookmark);
                 return response(res, 201, JSON.stringify(bookmark));
                }
            case "PUT":
                bookmark = await getPayload(req, res);
                if (bookmark !== null){
                    if (bookmarkRepository.update(bookmark)){
                        return response(res, 204);
                    }
                    else{
                        return response(res, 404);
                    }
                }
                else {
                    return response(res, 400);
                }
        }
    }
    else{
        if (req.url.includes("/api/bookmarks/")){
            let id = parseInt(req.url.substring(req.url.lastIndexOf("/") + 1,req.url.length))
            switch (req.method) {
                case "GET":
                    let bookmark = bookmarkRepository.get(id);
                    if (bookmark !== null)
                        return response(res, 200, JSON.stringify(bookmark));
                    else
                        return response(res, 404);
                    return true;

                case "DELETE":
                    if (bookmarkRepository.remove(id))
                        return response(res, 202);
                    else
                        return response(res, 404);

            }
        }
    }
    return false;
}

function getPayload(req, res) {
    return new Promise(resolve => {
        let body = [];
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            let payload = null;
            if (body.length > 0)
                if (req.headers['content-type'] == "application/json")
                    try { resolve(JSON.parse(body)); }
                    catch (error) { console.log(error); }
            resolve(null);
        });
    })
}

function response(res, status,data = null) {
    if (data !== null){
        res.writeHead(status, {'Content-Type': 'application/json'});
    }
    else{
        res.writeHead(status);
    }
    res.end(data);
    return true;
}

const server = http.createServer(async (req, res) => {
    accessControlConfig(req, res);
    if (! await CORS_Preflight(req, res))
        if (! await handleRequest(req, res))
            response(res, 404);

});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));