/* eslint-disable consistent-return */
/* eslint-disable no-console */
const http = require('http');
const url = require('url');
const port = 4000;

function getRequest(req, res) {
  const reqUrl = url.parse(req.url, true);
  req.setEncoding('utf8');
  res.writeHead(200, {'Content-Type': 'application/json'});

  let name = 'World';

  if (reqUrl.query.name) {
    name = reqUrl.query.name;
  }

  let responseText = {
    text: 'Hello ' + name
  };

  res.end(JSON.stringify(responseText));
}

function postRequest(req, res) {
  let body = '';
  req.setEncoding('utf8');
  res.writeHead(200, {'Content-Type': 'application/json'});

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      // Write back something interesting to the user:
      res.write(JSON.stringify(data));
      res.end();
    } catch (er) {
      // uh oh! bad json!
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });
}

function invalidRequest(req, res) {
  req.setEncoding('utf8');
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('Invalid Request');
}

const requestHandler = (req, res) => {
  const pathName = url.parse(req.url).pathname;

  res.writeHead(200, {'Content-type': 'text/plain'});

  if (req.method === 'GET') {
    console.log(`Request Type: ${req.method} | Endpoint:  ${pathName}`);
    getRequest(req, res);
  } else if (req.method === 'POST') {
    console.log(`Request Type: ${req.method} | Endpoint:  ${pathName}`);
    postRequest(req, res);
  } else {
    console.log(`Request Type: ${req.method} | Invalid Endpoint:  ${pathName}`);
    invalidRequest(req, res);
  }
};

const server = http.createServer(requestHandler);

server.listen(port, err => {
  if (err) {
    return console.log(`WTF! We have an error! Look: \n ${err}`);
  }

  console.log(`server is listening on ${port}`);
});
