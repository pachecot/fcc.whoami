"use strict";

var express = require("express");

var app = express();
var agentRE = /\(([^\)]+)\)/;

app.get('/api/whoami', function (req, resp) {

    var info = getWhoAmI(req);

    resp.writeHead(200, { 'Content-Type': 'application/json' });
    resp.write(JSON.stringify(info));
    resp.end();

});

app.listen(process.env.PORT || 3000);

function getWhoAmI(req) {

    var forwarded = req.headers['x-forwarded-for'];
    var ip = forwarded ? forwarded.split(',')[0] : '';

    var agent = req.headers['user-agent'];
    var agentMatch = agentRE.exec(agent);
    var sw = agentMatch ? agentMatch[1] : '';

    return {
        "ipaddress": ip,
        "language": req.headers['accept-language'],
        "software": sw
    };
    
}