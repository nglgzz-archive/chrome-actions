const http = require('http');

exports.handler = (event, context, callback) => {
  let querystring = '';
  let path = '';

  if (event.querystring && event.path) {
    querystring = Object.keys(event.querystring).map(
      key => `${key}=${event.querystring[key]}`
    ).join('&');
    path = `${event.path.command}/?${querystring}`
  }

  const req = http.get(process.env.URL + path, (res) => {
    let body = '';
    res.on('data', d => { body += d });
    res.on('end', () => context.done(null, body));
   });

  req.on('error', () => {
    context.done(null, '*cough* knock knock knock... is this thing on?');
  });
};