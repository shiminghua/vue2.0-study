import { createServer } from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../index/App';

// const createServer = require('http').createServer;
// const React = require('react');
// const ReactDOMServer = require('react-dom/server');
// const StaticRouter = require('react-router').StaticRouter;
// const App = require('../index/App');

createServer((req, res) => {
  const context = {};

  // const html = ReactDOMServer.renderToString(
  //   <StaticRouter location={req.url} context={context}>
  //     <App />
  //   </StaticRouter>
  // );
  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
    </StaticRouter>
  );
  console.log('----->', context);
  if (context.url) {
    res.writeHead(301, {
      location: context.url
    });
    res.end();
  }
  else {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.write(`<!DOCTYIPE html><div id='app'>${html}</div>`);
    res.end();
  }
}).listen(3000, () => {
  console.log('app run at 3000');
});